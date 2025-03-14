-- Create the database
CREATE DATABASE todo_app;
-- Create the users table
CREATE TABLE users (
                     id SERIAL PRIMARY KEY,
                     username VARCHAR(50) NOT NULL UNIQUE,
                     password VARCHAR(100) NOT NULL,
                     email VARCHAR(100) NOT NULL UNIQUE,
                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create the tasks table
CREATE TABLE tasks (
                     id SERIAL PRIMARY KEY,
                     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                     title VARCHAR(255) NOT NULL,
                     description TEXT,
                     is_completed BOOLEAN DEFAULT FALSE,
                     due_date DATE,
                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Insert initial data into users table
INSERT INTO users (username, password, email)
VALUES (
         'john_doe',
         'password123',
         'john_doe@example.com'
       ),
       (
         'jane_doe',
         'password456',
         'jane_doe@example.com'
       );
-- Insert initial data into tasks table
INSERT INTO tasks (
  user_id,
  title,
  description,
  is_completed,
  due_date
)
VALUES (
         1,
         'Buy groceries',
         'Buy milk, eggs, and bread',
         FALSE,
         '2025-03-15'
       ),
       (
         1,
         'Read a book',
         'Finish reading the novel',
         FALSE,
         '2025-03-20'
       ),
       (
         2,
         'Exercise',
         'Go for a run in the park',
         FALSE,
         '2025-03-12'
       ),
       (
         2,
         'Pay bills',
         'Pay electricity and water bills',
         TRUE,
         '2025-03-10'
       );
