Student Management Console (SMC) - Backend
This is the backend component of the Student Management Console (SMC), a system designed to manage student data, courses, and academic records. It provides a RESTful API for the frontend to interact with.

📌 Project Overview
The SMC Backend is built with Node.js, Express.js, and MongoDB (or another database). It handles:
✅ Authentication & Authorization (JWT-based login, role-based access)
✅ Student & Faculty Management (CRUD operations)
✅ Course & Enrollment System (Registering students, tracking progress)
✅ Grade & Attendance Tracking
✅ API Endpoints for frontend communication

⚙️ Technologies Used
Backend: Node.js, Express.js

Database: MongoDB (or other)

Authentication: JWT (JSON Web Tokens)

API Documentation: (Swagger/Postman - if available)

Testing: Jest/Mocha (if applicable)

🚀 Installation & Setup
Prerequisites
Node.js (v16+)

MongoDB (or your preferred database)

npm / yarn

Steps
Clone the repository

bash
git clone https://github.com/aayush192/smc-backend.git
cd smc-backend
Install dependencies

bash
npm install
# or
yarn install
Set up environment variables

Rename .env.example to .env

Configure database, JWT secret, etc.

Run the server

bash
npm start
# For development (with nodemon)
npm run dev
Access the API

Default URL: http://localhost:3000 (or your configured port)

🔍 API Endpoints (Sample)
Endpoint	Method	Description
/api/auth/login	POST	User login (JWT token generation)
/api/students	GET	Fetch all students
/api/courses	POST	Create a new course
/api/enroll	POST	Enroll a student in a course
/api/grades	PUT	Update student grades
