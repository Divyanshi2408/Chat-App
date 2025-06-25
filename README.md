# 💬 MERN Chat App

A real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with **Socket.IO** for instant messaging. Includes features like online status, unread message notifications, authentication, and user profiles.

![image](https://github.com/user-attachments/assets/eb82f802-3488-4e87-b895-632c758c378b)

![Image](https://github.com/user-attachments/assets/9a809c23-45ac-4b59-b675-3dd8b49fa30f)

![Image](https://github.com/user-attachments/assets/a4b83477-dd4a-4911-843e-d750da599a59)

---

## 🚀 Features

- 🧑‍🤝‍🧑 Real-time messaging with Socket.IO
- 🔒 JWT Authentication (Login/Signup)
- 👁️ Online/offline status tracking
- 🔔 Unread message notifications
- 📝 Update profile & settings
- 🌙 switch into different theme
- 📱 Responsive UI

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router
- Zustand / Redux (state management)
- Axios
- Tailwind 

**Backend:**
- Node.js
- Express.js
- MongoDB 
- Socket.IO
- JSON Web Tokens (JWT)
- Bcrypt.js

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Divyanshi2408/Chat-App
cd chat-app
```
2. Install dependencies for frontend & backend
```
# In root directory
cd client
npm install

cd ../server
npm install
```
3. Set up .env in /server directory
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
4. Run the app
➤ Start Backend Server
```
cd server
node src/index.js
```
➤ Start Frontend
```
cd client
npm start
```
## 💬 Contact
📧 [divyanshipal2808@gmail.com]
