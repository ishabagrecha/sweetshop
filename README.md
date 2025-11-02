

🍬 SweetShop

SweetShop is a full-stack MERN web application that allows users to browse, purchase, and track their orders of Indian sweets. It features secure authentication, dynamic dashboards, and order management functionalities.

🚀 Features
🔐 User Authentication

Secure signup and login using JWT (JSON Web Tokens)

Password hashing using bcrypt for security

Auth-protected routes for dashboard and order management

📊 User Dashboard

Displays key metrics:

Total Orders

Total Amount Spent

Last Purchase Date

Personalized greeting with user information

Admin overview for managing orders

🧾 Purchase History

Displays order history with:

Order ID

Product name, quantity, and per-unit price

Order status (e.g., Completed)

Total amount and purchase date

🧁 Product (Sweets) Management

Fetch available sweets from backend API

View details and price per unit

Add items to order and complete checkout

🏗️ Tech Stack
Layer	Technology
Frontend	React.js, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB
Authentication	JWT + bcrypt
Other Tools	Axios, React Router, dotenv
⚙️ Installation and Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/SweetShop.git
cd SweetShop

2️⃣ Backend Setup
cd backend
npm install


Create a .env file inside the backend folder with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Start the backend:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm start

🧩 Folder Structure
SweetShop/
│
├── backend/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│
└── README.md

📡 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login existing user
Order Routes
Method	Endpoint	Description
GET	/api/orders	Fetch user’s orders
POST	/api/orders	Create new order
GET	/api/orders/:id	Get order by ID
🧠 Implementation Details

Passwords hashed using bcryptjs

Token-based session handled via JWT in HTTP headers

Middleware authMiddleware.js used to verify tokens before accessing protected routes

Frontend state management through React Context / Hooks

Dashboard dynamically fetches data from backend using Axios

Frontend responsive layout achieved using Tailwind CSS grid & flex utilities

📸 Preview

User Dashboard Example:

Displays name, email, quick stats, and purchase history

Example fields:

Orders: 3

Spent: ₹20,000

Last Purchase: Sep 27, 2025

🧾 Requirements Fulfilled
Requirement	Implementation
Secure login/signup	Implemented using JWT & bcrypt
Protected routes	Auth middleware verifies JWT
Dashboard analytics	Displays dynamic order data
Data persistence	MongoDB stores users & orders
UI	Clean, responsive React dashboard
Additional features	Admin panel, purchase tracking
🧪 Testing

Postman used for API testing (Auth + Orders)

Frontend validation for empty inputs and errors

Cross-browser tested (Chrome, Brave, Edge)
🧠 My AI Usage
🧩 Tools Used

ChatGPT (OpenAI GPT-5)

GitHub Copilot

⚙️ How I Used AI

ChatGPT:

Helped brainstorm project architecture and API route structures.

Generated boilerplate code for authentication, route protection, and Mongoose schema design.

Assisted in debugging common Express.js and JWT issues during early setup.

Drafted this README.md following submission requirements.

GitHub Copilot:

Used inline suggestions to accelerate writing repetitive backend code (e.g., CRUD endpoints).

Helped scaffold React components for login and dashboard.

💭 Reflection on AI’s Impact

AI tools accelerated development significantly — especially in initial boilerplate setup, API structure, and quick debugging.
However:

I always verified, refactored, and tested the generated code manually.

I did not copy external repositories — every snippet was tested, understood, and adjusted to project context.

Using AI made the workflow more efficient, but critical logic, security, and structure were decided manually.

AI was treated as a pair programmer, not a replacement for actual design or reasoning.

🧪 Test Report

All key API endpoints tested via Jest & Postman

Authentication and sweets CRUD covered

Average API test success rate: 100% passing

💡 Future Enhancements

Payment gateway integration

Role-based admin dashboard UI

Sweet image uploads via Cloudinary

Mobile-friendly version with PWA support
