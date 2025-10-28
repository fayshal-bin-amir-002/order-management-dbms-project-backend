**Project Description**

The Order Management System (OMS) is a robust, full-stack backend application designed to

manage the complete lifecycle of e-commerce operations. Built with modern technologies, it

facilitates seamless customer registration, product catalog management, order placement,

delivery tracking, and administrative analytics. This system ensures efficient handling of product

inventory, order statuses, customer data, and business insights while enforcing rules such as

stock validation, duplicate prevention, and role-based access control. It supports secure

operations for admins, customers, and delivery agents, making it scalable for online businesses.

**Key Features**

• Customer Registration & Order Placement: Customers can register, browse products, and

place orders with real-time stock checks.

• View Order History and Status: Real-time display of placed orders, total amounts, and delivery

statuses.

• Admin Dashboard for Order & Product Management: Role-based admin panel to manage

products, orders, and customer queries.

• Add/Edit/Remove Products and Customers: Full CRUD operations for products and customer

profiles.

• Place Order with Validation: Secure order creation with stock availability and duplicate

prevention.

• Prevent Duplicate Orders: Built-in checks to avoid multiple orders for the same item in one

session.

• Cancel or Update Order: Customers and admins can cancel or modify orders with approval

workflows.

• Get Product-Wise Order List: Query and export lists of orders per product.

• Calculate Total Order Value: Automatic computation of order.

**Core Modules**

• Home Page: Overview of the store, including products.

• Dashboards: Role-based dashboards for:

→ Admin: Manage products, orders, customers, and delivery assignments.

→ Customers: View profile, order history, and track deliveries.

**Customer & Order Workflow**

• Customers register or log in via email and password.

• Browse products and add to cart.

• Place order with payment simulation and stock deduction.

• Receive order confirmation and tracking updates.

• Admins approve, process, and assign delivery.

**Admin Functionalities**

• Add & Edit Products, Categories, and Stock Levels.

• Approve or cancel customer orders.**Dependencies and Technologies Used**

**Backend Core Technologies**

• TypeScript: Strong typing for maintainable and scalable code.

• Express.js: Lightweight server and REST API framework.

• MongoDB: NoSQL database with Mongoose for flexible schema modeling.

• Cloudinary: Cloud-based media storage for product images.

• Zod: Runtime schema validation for request payloads.

**Developer Utilities**

• Environment Variables: Via dotenv for configuration management.

• Linting and Formatting: ESLint and Prettier for code quality.

• Development Server: ts-node-dev for hot reloading during development.

**Authentication & Security**

• jsonwebtoken (JWT): Token-based authentication with access/refresh tokens.

• cors: Secure cross-origin resource sharing.

• bcrypt: Secure password hashing with salt rounds.

• http-status: Standardized HTTP response codes.

**Frontend Core Technologies**

• Next.js (v15.4.1): React framework with App Router and server components.

• React (v19.1.0): Component-based UI library.

• TypeScript: Type-safe frontend development.

**State Management & Forms**

• React Hook Form (v7.60.0): Performant form handling with validation.

• Zod (v4.0.5): Schema validation integrated with forms.

• @hookform/resolvers (v5.1.1): Zod resolver for React Hook Form.

**UI Components & Styling**

• Tailwind CSS (v4): Utility-first CSS for rapid, responsive design.

• shadcn/ui: Accessible, customizable UI components.

• Lucide React (v0.525.0): Modern icon set.

• Sonner (v2.0.6): Beautiful toast notifications.

**Prerequisites**

• Node.js (v16 or higher)

• npm or yarn

• MongoDB (Local or Atlas)

**Installation**

• Clone the Backend Repository:

git clone https://github.com/your-username/order-management-backend.git

cd order-management-backend

• Install Dependencies:npm install

• Set Up Environment Variables: Create a .env file in the root directory:

\# Environment

NODE

\_

ENV=development

PORT=5000

\# Database

DATABASE

\_

URL=your-mongodb-uri

\# Security

BCRYPT

SALT

ROUND=12

\_

\_

\# JWT Secrets

JWT

ACCESS

\_

\_

SECRET=your-access-token-secret

JWT

REFRESH

\_

\_

SECRET=your-refresh-token-secret

JWT

ACCESS

EXPIRES

IN=1d

\_

\_

\_

