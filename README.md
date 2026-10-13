# ShopSmart — Product Comparison Platform

ShopSmart is a full-stack web application that helps users compare products, explore product details, and identify potential savings before making a purchase.

## Features

- **Product Listing:** View products stored in a MongoDB database.
- **Search Products:** Find products by name, category, or description.
- **Category Filtering:** Browse products by category.
- **Sorting:** Organize products using the available sorting options.
- **Product Details:** View individual product information in a popup.
- **Product Comparison:** Compare up to two products side by side.
- **Smart Savings Calculator:** Identify the cheaper product and calculate the price difference.

## Tech Stack

**Frontend**
- React.js
- Vite
- CSS

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB Atlas
- Mongoose

**Tools**
- Visual Studio Code
- Git and GitHub
- npm

## Project Structure

```text
ShopSmart/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- A MongoDB Atlas account or another MongoDB database

### 1. Clone the repository

```bash
git clone https://github.com/keerthanaappikatla17-ship-it/ShopSmart.git
cd ShopSmart
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and add your own MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Replace the placeholder with your actual MongoDB connection string. Never upload your `.env` file or database credentials to GitHub.

Start the backend:

```bash
node server.js
```

The backend should run at:

`http://localhost:5000`

### 3. Start the frontend

Open a **second terminal** in VS Code and run:

```bash
cd D:\ShopSmart\frontend
npm install
npm run dev
```

Open the local URL displayed in your terminal. For example:

`http://localhost:5174`

Keep both the backend and frontend terminals running while using the application.

## Learning Outcomes

This project demonstrates practical experience with:

- Building a React-based user interface
- Developing REST API endpoints with Express.js
- Connecting a backend to MongoDB Atlas
- Fetching and displaying database records
- Implementing search, filtering, and sorting
- Managing React state for