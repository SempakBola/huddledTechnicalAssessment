import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const db = locals.db;

//   const query = `
// SELECT 
//     a.id AS artist_id, 
//     a.name AS artist_name, 
//     SUM(v.end_time - v.start_time) AS total_visit_duration,
// FROM 
//     artists a
// JOIN 
//     visits v ON a.id = v.id
// GROUP BY 
//     a.id
// `;

const query = `
SELECT
    a.id AS artist_id,
    a.name AS artist_name,
    SUM((v.end_time - v.start_time) / 1000) AS total_interaction_time,
    COUNT(DISTINCT s.user_id) AS total_unique_visitors
FROM
    artists AS a
JOIN
    visits AS v ON v.artist_id = a.id
JOIN
    sessions AS s ON v.session_id = s.id
GROUP BY
    a.id, a.name
ORDER BY
    total_interaction_time DESC;
;
`;

  const data = await db.prepare(query).all();

  return {
    data,
  };
};
