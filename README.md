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

1. **Identify Top Artists per User**  
   - Analyse which artist the user interacts with the most by examining the frequency of interactions (e.g., plays, likes, shares).  
   - Group data by `user_id` and `artist_id` to identify favourite artists.  

2. **Track Listening Duration**  
   - Measure how long the user listens to an artist by calculating the total interaction time for "play_track" events.  
   - Use this data to identify the user's deeper engagement with specific artists.  

3. **Analyse User Interaction Patterns Over Time**  
   - Examine user engagement trends over different periods, such as hours of the day, days of the week, or specific months.  
   - Use this analysis to recommend artists during peak engagement times.  

4. **Regional Engagement Trends**  
   - Use the `timezone` column in the `users` table to analyse user behaviour by region.  
   - Identify regional preferences to personalise recommendations for specific timezones or locations.  

5. **User Behaviour Clustering**  
   - Group users into behavioural categories based on interaction frequency and engagement scores.  
   - Examples of clusters include "explorers" (users who engage with many artists) and "loyalists" (users who engage deeply with a few artists).  

---