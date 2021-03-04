const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

// Values that come from somewhere else
const cohort = process.argv[2];
const searchLimit = process.argv[3];

// Store all potentially malicious values in an array
const values = [`%${cohort}%`, searchLimit];

pool
  .query(
    `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort_name
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;`,
    values
  )
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.name} has an id of ${user.student_id} and was in the ${user.cohort_name} cohort`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));
