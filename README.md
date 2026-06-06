# AI Assistant Backend

This project is a Node.js Express backend for an AI Assistant application, developed by Komal Shah. It provides a RESTful API for user authentication, management, and integrates with the Google Gemini API to offer a voice-enabled virtual assistant with various capabilities.

## Features

*   **User Authentication & Authorization**: Secure user registration, login, and session management using JWTs and `bcryptjs`.
*   **User Management**: API endpoints for managing user data.
*   **Database Integration**: Utilizes MongoDB via Mongoose for data persistence.
*   **File Uploads**: Supports file uploads, likely for profile pictures or other media, using `multer` and `cloudinary`.
*   **CORS Configuration**: Configured to allow requests from a frontend application running on `http://localhost:5173`.
*   **Google Gemini AI Integration**:
    *   **Virtual Assistant**: Processes natural language input to determine user intent.
    *   **Diverse Commands**: Supports a range of commands including:
        *   General factual questions and casual chat
        *   Google Search
        *   YouTube Search and Video Playback
        *   Current Time, Date, Day, and Month retrieval
        *   Opening applications like Calculator, Instagram, and Facebook
        *   Displaying current Weather

## Technologies Used

*   **Node.js**: JavaScript runtime environment.
*   **Express.js**: Web application framework for Node.js.
*   **MongoDB**: NoSQL database.
*   **Mongoose**: MongoDB object data modeling (ODM) for Node.js.
*   **JWT (JSON Web Tokens)**: For secure authentication.
*   **Bcrypt.js**: For password hashing.
*   **Cloudinary**: Cloud-based image and video management.
*   **Multer**: Middleware for handling `multipart/form-data`, primarily used for uploading files.
*   **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
*   **Dotenv**: For loading environment variables from a `.env` file.
*   **Nodemon**: Development tool for automatic server restarts.
*   **Axios**: Promise-based HTTP client for the browser and Node.js (used for Gemini API calls).
*   **Google Gemini API**: For AI-powered virtual assistant functionalities.

## Setup and Installation

To set up and run this project locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd AI-Assistant/Backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the `Backend` directory with the following variables:
    ```
    PORT=5000
    MONGO_URI=<Your_MongoDB_Connection_String>
    JWT_SECRET=<Your_JWT_Secret_Key>
    CLOUDINARY_CLOUD_NAME=<Your_Cloudinary_Cloud_Name>
    CLOUDINARY_API_KEY=<Your_Cloudinary_API_Key>
    CLOUDINARY_API_SECRET=<Your_Cloudinary_API_Secret>
    GEMINI_API_URL=<Your_Gemini_API_URL>
    ```
    *   Replace `<Your_MongoDB_Connection_String>` with your MongoDB connection string (e.g., `mongodb://localhost:27017/ai-assistant`).
    *   Generate a strong random string for `<Your_JWT_Secret_Key>`.
    *   Obtain Cloudinary credentials from your Cloudinary account.
    *   Obtain the Gemini API URL from your Google Cloud project or Gemini API documentation.

4.  **Database Setup**:
    Ensure you have a MongoDB instance running, either locally or a cloud-hosted one (e.g., MongoDB Atlas).

## Running the Application

To start the development server:

```bash
npm run dev
```

The server will start on the port specified in your `.env` file (defaulting to 5000) and will automatically restart on file changes.

The API endpoints will be accessible at `http://localhost:<PORT>/api/auth` and `http://localhost:<PORT>/api/user`. The Gemini AI integration will be available through specific routes that utilize the `geminiResponse` function.
