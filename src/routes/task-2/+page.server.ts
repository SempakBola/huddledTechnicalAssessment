import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const db = locals.db;
  
  const query = `WITH EventScores AS (
    SELECT
        ue.artist_id,
        ue.created_at, 
        u.timezone,   
        es.score AS engagement_score
    FROM
        user_events AS ue
    JOIN
        users AS u ON ue.user_id = u.id
    JOIN
        engagement_scores AS es ON ue.event_type = es.event_type
)
SELECT
    artist_id,
    created_at,
    timezone,
    engagement_score
FROM
    EventScores
ORDER BY
    artist_id, created_at;
`;

  const data = await db.prepare(query).all();

  return {
    data,
  };
};
