Opinion Trading App Backend

Overview

This is the backend server for the Opinion Trading platform, built using Node.js, Express, MongoDB, and WebSockets. It handles user authentication, opinions, and live data streaming with WebSockets.

Features

User Registration & Login (JWT-based authentication)

Post and Retrieve Opinions

Real-time Updates with WebSockets

MongoDB Database integration

Tech Stack

Node.js: JavaScript runtime environment

Express.js: Web framework for API handling

MongoDB: NoSQL database to store user data and opinions

Mongoose: ODM for MongoDB

WebSockets: Real-time data communication

dotenv: Environment configuration

Setup Instructions

1. Install Node.js and MongoDB

Ensure you have:

Node.js (v20.15.1 or newer)

MongoDB installed and running locally

2. Clone the Repository

git clone https://github.com/your-username/opinion-trading-backend.git
cd opinion-trading-backend

3. Install Dependencies

npm install

4. Configure Environment Variables

Create a .env file in the root directory and add:

PORT=5000
MONGO_URI=mongodb://localhost:27017/opinion-trading
JWT_SECRET=your-secret-key

5. Run the Server

node src/index.js

The server will start at http://localhost:5000

API Endpoints

Authentication

Register User

Endpoint: POST /api/auth/register

Body:

{
  "username": "exampleUser",
  "email": "example@email.com",
  "password": "password123"
}

Response:

{
  "message": "User registered successfully"
}

Login User

Endpoint: POST /api/auth/login

Body:

{
  "email": "example@email.com",
  "password": "password123"
}

Response:

{
  "token": "your.jwt.token"
}

Opinions

Create Opinion

Endpoint: POST /api/opinions

Body:

{
  "content": "This is my opinion!"
}

Response:

{
  "message": "Opinion posted successfully"
}

Get All Opinions

Endpoint: GET /api/opinions

Response:

[
  {
    "username": "exampleUser",
    "content": "This is my opinion!",
    "timestamp": "2025-03-13T12:00:00Z"
  }
]

WebSocket Setup

Connect to ws://localhost:5000

Listens for real-time updates on opinions

Example WebSocket Event:

socket.on('newOpinion', (data) => {
  console.log('New Opinion:', data);
});

Testing with Postman

Register a user → POST /api/auth/register

Login → Get the JWT token

Create opinions (Include JWT token in headers: Authorization: Bearer <token>)

Get all opinions

Troubleshooting

MongoDB Not Connecting

Ensure MongoDB is running:

mongod --dbpath "C:\data\db"

Port Already in Use

Find the process using the port:

netstat -ano | findstr :5000

Kill the process:

taskkill /PID <PID> /F

WebSocket Not Working

Ensure the client connects to ws://localhost:5000

Restart the backend server

Future Improvements

Add opinion voting feature

Implement sentiment analysis

Improve error handling