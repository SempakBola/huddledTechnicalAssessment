# Task 2 Query Checks

This outlines some of the SQL queries I did to ensure database integrity and identify potential issues in the `user_events` table and related data.

---

## **1. Check for Missing Values in Critical Columns**
### **Description:**
This query checks for rows in the `user_events` table where critical columns (`user_id`, `artist_id`, `event_type`, or `created_at`) are null, indicating incomplete data.

```sql
SELECT * 
FROM user_events
WHERE user_id IS NULL OR artist_id IS NULL OR event_type IS NULL OR created_at IS NULL;
```
## **2. Check for Impossible Values**
### **Description:**
This query checks for rows in the `user_events` table with impossible or invalid values, such as negative IDs or scores.

```sql
SELECT * 
FROM user_events
WHERE user_id IS NULL OR artist_id IS NULL OR event_type IS NULL OR created_at IS NULL;
```
## **3. Check for Missing or NaN Values in Critical Columns**
### **Description:**
This query checks for rows in the `user_events` table where critical columns (`user_id`, `artist_id`, `event_type`, or `created_at`) are null or missing.

```sql
SELECT *
FROM user_events
WHERE user_id IS NULL 
   OR artist_id IS NULL 
   OR event_type IS NULL 
   OR created_at IS NULL;
```

## **4. Validate Timestamps**
### **Description:**
This query identifies rows in the `user_events` table with invalid timestamps, such as timestamps before the Unix epoch or in the future.

```sql
SELECT *
FROM user_events
WHERE created_at < 0 
   OR created_at > STRFTIME('%s', 'now') * 1000;
```

## **5. Validate Timezones**
### **Description:**
This query identifies invalid or unexpected values in the timezone column of the `users` table by listing all unique timezones for manual review.

```sql
SELECT DISTINCT timezone
FROM users;
```

# Task 3 ANSWERS

---

## **Data Analysis Steps**

## **Data Analysis**
1. **Identify Most Interacted Artists**  
   Analyze the `user_events` table to find the artists each user interacts with the most based on interaction types like `play_track`, `like_track`, or `follow_artist`.
   
2. **Calculate Listening Duration**  
   Utilize the `visits` table to calculate the total time users spend listening to each artist (`end_time - start_time`).

3. **Analyze Interaction Patterns Over Time**  
   Examine the `sessions` table to understand user activity trends and peak engagement hours.

4. **Regional Engagement Trends**  
   Use the `users` table to analyze regional preferences based on the `timezone` column.

5. **User Behavior Clustering**  
   Cluster users with similar interaction patterns using data from `user_events` and `engagement_scores` to recommend artists preferred by similar users.  

---
---

## **Implementation Plan**

### **Step 1: Analyze User Interactions**
- **Data Extraction**:
  - Query the `user_events` and `engagement_scores` tables to determine interaction weights.
  - Aggregate `visits` data to rank artists based on engagement duration.
- **Pattern Identification**:
  - Rank artists by engagement score for each user.
  - Segment users by `timezone` for regional trends.

### **Step 2: Build a Recommendation Engine**
1. **Content-Based Filtering**:
   - Recommend artists with similar interaction types or genres (derived from the `tracks` and `user_events` tables).
2. **Collaborative Filtering**:
   - Use user clustering to identify and share recommendations among users with similar preferences.

### **Step 3: Integrate Recommendations into the UI**
- **Artist Pages**:
  - Add a "Recommended Artists" section based on:
    - Similar artists or top-trending artists in the same region.
- **User Dashboards**:
  - Personalize the dashboard to highlight:
    - Recently discovered artists.
    - Artists trending in the user's region.

### **Step 4: Implementation in Codebase**
1. **Backend**:
   - Develop SQL queries to extract recommended artists using existing tables (`user_events`, `engagement_scores`, `visits`).
   - Create API endpoints to deliver recommendations dynamically.
2. **Frontend**:
   - Add dynamic components to display personalized recommendations.
   - Implement filtering options for users to refine their recommendations.

---

## **Evaluation Plan**

### **Metrics**
1. **User Engagement**:
   - Monitor click-through rates (CTR) and time spent engaging with recommendations.
2. **Conversion Rates**:
   - Measure actions like "follow artist" or "add track to playlist" on recommendations.
3. **Diversity and Novelty**:
   - Evaluate how often users interact with new or lesser-known artists.

### **Feedback Collection**
- Include a feedback mechanism (e.g., thumbs-up/thumbs-down) on recommended artists.
- Use survey forms to gather qualitative insights on recommendation relevance.

### **AB Testing**
- Test multiple recommendation algorithms (content-based, collaborative filtering, hybrid).
- Compare user engagement metrics between groups exposed to recommendations and a control group.

### **Iteration**
- Refine the recommendation engine based on feedback and performance metrics.
- Regularly update the engine with fresh interaction data.

---