# 🌍 Globalco Job Board

A full-stack Job Board application built with React, TypeScript, Express, Prisma, and PostgreSQL. Users can browse jobs, manage companies, and perform complete CRUD operations through a modern responsive interface.

## 🚀 Live Demo

**Frontend:** https://job-board-waqaralipatel.vercel.app/

**Backend:** https://job-board-uq0e.onrender.com/health

**Swagger API:** https://job-board-uq0e.onrender.com/api/docs/

---

# ✨ Features

- Browse Jobs
- View Job Details
- Browse Companies
- Create Job
- Update Job
- Delete Job
- Create Company
- Update Company
- Delete Company
- Responsive UI
- REST API
- Swagger Documentation
- PostgreSQL Database
- Prisma ORM

---

# 🛠 Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form

## Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Swagger

---

# 📁 Project Structure

```text
job-board/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── prisma/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
cd job-board
```

## Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_database_url
PORT=5000
```

Run migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npm run seed
```

Start backend:

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

# 📖 API Documentation

Swagger UI is available at:

```text
/backend/api-docs
```

---

# 📸 Screenshots

Add after deployment.

- Home
- Jobs
- Companies
- Job Details

---

# 🚀 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | PostgreSQL |

---

# 🔮 Future Improvements

- Authentication & Authorization
- Save Jobs
- Job Search Filters
- Pagination
- File Uploads
- Email Notifications

---

# 👨‍💻 Author

**Waquar Ali**

- GitHub: https://github.com/waquaralipatel
- LinkedIn: https://www.linkedin.com/in/waquar-ali-218b9a2a6/

---

⭐ If you found this project useful, consider giving it a star.