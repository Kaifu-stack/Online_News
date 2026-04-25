📰 Online News Portal Management System

A full-stack news portal platform built with React, Node.js, Express, and MongoDB.
It allows users to explore news content while admins can manage articles, users, and analytics efficiently.

<p align="center"> <img src="https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=mongodb&logoColor=white" /> <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react" /> <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" /> <img src="https://img.shields.io/badge/Database-MongoDB-green?style=for-the-badge&logo=mongodb" /> <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge&logo=jsonwebtokens" /> </p> <p align="center"> <a href="https://online-news-red.vercel.app"> <img src="https://img.shields.io/badge/Live-Demo-purple?style=for-the-badge&logo=vercel" /> </a> </p>


✨ Features
🔹 Authentication
JWT-based authentication
Login / Register
Protected routes

📰 News Management
Create, edit, delete news articles
Categorized news (Politics, Business, Technology, etc.)
Rich content display

🔍 Search & Filtering
Search news by title
Filter by category
Clean UI for fast navigation

🔥 Trending System
Trending news section
Based on views/popularity

👤 User Experience
Browse latest news
Responsive design
Smooth navigation
📊 Admin Dashboard

Total articles
Total views
Total users
Average views per article
Recent news activity

👥 User Management
Manage users
Role-based access (Admin/User)

🧑‍💻 Tech Stack
Frontend

React (Vite)
Tailwind CSS
Axios
React Router

Backend
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication

📁 Project Structure
client/
 ├── Admin/
 ├── Auth/
 ├── Common/
 ├── Context/
 ├── Hooks/
 ├── News/
 ├── Pages/
 ├── Service/
 └── Utils/

server/
 ├── config/
 ├── controllers/
 ├── middleware/
 ├── models/
 ├── routes/
 ├── utils/
 └── server.js
 
⚙️ Installation
1️⃣ Clone Repository
git clone https://github.com/Kaifu-stack/Vynqo.git
cd Vynqo

2️⃣ Backend Setup
cd server
npm install

Create .env:

PORT=8000
MONGODB_URI=your_mongo_uri
ACCESS_TOKEN_SECRET=your_secret

Run server:

npm run dev
3️⃣ Frontend Setup
cd client
npm install
npm run dev

🔗 API Endpoints (Important)
Auth
POST /api/auth/register
POST /api/auth/login
News
GET /api/news
POST /api/news
PUT /api/news/:id
DELETE /api/news/:id
Users
GET /api/users
DELETE /api/users/:id

🔥 Key Concepts Implemented
JWT authentication & authorization
Role-based access control
RESTful API design
Optimized data fetching
Responsive UI design
Scalable folder structure

🧠 Challenges Solved
Managing global state across pages
Efficient search & filtering
Securing admin routes
Handling large datasets (news articles)
Optimizing API performance

📸 Future Improvements
💬 Comment system
❤️ Like & bookmark feature
🔔 Notifications
🤖 AI-based news recommendations
🌙 Dark mode
👨‍💻 Author

Md Kaif Alam

⭐ If you like this project

Give it a star ⭐ on GitHub!