JWT

REFRESH

EXPIRES

IN=7d

\_

\_

\_

\# Cloudinary

CLOUDINARY

CLOUD

\_

\_

NAME=your-cloud-name

CLOUDINARY

API

\_

\_

KEY=your-api-key

CLOUDINARY

API

\_

\_

SECRET=your-api-secret

\# Nodemailer

FROM

\_

EMAIL=your-sender@gmail.com

FROM

\_

PASS=your-app-password

\# Frontend URL

CLIENT

\_

URL=http://localhost:3000

• Clone Frontend Repository:

git clone https://github.com/your-username/order-management-frontend.git

cd order-management-frontend

• Install Dependencies:

npm install

• Environment Variables: Create .env.local:

NEXT

PUBLIC

BASE

\_

\_

\_

API=http://localhost:5000/api/v1

NEXT

PUBLIC

CLOUDINARY

CLOUD

\_

\_

\_

\_

NAME=your-cloud-name

Backend Scripts

Run these via npm run in the backend directory:</p><p class="slate-paragraph">Script Description</p><p class="slate-paragraph">start:dev Start development server with hot reload</p><p class="slate-paragraph">build Compile TypeScript to JavaScript</p><p class="slate-paragraph">start Start production server</p><p class="slate-paragraph">lint Check code linting issues</p><p class="slate-paragraph">lint:fix Auto-fix linting issues</p><p class="slate-paragraph">format Format code with Prettier</p><p class="slate-paragraph">format:fix Auto-fix formatting issuesExample: Start dev server → npm run start:dev (runs on http://localhost:5000).</p><p class="slate-paragraph">Frontend Scripts</p><p class="slate-paragraph">Run these via npm run <script> in the frontend directory:</p><p class="slate-paragraph">Script Description</p><p class="slate-paragraph">dev Start development server</p><p class="slate-paragraph">build Build for production</p><p class="slate-paragraph">start Start production server</p><p class="slate-paragraph">lint Run ESLint</p><p class="slate-paragraph">Example: Start dev server → npm run dev (runs on http://localhost:3000).</p><p class="slate-paragraph"><strong class="slate-bold">API Endpoints Overview</strong></p><p class="slate-paragraph">All endpoints are prefixed with /api/v1. Authentication is required for protected routes (via JWT</p><p class="slate-paragraph">in Authorization header).</p><p class="slate-paragraph"><strong class="slate-bold">Auth (/auth)</strong></p><p class="slate-paragraph">Method Path Description Auth Required</p><p class="slate-paragraph">POST /login Customer/Admin login No</p><p class="slate-paragraph"><strong class="slate-bold">Customers (/customer)</strong></p><p class="slate-paragraph">Method Path Description Auth Required</p><p class="slate-paragraph">POST /register Register customer No</p><p class="slate-paragraph">GET / Get all customers Yes (ADMIN)</p><p class="slate-paragraph"><strong class="slate-bold">Products (/product)</strong></p><p class="slate-paragraph">Method Path Description Auth Required</p><p class="slate-paragraph">POST / Create product Yes (ADMIN)</p><p class="slate-paragraph">GET / Get all products No</p><p class="slate-paragraph">GET /:id Get product by ID No</p><p class="slate-paragraph">PATCH /:id Update product Yes (ADMIN)</p><p class="slate-paragraph">DELETE /:id Delete product Yes (ADMIN)</p><p class="slate-paragraph">GET /customers/:id Get customers who ordered Yes (ADMIN)</p><p class="slate-paragraph"><strong class="slate-bold">Orders (/order)</strong></p><p class="slate-paragraph">Method Path Description Auth Required</p><p class="slate-paragraph">POST / Create new order Yes (CUSTOMER)</p><p class="slate-paragraph">GET / Get all orders Yes (ADMIN)</p><p class="slate-paragraph">GET /:id Get order by ID Yes (ADMIN/CUSTOMER)</p><p class="slate-paragraph">GET /customer/:customerId Get orders by customer Yes (ADMIN/CUSTOMER)</p><p class="slate-paragraph">PATCH /:id/status Update order status Yes (ADMIN)</p><p class="slate-paragraph">DELETE /:id Delete order Yes (ADMIN)<strong class="slate-bold">Delivery (/delivery)</strong></p><p class="slate-paragraph">Method Path Description Auth Required</p><p class="slate-paragraph">PATCH /:id Update delivery status Yes (ADMIN)</p><p class="slate-paragraph"><strong class="slate-bold">Dashboard (/dashboard)</strong></p><p class="slate-paragraph">Method Path Description Auth Required</p><p class="slate-paragraph">GET / Get admin analytics Yes (ADMIN)</p><p class="slate-paragraph"><strong class="slate-bold">CORE SERVICES & DETAILED IMPLEMENTATION</strong></p><p class="slate-paragraph">The backend follows a modular MVC pattern. Each module contains:</p><p class="slate-paragraph">• controller.ts – HTTP layer</p><p class="slate-paragraph">• service.ts – Business logic</p><p class="slate-paragraph">• model.ts – Mongoose schema</p><p class="slate-paragraph">• validation.ts – Zod validation</p><p class="slate-paragraph">• interface.ts – TypeScript types</p><p class="slate-paragraph">• route.ts – Express routes</p><p class="slate-paragraph"><strong class="slate-bold">1. AUTH SERVICE (modules/auth)</strong></p><p class="slate-paragraph">Purpose: Secure JWT-based authentication.</p><p class="slate-paragraph">• POST /login</p><p class="slate-paragraph">→ Validates email/password → bcrypt compare → generates access</p><p class="slate-paragraph"><strong class="slate-bold">2. CUSTOMER SERVICE (modules/customer)</strong></p><p class="slate-paragraph">• POST /register</p><p class="slate-paragraph">→ Zod validation → checks email uniqueness → hashes password → creates customer</p><p class="slate-paragraph">• GET /</p><p class="slate-paragraph">→ Admin-only → returns all customers with pagination</p><p class="slate-paragraph"><strong class="slate-bold">3. PRODUCT SERVICE (modules/product)</strong></p><p class="slate-paragraph">• POST / → Admin → uploads image to Cloudinary → creates product</p><p class="slate-paragraph">• GET / → Public → lists available products</p><p class="slate-paragraph">• GET /:id → Public → single product</p><p class="slate-paragraph">• PATCH /:id → Admin → partial update</p><p class="slate-paragraph">• DELETE /:id → Admin → removes product</p><p class="slate-paragraph">• GET /customers/:id → Admin → returns customers who ordered this product</p><p class="slate-paragraph"><strong class="slate-bold">4. ORDER SERVICE (modules/order)</strong></p><p class="slate-paragraph">• POST / → Customer → validates stock → deducts inventory → creates order</p><p class="slate-paragraph">• GET / → Admin → all orders</p><p class="slate-paragraph">• GET /:id → Owner/Admin → order details</p><p class="slate-paragraph">• GET /customer/:id → Owner/Admin → customer order history</p><p class="slate-paragraph">• PATCH /:id/status → Admin → updates status (restores stock if cancelled)• DELETE /:id → Admin → deletes order</p><p class="slate-paragraph"><strong class="slate-bold">5. DELIVERY SERVICE (modules/delivery)</strong></p><p class="slate-paragraph">• PATCH /:id → Admin → updates tracking status</p><p class="slate-paragraph">→ If "Delivered"</p><p class="slate-paragraph">, auto-updates order status</p><p class="slate-paragraph"><strong class="slate-bold">6. DASHBOARD SERVICE (modules/dashboard)</strong></p><p class="slate-paragraph">• GET / → Admin only</p><p class="slate-paragraph">→ Returns:</p><p class="slate-paragraph">• Total revenue</p><p class="slate-paragraph">• Orders by status</p><p class="slate-paragraph">• Top 5 products</p><p class="slate-paragraph"><strong class="slate-bold">Conclusion</strong></p><p class="slate-paragraph">The Order Management System (OMS) is a modern, secure, and scalable solution that</p><p class="slate-paragraph">simplifies e-commerce operations for businesses. It leverages cutting-edge technologies like</p><p class="slate-paragraph">TypeScript, Express, MongoDB, and Next.js to deliver a fast, reliable, and user-friendly platform.</p><p class="slate-paragraph">With role-based access, real-time updates, and comprehensive admin tools, it empowers</p><p class="slate-paragraph">businesses to manage orders efficiently from placement to delivery.</p><p class="slate-paragraph"></p></x-turndown>
