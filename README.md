
## About Me

- **Name:** Aravind V U  
- **University:** Indian Institute of Technology Madras (IIT Madras)  
- **Department:** Ocean Engineering 

This repository is part of my internship application. It contains the source code and documentation for a platform featuring a PDF-based chatbot and task reminder system.

# PDF Chatbot & Task Reminder Platform

## Overview
This platform provides two main functionalities:  
1. **PDF-based Chatbot:** Upload PDF documents and interactively ask questions. Answers are generated using Google Gemini API, leveraging PDF content and conversation context.  
2. **Task Reminder System:** Manage tasks with deadlines and receive email reminders before the deadlines.

The frontend is built with **React.js**, and the backend uses **Node.js** with **MongoDB** for persistent storage.

---

## Features
### PDF Chatbot
- Upload PDF files and extract text content.
- Ask questions interactively based on the uploaded PDFs.
- Maintains conversation context for richer answers.
- Integrates with **Google Gemini API** (gemini-2-flash).

### Task Reminder System
- Create, read, update, and delete tasks.
- Set deadlines and receive automated email reminders.
- Emails sent via **Nodemailer** and **Brevo API**.
- Task data stored in **MongoDB**.

---

## Technologies Used
- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **File Uploads:** Multer  
- **PDF Parsing:** pdfparser  
- **Chatbot API:** Google Gemini API  
- **Email Notifications:** Nodemailer & Brevo API  
- **HTTP Requests:** Axios  

---

## API Endpoints

### PDF Upload
- `POST /api/pdf/upload` – Upload PDF and extract text for chatbot.

### Chatbot
- `POST /api/chat` – Send message along with PDF and session context for answer generation.

### Task Management
- `GET /api/task/` – Get all tasks  
- `POST /api/task/create` – Create a new task  
- `PUT /api/task/:id` – Edit a task  
- `DELETE /api/task/:id` – Delete a task  

---

## Database Schema (MongoDB)

**Tasks Collection**
| Field     | Type      | Description               |
|-----------|-----------|---------------------------|
| title     | String    | Task name/title           |
| deadline  | DateTime  | Task deadline             |
| email     | String    | User email for reminders  |

---

## How It Works

### PDF Chatbot Flow
1. User uploads a PDF → Backend extracts text → Stored in-memory.  
2. User asks questions → Backend sends combined PDF text + session context to Gemini API → Response returned to frontend.  

### Task Reminder Flow
1. User creates tasks → Stored in MongoDB.  
2. Backend monitors deadlines → Sends email reminders via Nodemailer/Brevo before task deadlines.

---

## Installation & Setup

**Clone the repository**
```bash
git clone https://github.com/na23b005/IBY
```
## Backend Setup
```bash
cd backend
npm install
```
Create a .env file in the backend folder with the following variables:
```bash
MONGODB_URI=<your-mongodb-connection-string>
BREVO_API_KEY=<your-brevo-api-key>
EMAIL_USER=<your-email-address>
EMAIL_PASS=<your-email-password>
PORT=4000
```
Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
The frontend runs on http://localhost:3000
 by default.

Run Backend
```bash
cd ../backend
npm run start
```

The backend runs on http://localhost:4000

