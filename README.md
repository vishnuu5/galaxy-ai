# Full-Stack Application

A complete full-stack application built with React (Vite), Node.js, Express, MongoDB, and Cloudinary.

## Demo
Click => [Here](https://galaxy-ai-one.vercel.app)

## Features

- User authentication (register, login, logout)
- User profile management
- Post creation with image upload
- CRUD operations for posts
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend

- React.js (with Vite)
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for image storage
- Multer for file uploads

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Cloudinary account

### Installation

1. Clone the repository:
   git clone

```bash
https://github.com/vishnuu5/galaxy-ai.git
cd fullstack-app
```

2. Install server dependencies:

```bash
cd server
npm install
```

3. Install client dependencies:

```bash
cd ../client
npm install
```

4. Set up environment variables:

- Create a `.env` file in the server directory based on the `.env.example` file
- Create a `.env` file in the client directory based on the `.env.example` file

5. Start the development servers:

For the backend:

```bash
cd server
npm run dev
```

- For the frontend:

```bash
cd client
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Deployment

### Backend

1. Deploy the server to a platform like vercel
2. Set up the environment variables on your hosting platform

### Frontend

1. Build the client:

```bash
cd client
npm run build
```

2. Deploy the `dist` folder to a static hosting service like Vercel, Netlify, or GitHub Pages

## License

This project is licensed under the MIT License - see the LICENSE file for details.
