# Order Management System - Backend

This is the **backend server** for the **Order Management System (OMS)**, built with **Node.js**, **Express**, and **TypeScript**.  
It provides RESTful APIs for **authentication**, **customer management**, **product management**, **orders**, **deliveries**, and **admin dashboards**.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

The **Order Management System (OMS)** allows businesses to manage:

- Customers
- Products
- Orders
- Deliveries
- Admin dashboard metrics

The backend exposes REST APIs that can be consumed by a frontend application or mobile app.

---

## Technologies

- **Node.js** – Runtime environment
- **Express** – Web framework
- **TypeScript** – Typed JavaScript
- **MongoDB / Mongoose** – Database and ODM
- **Zod** – Input validation
- **JWT** – Authentication
- **Middleware** – For error handling, request validation, and authorization

---

## Project Structure

src
┣ app
┃ ┣ builder # Query builder utilities
┃ ┣ config # App configuration
┃ ┣ errors # Custom error handlers
┃ ┣ interface # TypeScript interfaces
┃ ┣ middleware # Auth, validation, and error middleware
┃ ┣ modules # Feature-based modules (auth, customer, product, order, delivery, dashboard)
┃ ┣ routes # Central route registration
┃ ┗ utils # Helper utilities (sendResponse, token utils, catchAsync)
┣ app.ts # Express app setup
┗ server.ts # Server entry point

---

## Features

- **Authentication**: Login and JWT-based session management
- **Customer Management**: Register customers, get all customers (Admin only)
- **Product Management**: CRUD products, get customers who ordered a product
- **Order Management**: Create, view, update, and delete orders
- **Delivery Management**: Update delivery status
- **Admin Dashboard**: View summarized metrics
- **Validation**: Request validation using Zod
- **Authorization**: Role-based access (ADMIN, USER)
- **Error Handling**: Centralized error management for validation, duplicates, and cast errors

---

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd order-management-backend
npm i
```

```bash
PORT=3000
DATABASE_URL=<your_mongodb_url>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=1d
```

```bash
npm run start:dev
npm run build
npm run start
```
