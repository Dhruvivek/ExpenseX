# ExpenseX 💸

A secure REST API for tracking personal expenses. Built with Node.js, Express, and MongoDB.

🔗 **Live:** https://expensex-tutr.onrender.com
📁 **Repo:** https://github.com/Dhruvivek/ExpenseX


---

## Features

- 🔐 JWT-based authentication (register & login)
- 💰 Full CRUD on expenses
- 🔍 Filter expenses by category and date range
- 📊 Sort and paginate results
- 📈 Summary stats — total spent, category breakdown, monthly totals
- 🛡️ Secured with Helmet and rate limiting
- ✅ Input validation and error handling

---

## Tech Stack

| Layer      | Technology                 |
|------------|----------------------------|
| Runtime    | Node.js (ESM)              |
| Framework  | Express.js v5              |
| Database   | MongoDB with Mongoose      |
| Auth       | JSON Web Tokens (JWT)      |
| Security   | Helmet, express-rate-limit |
| Password   | Bcrypt                     |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repo

```bash
git clone https://github.com/Dhruvivek/ExpenseX.git
cd ExpenseX
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```
URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Start the server

```bash
# Development
npm run dev

# Production
npm start
```

Server runs at `http://localhost:3000`

---

## Testing the API

A Postman collection is included — `ExpenseX.postman_collection.json`

1. Open Postman → **Import** → select the file
2. Hit **Register** first — token saves automatically
3. All protected requests will work immediately

---

## API Reference

### Base URL
```
https://expensex-tutr.onrender.com/v1
```

### Authentication

All expense routes require a Bearer token in the header:
```
Authorization: Bearer <your_token>
```

---

### Auth Routes

#### Register
```
POST /auth/register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### Login
```
POST /auth/login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Expense Routes

#### Create Expense
```
POST /expense/create
```
**Request Body:**
```json
{
  "title": "Lunch",
  "amount": 150,
  "category": "Food",
  "description": "Lunch with friends",
  "date": "2024-01-15"
}
```

---

#### Get All Expenses
```
GET /expense/getAll
```

**Query Parameters:**

| Param    | Type   | Default | Description             |
|----------|--------|---------|-------------------------|
| category | String | —       | Filter by category      |
| from     | Date   | —       | Start date (YYYY-MM-DD) |
| to       | Date   | —       | End date (YYYY-MM-DD)   |
| sort     | String | date    | Field to sort by        |
| order    | String | desc    | `asc` or `desc`         |
| page     | Number | 1       | Page number             |
| limit    | Number | 10      | Results per page        |

**Example:**
```
GET /expense/getAll?category=Food&from=2024-01-01&to=2024-01-31&page=1&limit=10
```

**Response:**
```json
{
  "total": 25,
  "page": 1,
  "totalPages": 3,
  "expenses": [...]
}
```

---

#### Update Expense
```
PATCH /expense/update/:id
```
**Request Body:** (any fields to update)
```json
{
  "title": "Dinner",
  "amount": 200
}
```

**Response:**
```json
{
  "message": "Expense updated successfully",
  "expense": {...}
}
```

---

#### Delete Expense
```
DELETE /expense/delete/:id
```

**Response:**
```json
{
  "message": "Expense deleted successfully"
}
```

---

#### Get Summary
```
GET /expense/summary
```

**Response:**
```json
{
  "totalSpent": 5400,
  "totalExpenses": 32,
  "categoryBreakdown": [
    { "_id": "Food", "total": 2000, "count": 15 },
    { "_id": "Transport", "total": 1200, "count": 10 }
  ],
  "monthlyTotals": [
    { "_id": { "year": 2024, "month": 1 }, "total": 3200, "count": 20 }
  ]
}
```

---

### Valid Categories

```
Food, Transport, Shopping, Health, Entertainment, Education, Rent, Other
```

---

## Rate Limiting

| Route       | Limit                  |
|-------------|------------------------|
| All routes  | 100 requests / 15 min  |
| Auth routes | 10 requests / 15 min   |

---

## Project Structure

```
ExpenseX/
├── server.js
├── .env.example
├── ExpenseX.postman_collection.json
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── register.controllers.js
│   │   ├── login.controllers.js
│   │   └── expense.controllers.js
│   ├── middlewares/
│   │   └── auth.middlewares.js
│   ├── models/
│   │   ├── user.models.js
│   │   └── expense.models.js
│   └── routes/
│       ├── auth.routes.js
│       └── expense.route.js
└── package.json
```

---

## Author

**Dhruv** — [GitHub](https://github.com/Dhruvivek)