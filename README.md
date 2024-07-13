# Blog Vibe Platform

## Overview

Blog Vibe is a platform where users can publish blog posts based on categories, view posts by other users, and perform CRUD (Create, Read, Update, Delete) operations on their posts. This platform is built using MySQL, React, Node.js, and Express.

## Features

- User Authentication and Authorization
- Create, Read, Update, and Delete (CRUD) operations for blog posts
- Categorize blog posts
- View posts by other users
- Search posts by category

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MySQL

## Getting Started

### Prerequisites

- Node.js and npm installed
- MySQL installed and running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blog-vibe.git
   cd blog-vibe
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Database Setup

1. Create a MySQL database:
   ```sql
   CREATE DATABASE blog_vibe;
   ```

2. Update the database configuration in `backend/config/db.js`:
   ```javascript
   const mysql = require('mysql');
   const connection = mysql.createConnection({
       host: 'localhost',
       user: 'your-username',
       password: 'your-password',
       database: 'blog_vibe'
   });

   module.exports = connection;
   ```

3. Run migrations to set up tables (if any migration script is available):
   ```bash
   # Assuming you have a migration setup
   npm run migrate
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```


Happy blogging with Blog Vibe!
```
