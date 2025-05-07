CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  skill_name VARCHAR(100) NOT NULL
);

CREATE TABLE schools (
  id SERIAL PRIMARY KEY,
  school_name VARCHAR(255) NOT NULL
);

CREATE TABLE student (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  gender VARCHAR(20) NOT NULL,
  school_id INTEGER NOT NULL
    REFERENCES schools(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  academic_year INTEGER NOT NULL
);

CREATE TABLE question (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  skill_id INTEGER NOT NULL
    REFERENCES skills(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE TABLE surveys (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL
    REFERENCES student(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  academic_year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  question_id INTEGER NOT NULL
    REFERENCES question(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

);



SELECT 
  s.id AS survey_id,
  s.created_at, 
  stu.id AS student_id, 
  stu.full_name, 
  stu.age, 
  stu.gender_id, 
  g.gender_name, 
  sch.id AS school_id, 
  sch.name AS school_name, 
  q.id AS question_id, 
  q.text AS question, 
  sq.rating AS question_rating, 
  sk.id AS skill_id, 
  sk.skill_name AS skill
FROM surveys s
JOIN student stu ON stu.id = s.student_id
JOIN school sch ON stu.school_id = sch.id
LEFT JOIN gender g ON stu.gender_id = g.id
JOIN survey_questions sq ON sq.survey_id = s.id
JOIN question q ON q.id = sq.question_id
JOIN skills sk ON q.skill_id = sk.id
ORDER BY s.id DESC;




































































































