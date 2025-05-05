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
  rating INTEGER CHECK (rating BETWEEN 1 AND 5)
);

CREATE TABLE answer (
  id SERIAL PRIMARY KEY,
  survey_id INTEGER NOT NULL
    REFERENCES surveys(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  skill_id INTEGER NOT NULL
    REFERENCES skills(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);































































































































































