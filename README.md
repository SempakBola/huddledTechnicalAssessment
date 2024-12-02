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

## **Data Analysis Steps (EDA)**

1. **Identify Most Interacted Artists**  
   - Analyze the `user_events` table to determine the artists each user interacts with the most, based on interaction types like `play_track`, `like_track`, or `follow_artist`.

2. **Calculate Listening Duration**  
   - Use the `visits` table to compute the total time users spend listening to each artist (`end_time - start_time`).

3. **Analyze Interaction Patterns Over Time**  
   - Examine the `sessions` table to identify user activity trends, such as peak engagement hours.

4. **Regional Engagement Trends**  
   - Utilize the `users` table to analyze regional preferences based on the `timezone` column.

5. **User Behavior Clustering**  
   - Cluster users with similar interaction patterns using data from `user_events` and `engagement_scores` to recommend artists preferred by similar users.

---

## **Data Preprocessing/Cleaning**

1. **Clean Missing or Incorrect Values**  
   - Ensure all critical columns (`user_id`, `artist_id`, `event_type`, `score`) are complete and free of invalid values.

2. **Normalize Timezones**  
   - Validate and standardize the `timezone` column in the `users` table for consistent regional analysis.

3. **Encode Categorical Data**  
   - Transform interaction types in `event_type` into numeric scores using the `engagement_scores` table.

4. **Aggregate User-Artist Interactions**  
   - Combine interaction data from `user_events` and `visits` tables to create a comprehensive engagement dataset.

---

## **Model Training**

1. **Collaborative Filtering Model**  
   - Use user-item interaction data to train a collaborative filtering model for recommending artists based on similar user preferences.

2. **Content-Based Filtering Model**  
   - Train a model using artist metadata from the `tracks` and `user_events` tables to recommend artists with similar features.

3. **Hybrid Recommendation Model**  
   - Combine collaborative and content-based filtering to improve recommendation accuracy.

4. **Regional Model Training**  
   - Customize models based on regional data extracted using the `timezone` column.

---

## **Testing/Evaluation**

1. **User Engagement Metrics**
   - Evaluate recommendation success based on click-through rates (CTR) and the time spent engaging with suggested artists.

2. **Conversion Rates**
   - Measure actions taken on recommendations, such as "follow artist" or "add track to playlist."

3. **Diversity and Novelty**
   - Assess how often users interact with new or less familiar artists.

4. **AB Testing**
   - Compare different recommendation models (content-based, collaborative, hybrid) to identify the most effective algorithm.

5. **Feedback Collection**
   - Include a thumbs-up/thumbs-down feedback mechanism on recommended artists to refine the model.

---

## **Integrating into the Web App**

1. **Backend Integration**
   - Extend the existing API to include recommendation endpoints that dynamically fetch suggested artists for each user.
   - Use SQL queries on `user_events`, `visits`, and `engagement_scores` tables to deliver personalized recommendations.

2. **Frontend Implementation**
   - Add a "Recommended Artists" section to artist pages and user dashboards.
   - Ensure recommendations are interactive, allowing users to explore and filter suggestions.

3. **Real-Time Updates**
   - Implement real-time updates to recommendations as users interact with the platform.

4. **Regional Personalization**
   - Highlight trending artists in the user's region based on aggregated engagement scores from the `timezone` column.

5. **Scalability**
   - Design the recommendation system to handle increasing user interactions and artist data efficiently.

---
