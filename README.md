# Backend-Developer-Assessment-Chat-AI-Integration

Project Overview

This project implements a simple chat API integrated with OpenAI's API. The system includes basic chat functionality, JWT authentication, rate limiting, and MongoDB for data storage.

# Project Structure

/src: Contains the main source code.

/src/routes: API route handlers.

/src/controllers: Business logic.

/src/models: Mongoose models.

/src/middleware: Middleware functions (authentication, rate limiting).

/tests: Unit tests.

## Setup Instructions
1. Clone the repository:
```
$ git clone https://github.com/thiramet27/Backend-Developer-Assessment-Chat-AI-Integration.git
$ cd Backend-Developer-Assessment-Chat-AI-Integration
```
2. Install dependencies:
```
$ npm install
```
3. Set environment variables:

Create a .env file in the root directory with the following:
```
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret Key>
OPENAI_API_KEY=<Your OpenAI API Key>
```
# API Documentation
API documentation is available via Swagger UI at /api-docs.
Deployed Swagger: https://backend-developer-assessment-chat-ai.onrender.com/api-docs/

Contact Information:Thiramet
Email: thirametphuthong@gmail.com
