# 🚀 Mini Blog Platform (MERN Stack)

A full-stack Mini Blog Platform built using the MERN Stack with authentication, protected routes, and complete CRUD functionality.

This project demonstrates secure authentication using JWT, password hashing with bcrypt, RESTful API design, protected routes, and a responsive modern UI.

---

## 🛠 Tech Stack

### 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt (Password Hashing)
- Multer (Image Upload)
- dotenv
- cors

### 🔹 Frontend
- React (Vite)
- React Router DOM
- Context API (Authentication State)
- Axios
- Tailwind CSS
- React Quill (Rich Text Editor)

---

## ✨ Features

### 🔐 Authentication
- User Registration
- Login with JWT
- Secure password hashing
- Protected routes
- Logout functionality

### 📝 Blog Management
- Create Post
- Read All Posts (Public)
- Read Single Post
- Update Post (Owner Only)
- Delete Post (Owner Only)
- Search by Author
- Pagination
- Image Upload (Optional)
- Rich Text Editor for content

---

## 📂 Project Structure

```
mini-blog-platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/mini-blog-platform.git
cd mini-blog-platform
```

---

## 🔹 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

Start backend:

```bash
npm run dev
```

Server runs on:
```
http://localhost:5000
```

---

## 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## 🔌 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |

---

### 📝 Post Routes

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | /api/posts | Public |
| GET | /api/posts/:id | Public |
| POST | /api/posts | Protected |
| PUT | /api/posts/:id | Protected (Owner only) |
| DELETE | /api/posts/:id | Protected (Owner only) |

---

## 🔒 Authentication Flow

1. User registers with email & password.
2. Password is hashed using bcrypt.
3. On login, JWT token is generated.
4. Token is stored in localStorage.
5. Axios interceptor attaches token to protected API requests.
6. Backend middleware verifies JWT.
7. Only authorized users can modify posts.

---

## 📸 Screenshots

Add screenshots here:

```
/screenshots/login.png
/screenshots/dashboard.png
/screenshots/create-post.png
```

---

## 🚀 Deployment (Example)

### Backend
Deploy on:
- Render
- Railway
- DigitalOcean

### Frontend
Deploy on:
- Vercel
- Netlify

---

## 🔮 Future Improvements

- Role-Based Access (Admin/User)
- Comments System
- Like/Dislike System
- Cloudinary Image Upload
- Docker Setup
- CI/CD Pipeline
- Dark Mode UI

---

## 🧠 What This Project Demonstrates

- Secure JWT Authentication
- RESTful API Design
- Middleware Authorization
- Owner-Based Access Control
- Pagination & Filtering
- Rich Text Handling
- Full-Stack MERN Integration
- Clean Folder Structure
- Production-Ready Code Organization

---

## 👨‍💻 Author

**Keyur Panchani**  
MERN Stack Developer  

---

## 📄 License

This project is licensed under the MIT License.
