# Mini Service Request Board

## Workflow

### Public Users
- View all jobs
- Search jobs by keyword
- Filter jobs by category
- View job details

### Registered Users
- Register account
- Login using email and password
- Create new job requests

### Job Owner Permissions
Only the user who created the job can:
- Update job status
- Delete the job

---

## Application Flow

Visitor → View Jobs → Register/Login → Create Job → Manage Own Jobs

---

## Authentication
- JWT Authentication
- Passwords hashed using bcrypt

---

## Features
- User Register & Login
- Create Job Request
- View All Jobs
- Search & Filter Jobs
- Update Job Status
- Delete Own Jobs
- Protected Routes
- MongoDB Database

---

## Tech Stack
- React
- Node.js
- Express.js
- MongoDB
- JWT
- bcryptjs
- Tailwind CSS

## Setup

### Prerequisites

- Node.js 18+ (recommended)
- npm 9+
- MongoDB (Atlas)

### Install dependencies

Backend:

```
cd backend
npm install
```

Frontend:

```
cd frontend
npm install
```

## Environment variables

### Backend (backend/.env)

Create backend/.env with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

//Use this as URI:mongodb+srv://sujithascc1_db_user:Signlogin1@service.8m2fbkk.mongodb.net/?appName=Service



```

### Frontend (frontend/.env.local)

Create frontend/.env.local with:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Run instructions

### Backend

```
cd backend
npm run dev
```

### Frontend

```
cd frontend
npm run dev
```

The frontend runs on http://localhost:3000 by default and will call the backend at NEXT_PUBLIC_API_URL.

## Seed data

The seed script creates sample users and job requests. It uses the same
`backend/.env` file for MongoDB connection.

Run from the backend folder:

```
cd backend
node src/seed/seed.js
```

