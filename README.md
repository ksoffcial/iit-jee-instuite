# 📚 ITT JEE & NEET Institute Management System

A full-stack Institute Management System built for coaching institutes offering **JEE** and **NEET** preparation. The platform provides separate dashboards for **Students** and **Administrators**, allowing seamless batch management, online admissions, mock tests, teacher management, and student performance tracking.

---

# 🚀 Features

## 🔐 Authentication

* Student Registration
* Student Login
* Admin Login
* JWT Authentication
* Role-Based Authorization (Admin/User)
* Protected Routes
* Secure Cookie Authentication

---

# 👨‍🎓 User Features

### 📅 Batch Section

* View Running Batches
* View Upcoming Batches
* Batch Details
* Batch Schedule

### 👨‍🏫 Teacher Information

* View Teachers Assigned to Each Batch
* Teacher Profiles

### 📝 Mock Test

* Attempt Online Mock Tests
* View Scores
* Instant Result Generation

### ⭐ Reviews

* Write Reviews for Classes
* View Student Reviews

### 🎓 Online Admission

Students can apply for:

* Offline Classes
* Online Classes

### 🏆 Result Section

* View Top Performers
* Student Ranking
* Performance Highlights

### 🤖 AI Chatbot

* Instant Doubt Solving
* Quick Student Assistance


### 🎯 Counsellor Support

Students can connect with counsellors to receive guidance on:

* Best Batch Selection
* Career Advice
* Admission Assistance

---

# 👨‍💼 Admin Features

## Batch Management

* Create Batch
* Update Batch
* Delete Batch

## Mock Test Management

* Create Mock Tests
* Delete Mock Tests
* Publish Tests
* View Student Results
* Analyze Student Performance

## Student Management

* View All Students
* Student Details
* Admission Records

## Teacher Management

* Add Teacher
* Remove Teacher
* Assign Teachers to Batches

## User Management

* Convert User into Admin
* Role Management

---

# 🛠 Tech Stack

## Frontend

* React.js
* Tailwind CSS
* DaisyUI
* Lucide React
* React Hook Form
* Redux
* Zod

### Frontend Responsibilities

* Responsive User Interface
* Form Handling
* State Management
* Client-side Validation
* Beautiful UI Components

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Redis
* Cookie Parser
* CORS
* Validator
* SHA-256 Password Hashing *(Recommended: bcrypt for production)*

### Backend Responsibilities

### Express.js

Handles API routing and server logic.

### MongoDB

Stores all application data such as:

* Students
* Teachers
* Batches
* Mock Tests
* Admissions
* Reviews

### Mongoose

Provides schema validation and database interaction.

### JWT

Generates authentication tokens and stores them in HTTP cookies.

### Redis

Stores blocked/blacklisted JWT tokens after logout to prevent unauthorized access.

### Validator

Validates incoming request data before interacting with the database.

### Middleware

Custom middleware ensures secure authorization.

* User Middleware
* Admin Middleware

These middlewares verify:

* Logged-in user
* Admin access
* Protected routes

---

# 🚀 Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |
| Redis    | Redis Cloud   |

---

# 📁 Project Structure

```
project/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── hooks/
│   ├── utils/
│   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── services/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

# ⚠️ Challenges Faced

## Challenge

The most challenging part of this project was developing the **Mock Test Management System**, especially allowing administrators to create dynamic mock tests from the admin panel.

Initially, I planned to build a highly dynamic question management system where admins could create multiple question types with flexible configurations. This approach quickly became complex due to question validation, answer mapping, and result evaluation.

## Solution

To keep the project stable and maintainable, I redesigned the architecture and implemented a simpler yet effective mock test system.

The final implementation includes:

* Admin-created mock tests
* Multiple-choice questions
* Automatic answer checking
* Instant score generation
* Result storage in MongoDB
* Performance analysis for students

This simplified approach reduced development complexity while delivering all the core functionality required by the institute.

---

# 🔒 Security Features

* JWT Authentication
* Protected Routes
* Role-Based Authorization
* Redis Token Blacklisting
* Cookie-Based Authentication
* API Validation
* Password Hashing
* Secure Middleware

---

# 📈 Future Improvements

* Online Live Classes
* Payment Gateway Integration
* Email Notifications
* Attendance Management
* Assignment Submission
* Certificate Generation
* Video Lecture Portal
* AI-Based Performance Analytics
* Push Notifications
* Mobile Application

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/ksoffcial/iit-jee-instuite.git
```

## Backend

```bash
cd backend

npm install

npm run dev
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🌟 Why This Project?

This project was built to simplify coaching institute management by providing a centralized platform for students and administrators. It streamlines admissions, batch management, teacher allocation, mock tests, and student performance tracking while ensuring secure authentication and a user-friendly experience.

---

# 👨‍💻 Author

**Kishan KD**

Full Stack Developer

### Skills

* React.js
* Node.js
* Express.js
* MongoDB
* Redux
* JWT Authentication
* Redis
* Tailwind CSS
* REST APIs

---

## ⭐ If you like this project, don't forget to give it a Star on GitHub!
