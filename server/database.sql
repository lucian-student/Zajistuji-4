CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    date_of_creation DATE  DEFAULT current_date
);

CREATE TABLE refreshtokens (
  token_id serial PRIMARY KEY,
  user_id INT NOT NULL,
  token TEXT NOT NULL,
  FOREIGN KEY (user_id)
      REFERENCES users (user_id) 
        ON DELETE CASCADE
);

CREATE TABLE ingredients (
  ingredients_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  category VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id)
    REFERENCES users (user_id) 
      ON DELETE CASCADE
);

CREATE TABLE utensils(
  utensils_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NUll,
  FOREIGN KEY (user_id)
      REFERENCES users (user_id) 
        ON DELETE CASCADE
);

CREATE TABLE recipies (
  recipie_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  imageUrl TEXT,
  date_of_creation TIMESTAMP DEFAULT current_timestamp,
  shared BOOLEAN DEFAULT false,
  FOREIGN KEY (user_id)
    REFERENCES users (user_id) 
      ON DELETE CASCADE
);

CREATE TABLE recipie_ingredients(
  ingredients_id BIGSERIAL PRIMARY KEY,
  recipie_id BIGINT NOT NULL,
  category VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  FOREIGN KEY (recipie_id)
    REFERENCES recipies (recipie_id) 
      ON DELETE CASCADE
);

CREATE TABLE recipie_utensils(
 utensils_id BIGSERIAL PRIMARY KEY,
 recipie_id BIGINT NOT NULL,
 name VARCHAR(255) NOT NULL,
 FOREIGN KEY (recipie_id)
    REFERENCES recipies (recipie_id) 
      ON DELETE CASCADE
);

CREATE TABLE recipie_steps(
  step_id BIGSERIAL PRIMARY KEY,
  recipie_id BIGINT NOT NULL,
  duration TIME NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  FOREIGN KEY (recipie_id)
    REFERENCES recipies (recipie_id) 
      ON DELETE CASCADE
);

CREATE TABLE step_ingredients(
  ingredients_id BIGSERIAL PRIMARY KEY,
  step_id BIGINT NOT NULL,
  unit VARCHAR(255) NOT NULL,
  value TEXT NOT NULL,
  category VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  FOREIGN KEY (step_id)
    REFERENCES recipie_steps (step_id) 
      ON DELETE CASCADE 
);

CREATE TABLE step_utensils(
  utensils_id BIGSERIAL PRIMARY KEY,
  step_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  FOREIGN KEY (step_id)
    REFERENCES recipie_steps (step_id) 
      ON DELETE CASCADE
);




