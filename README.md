# Blog Backend System

This is a **Blog Backend** application built using **Node.js**. It provides APIs for managing blog posts, user authentication, and other backend operations for a blogging platform.

## Features
- User authentication and authorization.
- Database integration for storing users and blog posts.
- Backend powered by **Express.js** framework.
- JSON Web Token (JWT) for secure user authentication.


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/parasgarg2k/blog-backend.git
   ```

2. Navigate into the project directory:
   ```bash
   cd Blog_backend
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and configure the following environment variables:
   ```
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   ```

5. Start the application:
   ```bash
   npm start
   ```

6. The backend will now be running on `http://localhost:5000`.

## Usage

1. Use any API testing tool like **Postman** to interact with the backend.
2. Endpoints include CRUD operations for blog posts, user login/signup, and more.
3. Integrate this backend with a frontend of your choice to build a full blog platform.

## Technologies Used

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (JSON Web Token)
- **Environment Management**: dotenv





