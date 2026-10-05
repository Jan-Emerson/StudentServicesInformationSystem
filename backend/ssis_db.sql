-- ============================================================
--  SSIS Database Setup Script
--  Run this in phpMyAdmin or MySQL CLI after starting XAMPP
-- ============================================================

CREATE DATABASE IF NOT EXISTS ssis_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ssis_db;

-- ─────────────────────────────────────────────
-- 1. COURSES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
  course_id   INT AUTO_INCREMENT PRIMARY KEY,
  course_code VARCHAR(20)  NOT NULL UNIQUE,
  course_name VARCHAR(100) NOT NULL
);

-- ─────────────────────────────────────────────
-- 2. STUDENTS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS students (
  student_id     INT AUTO_INCREMENT PRIMARY KEY,
  student_number VARCHAR(20)  NOT NULL UNIQUE,
  full_name      VARCHAR(100) NOT NULL,
  email          VARCHAR(100) NOT NULL UNIQUE,
  contact_number VARCHAR(20),
  address        TEXT,
  year_level     TINYINT      NOT NULL DEFAULT 1,
  course_id      INT,
  password_hash  VARCHAR(255) NOT NULL,
  status         ENUM('Active','Inactive','Graduated') NOT NULL DEFAULT 'Active',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- ─────────────────────────────────────────────
-- 3. SUBJECTS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subjects (
  subject_id   INT AUTO_INCREMENT PRIMARY KEY,
  subject_code VARCHAR(20)  NOT NULL UNIQUE,
  subject_name VARCHAR(150) NOT NULL,
  units        TINYINT      NOT NULL DEFAULT 3
);

-- ─────────────────────────────────────────────
-- 4. ENROLLMENTS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enrollments (
  enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id    INT NOT NULL,
  subject_id    INT NOT NULL,
  semester      VARCHAR(30) NOT NULL,
  school_year   VARCHAR(15) NOT NULL,
  schedule      VARCHAR(60),
  room          VARCHAR(30),
  instructor    VARCHAR(80),
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
  UNIQUE KEY uq_enrollment (student_id, subject_id, semester, school_year)
);

-- ─────────────────────────────────────────────
-- 5. GRADES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS grades (
  grade_id      INT AUTO_INCREMENT PRIMARY KEY,
  enrollment_id INT NOT NULL UNIQUE,
  midterm       DECIMAL(5,2),
  finals        DECIMAL(5,2),
  final_grade   VARCHAR(10),
  remarks       ENUM('PASSED','FAILED','INC','DRP') DEFAULT 'PASSED',
  FOREIGN KEY (enrollment_id) REFERENCES enrollments(enrollment_id)
);

-- ─────────────────────────────────────────────
-- 6. DOCUMENT REQUESTS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS document_requests (
  request_id     INT AUTO_INCREMENT PRIMARY KEY,
  student_id     INT         NOT NULL,
  document_type  VARCHAR(60) NOT NULL,
  quantity       TINYINT     NOT NULL DEFAULT 1,
  purpose        TEXT,
  payment_method ENUM('Cash','Online') DEFAULT 'Cash',
  amount         DECIMAL(8,2) NOT NULL DEFAULT 0.00,
  status         ENUM('Pending','Processing','Released','Cancelled') NOT NULL DEFAULT 'Pending',
  request_date   DATE        NOT NULL DEFAULT (CURDATE()),
  release_date   DATE,
  FOREIGN KEY (student_id) REFERENCES students(student_id)
);

-- ─────────────────────────────────────────────
-- 7. DEPARTMENTS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS departments (
  department_id   INT AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(80) NOT NULL UNIQUE
);

-- ─────────────────────────────────────────────
-- 8. CLEARANCE
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clearances (
  clearance_id  INT AUTO_INCREMENT PRIMARY KEY,
  student_id    INT NOT NULL,
  department_id INT NOT NULL,
  semester      VARCHAR(30) NOT NULL,
  school_year   VARCHAR(15) NOT NULL,
  status        ENUM('Pending','Cleared') NOT NULL DEFAULT 'Pending',
  cleared_by    VARCHAR(80),
  cleared_date  DATE,
  FOREIGN KEY (student_id)    REFERENCES students(student_id),
  FOREIGN KEY (department_id) REFERENCES departments(department_id),
  UNIQUE KEY uq_clearance (student_id, department_id, semester, school_year)
);

-- ─────────────────────────────────────────────
-- 9. ADMIN USERS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  admin_id      INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(60)  NOT NULL UNIQUE,
  full_name     VARCHAR(100) NOT NULL,
  role          ENUM('Registrar','Cashier','Department','Admin') NOT NULL DEFAULT 'Admin',
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- SEED DATA
-- ─────────────────────────────────────────────

INSERT IGNORE INTO courses (course_code, course_name) VALUES
  ('BSCS',  'BS Computer Science'),
  ('BSIT',  'BS Information Technology'),
  ('BSBA',  'BS Business Administration'),
  ('BSED',  'BS Education');

INSERT IGNORE INTO students (student_number, full_name, email, contact_number, year_level, course_id, password_hash, status)
VALUES
  ('2024-00001', 'Juan Dela Cruz',  'juan.delacruz@cuyotech.edu.ph',  '09171234567', 3, 1,
   '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Active'),
  ('2023-10042', 'Maria Santos',    'maria.santos@cuyotech.edu.ph',   '09189876543', 2, 2,
   '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Active');
-- password_hash above = bcrypt of "password"

INSERT IGNORE INTO subjects (subject_code, subject_name, units) VALUES
  ('CS301', 'Data Structures and Algorithms', 3),
  ('CS302', 'Object-Oriented Programming',   3),
  ('CS303', 'Database Management Systems',   3),
  ('CS304', 'Computer Networks',             3),
  ('GE001', 'Purposive Communication',       3),
  ('GE002', 'Mathematics in the Modern World', 3);

INSERT IGNORE INTO enrollments (student_id, subject_id, semester, school_year, schedule, room, instructor) VALUES
  (1, 1, '1st Semester', '2024-2025', 'MWF 7:30-8:30 AM',   'Room 301', 'Prof. Reyes'),
  (1, 2, '1st Semester', '2024-2025', 'TTH 10:30-12:00 PM', 'Room 205', 'Prof. Garcia'),
  (1, 3, '1st Semester', '2024-2025', 'MWF 1:00-2:00 PM',   'Room 102', 'Prof. Lim'),
  (1, 4, '1st Semester', '2024-2025', 'TTH 1:00-2:30 PM',   'Room 110', 'Prof. Cruz'),
  (1, 5, '1st Semester', '2024-2025', 'MWF 9:00-10:00 AM',  'Room 108', 'Prof. Santos'),
  (1, 6, '1st Semester', '2024-2025', 'TTH 8:00-9:30 AM',   'Room 204', 'Prof. Reyes');

INSERT IGNORE INTO grades (enrollment_id, midterm, finals, final_grade, remarks) VALUES
  (1, 88, 91, '1.50', 'PASSED'),
  (2, 92, 95, '1.25', 'PASSED'),
  (3, 85, 87, '1.75', 'PASSED'),
  (4, 78, 82, '2.00', 'PASSED'),
  (5, 90, 88, '1.50', 'PASSED'),
  (6, 75, 80, '2.25', 'PASSED');

INSERT IGNORE INTO document_requests (student_id, document_type, quantity, purpose, payment_method, amount, status, request_date) VALUES
  (1, 'TOR',  1, 'Job Application', 'Cash',   150.00, 'Released',   '2024-01-15'),
  (1, 'COR',  2, 'Scholarship',     'Cash',   100.00, 'Processing', '2024-02-10'),
  (1, 'CERT', 1, 'Board Exam',      'Online', 200.00, 'Pending',    '2024-03-01');

INSERT IGNORE INTO departments (department_name) VALUES
  ('Library'),
  ('Cashier'),
  ('Registrar'),
  ('Laboratory'),
  ('Guidance Office'),
  ("Dean's Office");

INSERT IGNORE INTO clearances (student_id, department_id, semester, school_year, status, cleared_by, cleared_date) VALUES
  (1, 1, '1st Semester', '2024-2025', 'Cleared', 'Ms. Alvarez',    '2024-01-10'),
  (1, 2, '1st Semester', '2024-2025', 'Cleared', 'Mr. Bautista',   '2024-01-12'),
  (1, 3, '1st Semester', '2024-2025', 'Pending', NULL, NULL),
  (1, 4, '1st Semester', '2024-2025', 'Pending', NULL, NULL),
  (1, 5, '1st Semester', '2024-2025', 'Cleared', 'Ms. Villanueva', '2024-01-08'),
  (1, 6, '1st Semester', '2024-2025', 'Pending', NULL, NULL);
