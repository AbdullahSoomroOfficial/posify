# POSify

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

POSify is a modern Point of Sale (POS) system featuring a RESTful backend API and a sleek frontend dashboard for managing products, orders, and stock analytics.

---

## Table of Contents

- [Project Structure](#project-structure)
- [How to Run Locally](#how-to-run-locally)
- [API Documentation](#api-documentation)
- [Tech Stack](#tech-stack)

---

## Project Structure

```
├── backend
│   ├── src/
│   │   ├── analytics/
│   │   ├── order/
│   │   ├── product/
│   │   ├── stock/
│   │   ├── config/
│   │   ├── db/
│   │   ├── utils/
│   │   ├── app.ts
│   │   ├── app.router.ts
│   │   └── index.ts
│   ├── docs/ (API documentation specs)
│   ├── dist/ (Compiled JavaScript output)
│   ├── .env.development
│   ├── package.json
│   └── tsconfig.json
│
├── frontend
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── dist/ (Production build output)
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── shared
│   ├── dto.ts
│   └── interfaces.ts
```

---

## How to Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) instance running locally or remotely

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start the server
npm run dev
```

Backend should be running at: [http://localhost:3000](http://localhost:3000)

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend should be running at: [http://localhost:5173](http://localhost:5173)

---

## API Documentation

Once the backend is running, Swagger docs are available at:

[http://localhost:3000/api/docs](http://localhost:3000/api/docs)

Available endpoints:
- Products CRUD
- Orders Management
- Stock Updates
- Analytics and Reports

---

## Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- TypeScript
- Swagger (OpenAPI 3.0)

**Frontend**
- React
- Vite
- TypeScript
- Tailwind CSS (or custom CSS)
