# Finance Tracker API

## Overview

This API allows users to manage their personal finances by adding income and expenses, retrieving transactions, and getting financial summaries.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Set up MongoDB locally or through MongoDB Atlas.
4. Create a `.env` file and add the following:
5. Run the project: `node server.js`

## API Endpoints

### Authentication

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login a user.

### Transactions

- **POST** `/api/transactions`: Add a transaction.
- **GET** `/api/transactions`: Get all transactions (with pagination).
- **GET** `/api/transactions/:id`: Get a transaction by ID.
- **PUT** `/api/transactions/:id`: Update a transaction by ID.
- **DELETE** `/api/transactions/:id`: Delete a transaction by ID.
- **GET** `/api/transactions/summary`: Get financial summary.
