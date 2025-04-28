# POSify

POSify is a Point of Sale (POS) system that includes a backend API and a frontend dashboard for managing products, orders, and stock analytics.

## Project Structure

```
├── backend
│   ├── src
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
│   ├── src
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/ (static assets)
│   ├── dist/ (Production build output)
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── shared
│   ├── dto.ts
│   └── interfaces.ts
```

## Backend

- **Framework**: Node.js with Express
- **Language**: TypeScript
- **Database**: MongoDB
- **API Docs**: Swagger (`/backend/docs/`)
- **Environment Variables**:
  - `PORT`
  - `DATABASE_URL`
  - `NODE_ENV`
- **Key Folders**:
  - `analytics/`, `order/`, `product/`, `stock/`: CRUD modules
  - `db/`: Database connection
  - `utils/`: Common utilities (error handling, response formatting, validation)

## Frontend

- **Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: CSS
- **Key Features**:
  - Product Management
  - Order Management
  - Stock Tracking
  - Dashboard Analytics
- **Key Folders**:
  - `api/`: Axios API calls
  - `components/`: UI components
  - `hooks/`: Custom React hooks
  - `pages/`: Pages for different routes (Dashboard, Products, Orders, Stocks)

## Scripts

### Backend

| Command | Description |
| :--- | :--- |
| `npm install` | Install backend dependencies |
| `npm run dev` | Start the backend in development mode |
| `npm run build` | Build the backend TypeScript files |
| `npm start` | Start the production backend (after build) |

### Frontend

| Command | Description |
| :--- | :--- |
| `npm install` | Install frontend dependencies |
| `npm run dev` | Start the frontend in development mode |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the built frontend locally |

## How to Run Locally

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.development` file (already included) and configure your environment variables.
4. Run the development server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the frontend app at `http://localhost:5173/` (default Vite port).

## API Documentation

After starting the backend server, Swagger API docs are available at:

```
http://localhost:3000/api/docs
```

It documents the available routes for:
- Products
- Orders
- Stocks
- Analytics

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- React
- Vite
- TypeScript
- Tailwind CSS (or custom CSS)
- Swagger (OpenAPI 3.0)
