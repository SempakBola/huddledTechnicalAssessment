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
