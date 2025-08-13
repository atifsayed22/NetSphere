# NetSphere

NetSphere is a social media platform where users can create profiles, log in, update their profiles with images and banners, connect with other users, and interact with posts through likes and comments. The project is built with a modern tech MERN stack and designed to be scalable, responsive, and feature-rich.

---

## 🚀 Features

### **Frontend**
The frontend is built using **React.js** and deployed on **Vercel**. It offers a clean, responsive, and intuitive UI for engaging with the platform.

#### Current Features:
1. **User Authentication**
   - Sign up and log in using secure JWT-based authentication.
   - Proper error handling and validation.

2. **Profile Management**
   - Create and edit profile details (name, email, bio).
   - Upload profile pictures and banners for personalization.

3. **Post Interaction**
   - Create, like, and comment on posts.
   - Real-time updates for likes and comments.

4. **Connections System**
   - Send and receive connection requests.
   - Accept/decline requests to grow your network.
   - View other users’ profiles and their posts.

5. **Responsive Design**
   - Works seamlessly on mobile, tablet, and desktop.

---

### **Backend**
The backend is built with **Node.js** and **Express.js**, deployed on **Render**, and connected to **MongoDB** for data persistence.

#### Current Features:
1. **User Management**
   - Secure registration, login, and profile update APIs.
   - Password encryption for secure storage.

2. **Post Management**
   - Create, edit, delete posts.
   - Like and comment functionality.

3. **Connection Management**
   - Endpoints for sending, accepting, and rejecting connection requests.
   - Fetch connections and pending requests.

4. **Image Upload**
   - Upload and store profile and banner images.

5. **CORS Configuration**
   - Configured to allow frontend-backend communication.

---

## 🔮 Future Enhancements

1. **Top Profiles**
   - Highlight the most active or popular profiles.

2. **Challenges**
   - Allow users to participate in engagement-based challenges.

3. **Stories**
   - Temporary stories that expire after 24 hours.

4. **Messaging**
   - Real-time direct messaging between connected users.

5. **Notifications**
   - Push notifications for likes, comments, and connection requests.

6. **Search & Explore**
   - Search for users or posts.
   - Explore trending topics and posts.

7. **Follow System**
   - Follow users without requiring mutual connection.

8. **Analytics Dashboard**
   - Insights into profile activity, post performance, and engagement.

---

## 🛠 Tech Stack

### **Frontend**
- React.js
- Axios
- Tailwind CSS
- React Router
- Deployed on **Vercel**

### **Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer for file uploads
- Deployed on **Render**

---

## 📦 Installation & Setup

### **Backend**
```bash
# Clone repository
git clone https://github.com/your-repo/backend.git
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
# Live Links 

Frontend: https://net-sphere-sfar.vercel.app
Backend API: https://netsphere.onrender.com/