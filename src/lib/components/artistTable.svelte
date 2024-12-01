<script lang="ts">
  let { artistVisits } = $props();

  function formatDuration(duration: number): string {
    if (duration < 60) {
    // Display in seconds for durations less than 1 minute
    return `${duration} seconds`;
  } else if (duration < 3600) {
    // Display in minutes and seconds for durations less than 1 hour
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes} minutes ${seconds} seconds`;
  } else {
    // Display in hours, minutes, and seconds for durations 1 hour or longer
    const hours = Math.floor(duration / 3600);
    const remainingSeconds = duration % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
  }
  }
</script>

<div class="overflow-x-auto">
  <div class="min-w-max w-[60rem] h-[60rem] overflow-y-auto relative scrollbar-pretty">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Artist Id</th>
          <th scope="col" class="px-6 py-3">Artist Name</th>
          <th scope="col" class="px-6 py-3">Total Interaction Time</th>
          <th scope="col" class="px-6 py-3"> Total Unique Visitors</th>
        </tr>
      </thead>
      <tbody>
        {#each artistVisits as { artist_id, artist_name, total_interaction_time, total_unique_visitors }}
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {artist_id}
            </td>
            <td
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {artist_name}
            </td>
            <td class="px-6 py-4">
              {formatDuration(total_interaction_time)}
            </td>
            <td class="px-6 py-4">
              {total_unique_visitors}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
/* Custom scrollbar styles */
.scrollbar-pretty::-webkit-scrollbar {
  width: 10px;
}

.scrollbar-pretty::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.scrollbar-pretty::-webkit-scrollbar-thumb {
  background: rgba(149, 158, 160, 0.5);
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.scrollbar-pretty::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 100, 100, 0.7);
}

</style>