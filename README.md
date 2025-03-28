# Order API Service

## Project Description

REST API service for order management, developed with Node.js. The project uses Express.js for creating API endpoints and Docker for containerization.

## Technologies

- Node.js
- Express.js
- Docker
- Docker Compose
- Winston (for logging)

## Project Structure

order_api/
├── src/ # Source code
├── migrations/ # Database migrations
├── app.js # Main application file
├── docker-compose.yml
└── package.json

## Installation and Launch

### Prerequisites

- Node.js (version 14+)
- Docker
- Docker Compose

### Project Launch

1. Clone the repository:

git clone https://github.com/AndreyForProg/order_api.git

2. Install dependencies:

npm install

3. Start docker container with postgres:

docker-compose up -d

4. Run migrations:

npm run migrate

5. Seed the database:

npm run seed

6. Start the application:

npm run dev
