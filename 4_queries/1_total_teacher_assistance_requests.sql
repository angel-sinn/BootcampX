SELECT COUNT(assistance_requests.*) as total_assistances, teachers.name as name
FROM assistance_requests
JOIN teachers ON teachers.id = assistance_requests.teacher_id
WHERE name = 'Waylon Boehm'
GROUP BY teachers.name;