<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { PageData } from "./$types";
  import { Chart, registerables } from "chart.js";
  Chart.register(...registerables);

  let { data }: { data: PageData } = $props();

  let lineChartInstance: Chart;
  let barChartInstance: Chart;

  // Default to artist 1
  let selectedArtists = ["1"];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];

  function convertToLocalHour(timestamp: number, timezone: string): string {
    // Convert timestamp (ms) to Date object
    const date = new Date(timestamp);
    const options = { timeZone: timezone, hour: "numeric", hour12: false };
    // Returns hour in 24-hour format
    return new Intl.DateTimeFormat("en-US", options).format(date); 
  }

  function convertToDayOfWeek(timestamp: number, timezone: string): string {
    const date = new Date(timestamp);
    const options = { timeZone: timezone, weekday: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  function processEngagementData(events: any[]) {
    const groupedByHour = {};
    const groupedByDay = {};

    events.forEach(({ artist_id, created_at, timezone, engagement_score }) => {
      const localHour = convertToLocalHour(created_at, timezone);
      const dayOfWeek = convertToDayOfWeek(created_at, timezone);

      if (!groupedByHour[artist_id]) groupedByHour[artist_id] = {};
      if (!groupedByHour[artist_id][localHour]) groupedByHour[artist_id][localHour] = 0;

      if (!groupedByDay[artist_id]) groupedByDay[artist_id] = {};
      if (!groupedByDay[artist_id][dayOfWeek]) groupedByDay[artist_id][dayOfWeek] = 0;

      groupedByHour[artist_id][localHour] += engagement_score;
      groupedByDay[artist_id][dayOfWeek] += engagement_score;
    });

    return { groupedByHour, groupedByDay };
  }

  const { groupedByHour, groupedByDay } = processEngagementData(data.data);

  const hourLabels = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));

  function createLineChart() {
    const lineCtx = document.getElementById("lineChart") as HTMLCanvasElement;

    const datasets = selectedArtists.map(artistId => {
      const data = hourLabels.map(hour => groupedByHour[artistId]?.[hour] || 0);
      const maxIndex = data.indexOf(Math.max(...data));
      return {
        label: `Artist ${artistId}`,
        data,
        borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
        backgroundColor: "transparent",
        pointBackgroundColor: data.map((_, idx) => (idx === maxIndex ? "red" : "white")),
      };
    });

    if (lineChartInstance) lineChartInstance.destroy();

    lineChartInstance = new Chart(lineCtx, {
      type: "line",
      data: { labels: hourLabels, datasets },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          tooltip: { enabled: true },
          title: { display: true, text: "Artist Engagement by Hour of the Day" },
        },
        scales: {
          x: { title: { display: true, text: "Hour of the Day" } },
          y: { title: { display: true, text: "Engagement Score" }, beginAtZero: true },
        },
      },
    });
  }

  function createBarChart() {
  const barCtx = document.getElementById("barChart") as HTMLCanvasElement;

  const datasets = selectedArtists.map(artistId => {
    const data = daysOfWeek.map(day => groupedByDay[artistId]?.[day] || 0);
    return {
      label: `Artist ${artistId}`,
      data,
      backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
    };
  });

  if (barChartInstance) barChartInstance.destroy();

  barChartInstance = new Chart(barCtx, {
    type: "bar",
    data: { labels: daysOfWeek, datasets },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        tooltip: { enabled: true },
        title: { display: true, text: "Artist Engagement by Day of the Week" },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Day of the Week",
          },
        },
        y: {
          title: {
            display: true,
            text: "Engagement Score",
          },
          beginAtZero: true,
        },
      },
    },
  });
}


  function updateCharts() {
    createLineChart();
    createBarChart();
  }

  onMount(() => {
    createLineChart();
    createBarChart();
  });

  onDestroy(() => {
    if (lineChartInstance) lineChartInstance.destroy();
    if (barChartInstance) barChartInstance.destroy();
  });
</script>

<div>
  <label for="artistSelect">Select Artists:</label>
  <select id="artistSelect" multiple bind:value={selectedArtists} on:change={updateCharts}>
    {#each Object.keys(groupedByHour) as artistId}
      <option value={artistId}>Artist {artistId}</option>
    {/each}
  </select>

  <canvas id="lineChart" width="800" height="400"></canvas>
  <canvas id="barChart" width="800" height="400"></canvas>
</div>
