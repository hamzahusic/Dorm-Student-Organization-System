# UniDorms — Dorm Student Organization System

A web application for managing dormitory operations, including room assignments, meal planning, maintenance requests, and announcements.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Database Setup](#database-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Reference](#api-reference)
- [Roles & Permissions](#roles--permissions)
- [Deployment](#deployment)
- [Demo Credentials](#demo-credentials)

---

## Overview

UniDorms is a full-stack web application that helps dormitory administrators and students manage day-to-day dorm life. Admins can manage rooms, meals, and announcements, while students can track their room assignment, register for meals, and submit maintenance requests.

---

## Features

### Student
- View room assignment and roommates
- Register for / cancel meals and view meal history
- Submit and track maintenance/support requests
- Read announcements

### Admin
- Dashboard with statistics (students per year, meal activity)
- Manage rooms (create, assign students)
- Manage meals (create, update, delete)
- Manage announcements (create, update, delete)
- View and update maintenance request statuses
- Manage user accounts

### General
- JWT-based authentication with automatic logout on token expiry
- Role-based access control (student / admin)
- Public announcements visible without login

---

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Backend  | PHP 8+, [Flight PHP](https://flightphp.com/) micro-framework |
| Auth     | Firebase JWT (HS256) |
| Database | MySQL |
| Frontend | HTML5, Vanilla JS, jQuery |
| UI       | Bootstrap 5, DataTables, Toastr, Highcharts, Font Awesome |
| Deploy   | DigitalOcean App Platform |

---

## Project Structure

```
Dorm-Student-Organization-System/
├── backend/
│   ├── index.php               # App entry point (CORS, routes, services)
│   ├── composer.json
│   ├── .htaccess               # URL rewriting (Apache)
│   ├── middleware/
│   │   └── AuthMiddleware.php  # JWT verification & role checks
│   ├── data/
│   │   └── Roles.php           # Role constants (student, admin)
│   └── rest/
│       ├── config.php          # DB + JWT configuration
│       ├── routes/             # Route definitions per resource
│       ├── services/           # Business logic
│       └── dao/                # Database queries (PDO)
├── frontend/
│   ├── index.html              # SPA shell
│   ├── pages/                  # HTML page templates
│   ├── services/               # JS API client services
│   ├── utils/
│   │   ├── constants.js        # Base URL & role constants
│   │   ├── rest-client.js      # HTTP client wrapper
│   │   └── utils.js            # Shared helpers
│   └── assets/                 # CSS, JS libraries, images
└── unidorms_db.sql             # Database schema + seed data
```

---

## Getting Started

### Prerequisites

- [XAMPP](https://www.apachefriends.org/) (PHP 8+ & MySQL) or equivalent
- [Composer](https://getcomposer.org/)
- A browser (no Node.js required)

### Database Setup

1. Start MySQL.
2. Create a database named `unidorms`.
3. Import the schema and seed data:
   ```bash
   mysql -u root -p unidorms < unidorms_db.sql
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install PHP dependencies:
   ```bash
   composer install
   ```
3. Open `rest/config.php` and update the values to match your environment:
   ```php
   define('DB_HOST', '127.0.0.1');
   define('DB_PORT', '3306');
   define('DB_NAME', 'unidorms');
   define('DB_USER', 'root');
   define('DB_PASSWORD', 'your_password');
   define('JWT_SECRET', 'your_jwt_secret');
   ```
4. Make sure Apache is running and the project is inside your web root (e.g., `htdocs/`).
5. The API will be available at: `http://localhost/Dorm-Student-Organization-System/backend/`

### Frontend Setup

No build step required. The frontend is plain HTML/JS.

1. Open `frontend/utils/constants.js` and verify the `PROJECT_BASE_URL()` function returns your local backend URL when running on localhost.
2. Open `frontend/index.html` directly in your browser, or serve it via Apache at:
   `http://localhost/Dorm-Student-Organization-System/frontend/`

---

## API Reference

Full interactive API docs (Swagger UI) are available at:
`http://localhost/Dorm-Student-Organization-System/backend/public/v1/docs/`

### Summary

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/auth/register` | Register a new user | Public |
| POST | `/auth/login` | Login and receive JWT | Public |
| GET | `/public/announcements` | List all announcements | Public |
| GET | `/public/announcement/{id}` | Get announcement details | Public |
| GET | `/users` | Get all users or own profile | Auth |
| PUT | `/users` | Update own profile | Auth |
| DELETE | `/users/{id}` | Deactivate user | Admin |
| GET | `/rooms` | List all rooms | Admin |
| POST | `/room` | Create a room | Admin |
| PUT | `/room` | Update / assign students to room | Admin |
| DELETE | `/room/{id}` | Delete a room | Admin |
| GET | `/meals` | List all meals | Admin |
| POST | `/meals` | Create a meal | Admin |
| PUT | `/meals` | Update a meal | Admin |
| DELETE | `/meals/{id}` | Delete a meal | Admin |
| GET | `/student/meals/today` | Get today's meals | Student |
| POST | `/student/meals` | Register for a meal | Student |
| DELETE | `/student/meals/{id}` | Cancel meal registration | Student |
| GET | `/requests` | List requests | Auth |
| POST | `/request` | Submit a request | Student |
| PUT | `/request` | Update a request | Auth |
| DELETE | `/request/{id}` | Delete a request | Auth |
| POST | `/announcement` | Create announcement | Admin |
| PUT | `/announcement` | Update announcement | Admin |
| DELETE | `/announcement/{id}` | Delete announcement | Admin |

---

## Roles & Permissions

| Feature | Student | Admin |
|---------|---------|-------|
| View/edit own profile | Yes | Yes |
| View room & roommates | Yes | — |
| Register for meals | Yes | — |
| Submit requests | Yes | — |
| View own requests | Yes | — |
| Manage all users | — | Yes |
| Manage rooms | — | Yes |
| Manage meals | — | Yes |
| Manage requests | — | Yes |
| Manage announcements | — | Yes |
| View dashboard stats | — | Yes |

---

## Deployment

The application is deployed on **DigitalOcean App Platform** with the frontend and backend as separate apps:

| Service | URL |
|---------|-----|
| Frontend | https://unidorms-frontend-app-4azaj.ondigitalocean.app |
| Backend API | https://undidorms-backend-app-x2svq.ondigitalocean.app |
| API Docs | https://undidorms-backend-app-x2svq.ondigitalocean.app/public/v1/docs/ |

The backend reads database credentials and JWT secret from **environment variables** set in the DigitalOcean dashboard.

---

## Demo Credentials

> These credentials are for the live demo environment only.

| Role | Email | Password |
|------|-------|----------|
| Admin | hamza@gmail.com | sifra123 |