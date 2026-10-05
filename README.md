# CuyoTech University SSIS

## Stack
- **Frontend**: Vite + React + React Router DOM v6 — pure CSS, no Tailwind
- **Backend**: Express.js (Node)
- **Database**: MySQL via XAMPP

## Setup

### 1. Database (XAMPP)
1. Start XAMPP → start **Apache** and **MySQL**
2. Open **phpMyAdmin** → `http://localhost/phpmyadmin`
3. Import `backend/ssis_db.sql` (this creates `ssis_db` and seeds all data)

### 2. Backend
```bash
cd ssis-app/backend
npm install
npm run dev          # runs on http://localhost:5000
```

### 3. Frontend
```bash
cd ssis-app/frontend
npm install
npm run dev          # runs on http://localhost:5173
```

## Login Credentials (demo)
| Student Number | Password |
|---|---|
| 2024-00001 | password |
| 2023-10042 | password |
