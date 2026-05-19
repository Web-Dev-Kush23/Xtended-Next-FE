# XtendedSpace Frontend

A modern real estate and property management platform frontend built with **Next.js**, integrated with a **Node.js** backend and **PostgreSQL** database.  
The platform powers the digital experience of XtendedSpace, providing responsive UI, property listings, user authentication, dashboards, and scalable API integration.

## 🌐 Live Website

- Production Website: https://www.xtendedspace.com

## 🚀 Tech Stack

### Frontend
- Next.js
- React.js
- JavaScript / TypeScript
- SCSS / CSS Modules
- Axios
- Responsive UI

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Deployment & Tools
- Vercel / VPS
- Git & GitHub
- REST APIs

# 📌 Features

- Responsive modern UI
- Dynamic property listings
- SEO optimized pages using Next.js
- Authentication & authorization
- API integration with Node.js backend
- PostgreSQL database connectivity
- Admin dashboard support
- Fast page loading with SSR & SSG
- Reusable component architecture
- Mobile-friendly design

# 📂 Project Structure

```bash
xtendedspace-frontend/
│── public/
│── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── services/
│   ├── styles/
│   ├── hooks/
│   ├── utils/
│   └── assets/
│
│── .env.local
│── next.config.js
│── package.json
│── README.md
```

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/xtendedspace-frontend.git
```

## 2️⃣ Navigate to Project Folder

```bash
cd xtendedspace-frontend
```

## 3️⃣ Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

# 🔐 Environment Variables

Create a `.env.local` file in the root directory.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=https://www.xtendedspace.com
```

# ▶️ Run Development Server

```bash
npm run dev
```

Application will run on:

```bash
http://localhost:3000
```

# 🏗️ Build for Production

```bash
npm run build
```

# 🚀 Start Production Server

```bash
npm start
```

# 🗄️ Backend Overview

The backend is built using:

- Node.js
- Express.js
- PostgreSQL

### Backend Responsibilities

- REST API Management
- Authentication APIs
- Property Data Management
- User Management
- Dashboard APIs
- Database Operations

# 🧩 API Integration

Frontend communicates with backend APIs using Axios.

Example:

```javascript
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default API;
```
# 📱 Responsive Design

The application is fully optimized for:

- Desktop
- Tablet
- Mobile Devices

# 🔒 Security Features

- Environment variable protection
- Secure API handling
- Authentication middleware
- Protected routes
- PostgreSQL secure queries

# 📈 Performance Optimization

- Server Side Rendering (SSR)
- Static Site Generation (SSG)
- Lazy Loading
- Image Optimization
- Code Splitting

# 🛠️ Available Scripts

```bash
npm run dev       # Run development server
npm run build     # Build production app
npm run start     # Start production server
npm run lint      # Run ESLint
```

# 🤝 Contributing

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push to branch

```bash
git push origin feature-name
```

5. Open a Pull Request

# 📄 License

This project is licensed under the MIT License.

# 👨‍💻 Developed By

**Himanshu Kushwaha**  
Full Stack Engineer

- Website: https://www.xtendedspace.com
- Tech Stack: Next.js | Node.js | PostgreSQL | React.js

# ⭐ Support

If you like this project, please give it a ⭐ on GitHub.
