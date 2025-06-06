# Portfolio Management Website

A professional portfolio management website built with React, Node.js, and MongoDB. This application allows users to showcase their projects, skills, work experience, and educational background in a modern, responsive interface.

## Features

- **User-Friendly Interface**: Clean, modern UI with responsive design
- **Project Showcase**: Display and filter projects with details like images, descriptions, and technologies used
- **Skills Section**: Visualize skills with proficiency levels
- **Experience & Education**: Timeline-based display of work and education history
- **Contact Form**: Allow visitors to send messages directly from the website
- **Admin Dashboard**: Manage all content through a protected admin interface
- **Dark/Light Mode**: Toggle between dark and light themes
- **Resume Download**: Upload and make resume available for download
- **Authentication**: Secure admin access with JWT
- **File Upload**: Support for image and document uploads

## Tech Stack

### Frontend

- React with TypeScript
- React Router for navigation
- Material UI for components and styling
- Framer Motion for animations
- Axios for API requests

### Backend

- Node.js with Express
- TypeScript for type safety
- JWT for authentication
- Multer for file uploads
- MongoDB for database

## Project Structure

```
portfolio/
├── client/               # React frontend
│   ├── public/           # Static files
│   └── src/              # Source files
│       ├── components/   # Reusable components
│       ├── context/      # Context providers
│       ├── pages/        # Page components
│       ├── utils/        # Utility functions
│       └── hooks/        # Custom hooks
│
├── server/               # Node.js backend
│   ├── src/              # Source files
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Middleware functions
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API routes
│   │   ├── config/       # Configuration files
│   │   └── utils/        # Utility functions
│   └── uploads/          # Uploaded files
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install server dependencies:

   ```
   cd server
   npm install
   ```

3. Install client dependencies:

   ```
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_jwt_secret_key
   ```

### Running the Application

1. Start the server:

   ```
   cd server
   npm run dev
   ```

2. Start the client:

   ```
   cd client
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new admin user
- `POST /api/users/login` - Login existing user

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get a specific project
- `POST /api/projects` - Create a new project (authenticated)
- `PUT /api/projects/:id` - Update a project (authenticated)
- `DELETE /api/projects/:id` - Delete a project (authenticated)

### Skills

- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create a new skill (authenticated)
- `PUT /api/skills/:id` - Update a skill (authenticated)
- `DELETE /api/skills/:id` - Delete a skill (authenticated)

### Experience

- `GET /api/experience` - Get all work experiences
- `POST /api/experience` - Create a new experience (authenticated)
- `PUT /api/experience/:id` - Update an experience (authenticated)
- `DELETE /api/experience/:id` - Delete an experience (authenticated)

### Education

- `GET /api/education` - Get all education entries
- `POST /api/education` - Create a new education entry (authenticated)
- `PUT /api/education/:id` - Update an education entry (authenticated)
- `DELETE /api/education/:id` - Delete an education entry (authenticated)

### Contact

- `POST /api/contact` - Send a contact message
- `GET /api/contact` - Get all contact messages (authenticated)
- `PUT /api/contact/:id` - Mark message as read (authenticated)
- `DELETE /api/contact/:id` - Delete a message (authenticated)

### Uploads

- `POST /api/upload` - Upload a file (authenticated)
- `POST /api/upload/multiple` - Upload multiple files (authenticated)
- `DELETE /api/upload/:filename` - Delete a file (authenticated)

## Deployment

The application is ready for deployment to platforms like:

- Heroku
- Vercel
- Netlify
- DigitalOcean
- AWS

## License

This project is licensed under the MIT License.
#   P o r t f o l i o  
 #   P o r t f o l i o  
 