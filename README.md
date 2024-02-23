# Node Assignment Submission System

This Node.js project is designed to facilitate the creation and submission of assignments using the Prisma ORM for database management.

## Features

- User authentication for secure access to the assignment submission system using JWT tokens.
- Assignment creation and management. (Basic CRUD operations)
- File upload functionality for submitting assignments. (Supports various file types)
- Integration with Prisma ORM for efficient database operations. (PostgreSQL)

## Prerequisites

Before running the project, make sure you have the following installed on your machine:

- Node.js   (v16 or later) (Recommended Version: 16.15.0)
- npm (Node Package Manager)
- PostgreSQL
- Prisma CLI

## Getting Started

Follow these steps to run the project locally:

1. Navigate to the project directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   - Create a `.env` file in the root directory and configure the database connection. Use the `.env.example` file as a template.

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/assignment_submission"
   ```

    - Run the following command to create the database schema:
    
    ```bash
    npx prisma db push
    ```

4. Set up the environment variables:

   - Create a `.env` file in the root directory and configure the environment variables. Use the `.env.example` file as a template.

   ```env
   ACCESS_TOKEN_SECRET="your_secret"
    ```

    ```env
    PORT=3000
    ```

    ```env
    EMAIL_USERNAME="your_email"
    ```

    ```env
    EMAIL_PASSWORD="your_password"
    ```

5. Run the application:

   ```bash
   npm start
   ```

   The application should now be running at [http://localhost:3000](http://localhost:3000).

## Usage

1. Open your web browser and go to [http://localhost:3000](http://localhost:3000).
2. Sign up for a new account or log in if you already have one.
3. Create a new assignment from the dashboard.
4. Students can submit their assignments using the provided file upload feature.
5. Instructors can review and manage submitted assignments.
6. Here is the API collection link: https://api.postman.com/collections/21252993-547f5e25-8769-4b8f-944a-86d21cbcf4d3?access_key=PMAT-01HQAVFDHPFBJ0796DCEHRMME7


## License

This project is licensed under the [MIT License](LICENSE).

---
