# 🌐 NetSphere - Mini Social Post Application

<div align="center">

![NetSphere Banner](https://img.shields.io/badge/NetSphere-Social%20Network-blue?style=for-the-badge&logo=react)

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6+-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-v5-lightgrey?style=flat-square&logo=express)](https://expressjs.com/)

### 🔗 Live Links

| 🌐 Frontend | 🔌 Backend API |
|-------------|----------------|
| [https://net-sphere-xfwp.vercel.app](https://net-sphere-xfwp.vercel.app) | [https://netsphere.onrender.com](https://netsphere.onrender.com) |

---

**A Mini Social Post Application built for 3W Full Stack Internship Assignment**

*Inspired by the Social Page in TaskPlanet App*

</div>

---

## 👨‍💻 Author

**Atif Sayed**

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features Implemented](#-features-implemented)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Frontend](#-frontend)
- [Backend](#-backend)
- [Database](#-database)
- [Performance Optimizations](#-performance-optimizations)
- [API Endpoints](#-api-endpoints)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)

---

## 🎯 Project Overview

NetSphere is a **Mini Social Post Application** where users can:
- Create accounts (signup/login)
- Post text or images (or both)
- View posts from all users in a public feed
- Like and comment on posts

This project was built as part of the **3W Full Stack Internship Assignment**, taking UI inspiration from the Social Page in the TaskPlanet app.

### ✅ Assignment Requirements Met:

| Requirement | Status |
|-------------|--------|
| Account Creation (Signup/Login) | ✅ Implemented |
| Create Post (Text/Image/Both) | ✅ Implemented |
| Public Feed with all posts | ✅ Implemented |
| Like functionality | ✅ Implemented |
| Comment functionality | ✅ Implemented |
| Show usernames of likers/commenters | ✅ Implemented |
| MongoDB Database | ✅ Implemented |
| No TailwindCSS | ✅ Custom CSS used |
| Frontend on Vercel | ✅ Deployed |
| Backend on Render | ✅ Deployed |

---

## ✨ Features Implemented

### 🔐 1. Account Creation
- **Signup**: Users can register with name, email, and password
- **Login**: Secure JWT-based authentication
- **Password Security**: Passwords hashed using bcrypt
- **Protected Routes**: Only logged-in users can create posts, like, and comment

### 📝 2. Create Post
- Users can post **text only**, **image only**, or **both**
- Neither field is mandatory (either one is enough)
- Images uploaded to **Cloudinary** for fast CDN delivery
- Posts display author name and profile picture

### 📰 3. Public Feed
- All posts from all users visible in the feed
- Shows: username, post content, likes count, comments count
- **Paginated feed** with "Load More" button for better performance
- Posts sorted by newest first

### ❤️ 4. Like System
- Any user can like/unlike posts
- Like count updates instantly in UI
- Stores user IDs of people who liked

### 💬 5. Comment System
- Any user can comment on posts
- Comments show commenter's name
- Comment count displayed on each post
- Expandable comments section

### 🎨 6. UI/UX
- Clean, modern design inspired by TaskPlanet
- Responsive layout (mobile, tablet, desktop)
- Custom CSS styling (no TailwindCSS)
- Loading states and smooth animations

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js 19, React Router, Axios, Custom CSS |
| **Backend** | Node.js, Express.js 5 |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JWT (JSON Web Tokens) |
| **Password Hashing** | bcryptjs |
| **Image Storage** | Cloudinary |
| **Frontend Hosting** | Vercel |
| **Backend Hosting** | Render |
| **Database Hosting** | MongoDB Atlas |

---

## 📁 Project Structure

```
NetSphere/
├── frontend/                    # Frontend React Application
│   └── vite-project/
│       ├── src/
│       │   ├── components/      # Reusable UI components
│       │   │   ├── Header.jsx
│       │   │   ├── PostCard.jsx
│       │   │   ├── CreatePost.jsx
│       │   │   └── ...
│       │   ├── pages/           # Page components
│       │   │   ├── Home.jsx     # Feed page
│       │   │   ├── Login.jsx
│       │   │   ├── Register.jsx
│       │   │   └── Profile.jsx
│       │   ├── App.jsx
│       │   ├── App.css          # All custom styles
│       │   └── config.js        # API base URL
│       └── package.json
│
├── server/                      # Backend Node.js Application
│   ├── controllers/             # Business logic
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── commentController.js
│   ├── models/                  # MongoDB schemas
│   │   ├── users.js
│   │   ├── posts.js
│   │   └── Comments.js
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── commentRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT verification
│   ├── app.js                   # Express server
│   └── package.json
│
└── readme.md
```

---

## 🖥 Frontend

### Technologies Used:
- **React 19** - UI library with hooks
- **React Router v7** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form handling
- **React Icons** - Icon library
- **Vite** - Build tool
- **Custom CSS** - Styling (no TailwindCSS)

### Key Pages:

| Page | Description |
|------|-------------|
| `/login` | User login page |
| `/register` | User registration page |
| `/` | Home feed with all posts |
| `/profile` | User's own profile |
| `/profile/:userId` | View other user's profile |

### Styling Approach:
- Single `App.css` file with all styles
- CSS variables for consistent theming
- Responsive design with media queries
- No external CSS frameworks (as per assignment)

---

## ⚙️ Backend

### Technologies Used:
- **Node.js** - Runtime environment
- **Express.js 5** - Web framework
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Image storage
- **CORS** - Cross-origin requests

### API Architecture:
```
server/
├── controllers/     # Handle business logic
├── models/          # Define data schemas
├── routes/          # Define API endpoints
├── middleware/      # Auth verification
└── app.js          # Server entry point
```

---

## 🗄 Database

### MongoDB Collections:

#### 1. Users Collection
```javascript
{
  name: String,           // User's display name
  email: String,          // Unique email for login
  password: String,       // Hashed password
  profileImage: String,   // Cloudinary URL (optional)
  about: String,          // User bio (optional)
  createdAt: Date,
  updatedAt: Date
}
```

#### 2. Posts Collection
```javascript
{
  content: String,        // Post text (optional)
  imageUrl: [String],     // Image URLs (optional)
  author: ObjectId,       // Reference to User
  likes: [ObjectId],      // Array of User IDs who liked
  commentsCount: Number,  // Total comments count
  createdAt: Date,
  updatedAt: Date
}

// INDEXES for Performance
postSchema.index({ createdAt: -1 });            // Fast feed sorting
postSchema.index({ author: 1, createdAt: -1 }); // Fast user posts query
```

#### 3. Comments Collection
```javascript
{
  user: ObjectId,         // Reference to User
  post: ObjectId,         // Reference to Post
  content: String,        // Comment text
  createdAt: Date,
  updatedAt: Date
}
```

---

## ⚡ Performance Optimizations

### 1. 📄 Pagination

Instead of loading all posts at once, the feed uses **server-side pagination**:

**Backend Implementation:**
```javascript
// postController.js
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 5;
const skip = (page - 1) * limit;

const posts = await Post.find()
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit);

// Returns: { posts, currentPage, totalPages, hasMore }
```

**Frontend Implementation:**
```javascript
// Home.jsx
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);

const handleLoadMore = () => {
  fetchPosts(page + 1, true); // Append new posts
};
```

**Benefits:**
| Without Pagination | With Pagination |
|-------------------|-----------------|
| Loads ALL posts at once | Loads 5 posts at a time |
| Slow initial load | Fast initial load |
| High memory usage | Low memory usage |
| Poor mobile experience | Smooth scrolling |

---

### 2. 📊 Database Indexing

MongoDB indexes on frequently queried fields:

```javascript
// posts.js model
postSchema.index({ createdAt: -1 });            // For sorting feed
postSchema.index({ author: 1, createdAt: -1 }); // For user's posts
```

**Why Indexes Matter:**

| Without Index | With Index |
|---------------|------------|
| Scans ALL documents | Jumps directly to results |
| O(n) time complexity | O(log n) time complexity |
| Slow on large data | Fast regardless of size |

**Example:** With 10,000 posts:
- Without index: Scans all 10,000 documents
- With index: Finds results in ~13 operations (log₂ 10000)

---

### 3. 🚀 Other Optimizations

| Optimization | Description |
|--------------|-------------|
| **Selective Population** | Only fetch needed fields from referenced documents |
| **Parallel Queries** | Use `Promise.all()` for concurrent database calls |
| **Cloudinary CDN** | Images served from global CDN |
| **Lazy Loading** | Images load as they enter viewport |
| **Optimistic UI** | Like counts update before API response |

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts?page=1&limit=5` | Get paginated posts |
| POST | `/api/posts` | Create new post |
| PUT | `/api/posts/:postId/like` | Like/unlike post |
| DELETE | `/api/posts/:postId` | Delete post |
| GET | `/api/posts/user/:userId` | Get user's posts |

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/comment/:postId` | Get post comments |
| POST | `/api/comment/:postId` | Add comment |

### User

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get logged-in user |
| PUT | `/api/user/profile` | Update profile |
| GET | `/api/user/profile/:userId` | Get user by ID |

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

### 1. Clone Repository
```bash
git clone https://github.com/your-username/NetSphere.git
cd NetSphere
```

### 2. Backend Setup
```bash
cd server
npm install

# Create .env file with your credentials
npm start
```

### 3. Frontend Setup
```bash
cd frontend/vite-project
npm install
npm run dev
```

### 4. Access Application
- Frontend: http://localhost:5173
- Backend: http://localhost:8080

---

## 🔐 Environment Variables

### Backend (`server/.env`)
```env
MONGO_DB_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### Frontend (`frontend/vite-project/src/config.js`)
```javascript
// Production
const BASE_URL = 'https://netsphere.onrender.com';
export default BASE_URL;
```

---

## 🏆 Bonus Features Implemented

| Bonus | Implementation |
|-------|----------------|
| ✅ Clean and modern UI | Custom CSS with smooth animations |
| ✅ Responsive layout | Works on mobile, tablet, desktop |
| ✅ Efficient pagination | Server-side with "Load More" |
| ✅ Well-structured code | Separate controllers, models, routes |
| ✅ Code comments | Documented functions and logic |

---

<div align="center">

### 🔗 Live Links

| Frontend | Backend |
|----------|---------|
| [https://net-sphere-xfwp.vercel.app](https://net-sphere-xfwp.vercel.app) | [https://netsphere.onrender.com](https://netsphere.onrender.com) |

---

**Made with ❤️ by Atif Sayed**

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

</div>
