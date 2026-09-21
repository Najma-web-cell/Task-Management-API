# Task Management API

A clean and scalable RESTful API built with **Node.js** and **Express.js** for managing tasks. Features local JSON file persistence, input validation, pagination, filtering, sorting, centralized error handling, and rate-limiting middleware.

---

## Features

- **CRUD Operations**: Full support for creating, reading, updating, and deleting tasks.
- **Local JSON Persistence**: Manages data directly through file system storage without database setup.
- **Pagination & Query Parameters**: Filter by status, search by keyword, sort by date/priority, and paginate results.
- **Rate Limiting**: Protects endpoints against abuse and brute-force requests.
- **Centralized Error Handling**: Standardized HTTP status codes and JSON error responses.
- **Environment Configuration**: Safe setup using environment variables via `.env`.

---

## Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Middleware**: Express Rate Limit, Cors
- **Version Control**: Git & GitHub

---

## Project Structure

```text
task-management-api/
├── data/
│   └── tasks.json
├── src/
│   ├── controllers/
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── models/
│   │   └── taskModel.js
│   ├── routes/
│   │   └── taskRoutes.js
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
└── README.md

## Getting Started
### Prerequisites

Node.js (v16 or higher)

npm (Node Package Manager)


### Installation

1. **Clone the repository:**

  git clone [https://github.com/Najma-web-cell/Task-Management-API.git](https://github.com/Najma-web-cell/Task-Management-API.git)
cd task-management-api

2. **Install dependencies:**

   npm install

3. **Set up Environment Variables:**
Copy .env.example to .env and set your desired port and configurations:

cp .env.example .env

4. **Start the server:**

# Development mode
npm run dev

# Production mode
npm start

**API Endpoints:**

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/tasks` | Get all tasks (supports query parameters) |
| `GET` | `/api/tasks/:id` | Get a single task by ID |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update an existing task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

**Author**

Najma Chaudhary

GitHub: @Najma-web-cell