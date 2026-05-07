# Setup Guide

## Complete Setup Instructions

### 1. Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `server` directory:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key_here
```

**Getting MongoDB URI:**

- **MongoDB Atlas (Cloud):**
  1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  2. Create a free account
  3. Create a new cluster
  4. Click "Connect" → "Connect your application"
  5. Copy the connection string
  6. Replace `<password>` with your database password
  7. Replace `<dbname>` with `portfolio` (or your preferred name)

- **Local MongoDB:**
  ```env
  MONGODB_URI=mongodb://localhost:27017/portfolio
  ```

4. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 2. Frontend Setup

1. In the root directory, create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 3. Create Admin Account

You need to create an admin account to access the admin panel. You can do this in several ways:

**Option 1: Using curl**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

**Option 2: Using Postman or similar tool**
- Method: POST
- URL: `http://localhost:5000/api/auth/register`
- Headers: `Content-Type: application/json`
- Body (JSON):
```json
{
  "username": "admin",
  "password": "yourpassword"
}
```

**Option 3: Using a simple HTML form**
Create a file `register.html` in the server directory:
```html
<!DOCTYPE html>
<html>
<body>
  <form id="registerForm">
    <input type="text" id="username" placeholder="Username" required>
    <input type="password" id="password" placeholder="Password" required>
    <button type="submit">Register</button>
  </form>
  <script>
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: document.getElementById('username').value,
          password: document.getElementById('password').value
        })
      });
      const data = await response.json();
      alert(data.token ? 'Admin created! Token: ' + data.token : 'Error: ' + data.error);
    });
  </script>
</body>
</html>
```

### 4. Access Admin Panel

1. Navigate to `http://localhost:5173/admin`
2. Login with your admin credentials
3. Start managing your portfolio!

## API Endpoints

### Public Endpoints
- `GET /api/profile` - Get profile information
- `GET /api/skills` - Get all skills
- `GET /api/projects` - Get all projects

### Admin Endpoints (Require Authentication)
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register (for initial setup)
- `PUT /api/profile` - Update profile
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## File Structure

```
portfolio/
├── server/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & upload middleware
│   ├── uploads/         # Uploaded images (created automatically)
│   ├── server.js        # Main server file
│   └── package.json
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components (Home, Admin)
│   └── ...
└── package.json
```

## Troubleshooting

### Backend won't start
- Check if MongoDB is running (if using local MongoDB)
- Verify your MongoDB URI is correct
- Check if port 5000 is available

### Can't upload images
- Make sure the `server/uploads` directory exists
- Check file permissions
- Verify file size is under 5MB

### Frontend can't connect to backend
- Make sure backend is running on port 5000
- Check `VITE_API_URL` in your `.env` file
- Check browser console for CORS errors

### Admin login fails
- Make sure you've created an admin account
- Check if JWT_SECRET is set in backend `.env`
- Clear browser localStorage and try again

## Production Deployment

### Backend
1. Set environment variables on your hosting platform
2. Make sure MongoDB Atlas allows connections from your server IP
3. Update `VITE_API_URL` in frontend to point to your backend URL

### Frontend
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Vercel, Netlify, or similar
3. Set environment variable `VITE_API_URL` to your production backend URL

