# AI_Powered_Finance_Tracker

# 🏦 AI Powered Finance Tracker

A full-stack application to manage personal finances, upload bank statements (CSV/PDF), and track income/expenses.

---

## 🚀 Features
- Add transactions manually (date, description, category, amount, type).
- Upload bank statements (CSV/PDF).
- Parse & store transactions automatically.
- View all transactions in UI.
- MongoDB database with Mongoose models.

---

## 🛠 Tech Stack
- **Frontend:** React, Axios
- **Backend:** Node.js, Express.js, Multer, csv-parser, pdf-parse
- **Database:** MongoDB (Mongoose ORM)

---

## 📦 Installation

### 1. Clone repo
```bash
git clone https://github.com/rohitKumarSingh19/AI_Powered_Finance_Tracker.git
cd AI_Powered_Finance_Tracker

2. Backend Setup
cd server
npm install
npm run dev

Environment variables (.env):
PORT=5000
MONGO_URI=your_mongo_connection_string

3. Frontend Setup
cd client
npm install
npm start

📂 Project Structure
finance-tracker/
│
├── server/                # Backend (Node.js + Express)
│   ├── controllers/       # Logic for transactions
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── uploads/           # Uploaded CSV/PDF files
│   └── server.js          # Entry point
│
├── client/                # Frontend (React)
│   ├── src/
│   │   ├── components/    # UI components
│   │   └── App.js
│
└── README.md

🧪 API Endpoints
GET api/transactions → Fetch all transactions

POST api/transactions → Add a transaction manually

POST api/transactions/upload → Upload & parse a CSV/PDF file

📌 Future Improvements

Authentication (JWT login/signup).
AI-powered expense categorization.
Graphs & reports dashboard.


👨‍💻 Author
Rohit Singh

