# Build a Modern Portfolio Website with React & TailwindCSS

<div align="center">
  <br />
  <a href="https://youtu.be/YOUR_VIDEO_ID" target="_blank">
    <img src="./banner.png" alt="Portfolio Website Banner">
  </a>
  <br />
  <div>
    <img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/-Lucide Icons-FD4D4D?style=for-the-badge&logo=lucide" alt="Lucide Icons" />
    <img src="https://img.shields.io/badge/-Radix UI-9D4EDD?style=for-the-badge&logo=data:image/svg+xml;base64..." alt="Radix UI" />
  </div>
  <h3 align="center">Create a Stunning Developer Portfolio with Animations, Dark Mode, and Projects Showcase</h3>
  <div align="center">
    Follow the full video tutorial on 
    <a href="https://youtu.be/YOUR_VIDEO_ID" target="_blank"><b>YouTube</b></a>
  </div>
  <br />
</div>

## 📋 Table of Contents

1. [Introduction](#-introduction)
2. [Tech Stack](#-tech-stack)
3. [Features](#-features)
4. [Quick Start](#-quick-start)
5. [Screenshots](#-screenshots)
6. [Deployment](#-deployment)

---

## 🚀 Introduction

In this tutorial, you'll learn how to build a modern portfolio website using **React**, **TailwindCSS**, **Vite**, and **Lucide Icons**. From dark mode support to responsive animations and deployable project showcases, this video walks you through every step—perfect for developers looking to level up their frontend skills or apply for jobs.

🎥 Watch the full tutorial: [YouTube](https://youtu.be/YOUR_VIDEO_ID)

---

## ⚙️ Tech Stack

### Frontend
* **React** – Component-based UI development
* **Vite** – Lightning-fast build tool
* **TailwindCSS** – Utility-first CSS for styling
* **Lucide Icons** – Clean and beautiful icon pack
* **Radix UI** – Accessible component primitives

### Backend
* **Node.js & Express** – RESTful API server
* **MongoDB** – Database for storing portfolio data
* **Multer** – File upload handling
* **JWT** – Authentication for admin panel
* **bcryptjs** – Password hashing

### Deployment
* **GitHub & Vercel** – Frontend deployment
* **MongoDB Atlas** – Cloud database (or local MongoDB)

---

## ⚡️ Features

* 🌑 **Light/Dark Mode Toggle**
  Save theme preference in local storage with beautiful transitions

* 💫 **Animated Backgrounds**
  Stars, meteors, scroll effects, and glowing UI elements

* 📱 **Responsive Navigation**
  Desktop and mobile menus with glassmorphism

* 👨‍💻 **Hero & About Sections**
  Showcase who you are with smooth intro animations and buttons

* 📊 **Skills Grid**
  Filterable progress bars and categories with animated width

* 🖼️ **Projects Showcase**
  Display screenshots, tech stacks, and GitHub/demo links

* 📩 **Contact Section**
  Social icons + responsive contact form with toast notifications

* 👤 **Profile Picture**
  Display your profile picture in the hero section

* 🔐 **Admin Panel**
  Full CRUD interface to manage profile, skills, and projects
  - Upload profile and project images
  - Add, edit, and delete skills
  - Add, edit, and delete projects
  - Update profile information and descriptions

* 🚀 **One-Click Deployment**
  Easily host your site with Vercel and GitHub

---

## 👌 Quick Start

### Prerequisites

* [Node.js](https://nodejs.org/) (v16 or higher)
* [MongoDB](https://www.mongodb.com/try/download/community) (or MongoDB Atlas account)
* [Git](https://git-scm.com/)

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/react-tailwind-portfolio.git
cd react-tailwind-portfolio
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Set up backend**
```bash
cd server
npm install
```

4. **Configure environment variables**

Create a `.env` file in the `server` directory:
```env
MONGODB_URI=your_mongodb_connection_string_here
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

For MongoDB Atlas, your connection string will look like:
```
mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

For local MongoDB:
```
mongodb://localhost:27017/portfolio
```

5. **Create frontend environment file**

Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

6. **Start the backend server**
```bash
cd server
npm run dev
```

The backend will run on [http://localhost:5000](http://localhost:5000)

7. **Start the frontend (in a new terminal)**
```bash
npm run dev
```

Your app will be available at: [http://localhost:5173](http://localhost:5173)

### Initial Admin Setup

1. **Create an admin account**

You can create an admin account by making a POST request to `/api/auth/register`:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

Or use a tool like Postman to make the request.

2. **Access the admin panel**

Navigate to [http://localhost:5173/admin](http://localhost:5173/admin) and login with your credentials.

3. **Start managing your portfolio**

- Upload your profile picture
- Add your skills with proficiency levels
- Add projects with images, descriptions, and links
- Update your profile information

---

## 🖼️ Screenshots

> 📸 Add screenshots of your Hero section, Projects grid, and Contact form here to show off your site.

---

## ☁️ Deployment

### Deploy on Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click **Deploy**

Your live website will be hosted on a custom subdomain (e.g. `https://your-name.vercel.app`)

---

## 🔗 Useful Links

* [React Documentation](https://reactjs.org/)
* [Tailwind CSS Docs](https://tailwindcss.com/)
* [Lucide Icons](https://lucide.dev/)
* [Radix UI](https://www.radix-ui.com/)
* [Vite](https://vitejs.dev/)
* [Vercel](https://vercel.com/)

---

Let me know if you'd like me to generate a version with your actual GitHub repo, YouTube URL, or a banner image suggestion!
