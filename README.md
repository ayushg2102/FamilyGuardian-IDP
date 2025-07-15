FGIDP — Family Guardian Intelligent Document Processing
A modern, enterprise-grade React application for managing and processing payment and document requests across departments with security, traceability, and user-focused experience.

📚 Table of Contents
Introduction

Key Features

Technology Stack

Getting Started

Project Structure

Environment Variables

Available Scripts

Usage Guide

Testing

Deployment

Contributing

License

Contact

🔰 Introduction
FGIDP is a secure and intelligent document and payment request management platform designed for internal use within Family Guardian Insurance. It streamlines the creation, review, and approval of financial and departmental requests, all wrapped in a clean and responsive user interface built with React and Ant Design.

✨ Key Features
🔐 Secure Login System with role-based access

🧾 Dynamic Request Forms based on selected payment types

📬 Notification Panel with real-time status updates

📊 Interactive Dashboard showing real-time analytics of requests

🧠 Smart UI Logic: Conditional rendering of forms and sections

🔎 Advanced Filters: Sort, search, and paginate through requests

📂 Draft Management: Save and resume in-progress requests

📱 Fully Responsive: Seamlessly works across desktop and mobile

⚙️ Technology Stack
Frontend Framework: React (w/ TypeScript)

UI Library: Ant Design

Routing: React Router DOM

State Management: React Context API

Build Tool: Vite

Styles: Tailwind CSS + Ant Design

Testing: React Testing Library / Jest (configurable)

🚀 Getting Started
Prerequisites
Node.js (v16 or higher)

npm or yarn

Installation
bash
Copy
Edit
git clone https://github.com/your-org/fgidp.git
cd fgidp
npm install
Running the App Locally
bash
Copy
Edit
npm run dev
Visit http://localhost:5173 to open the app.

📁 Project Structure
bash
Copy
Edit
fgidp/
├── public/                 # Static files and favicon
├── src/
│   ├── assets/             # Logos, icons, and images
│   ├── components/         # UI components (e.g. Layout, Header, Cards)
│   ├── contexts/           # Context providers (Auth, Notification)
│   ├── pages/              # All route-based page components
│   ├── routes/             # Route definitions and protected routing
│   ├── services/           # API call utilities and mock services
│   ├── utils/              # Helper functions and constants
│   ├── App.tsx             # Root application component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
🔑 Environment Variables
Create a .env file at the root:

env
Copy
Edit
VITE_API_URL=https://api.yourdomain.com
VITE_ENV=development
🛠 Available Scripts
Command	Purpose
npm run dev	Run app in development mode
npm run build	Create a production-ready build
npm run preview	Preview production build locally
npm run lint	Lint your code for best practices
npm test	Run all tests (if testing is configured)

📌 Usage Guide
Login with company-issued credentials

Dashboard shows key insights: Total, Pending, Returned, Drafts, Approved

Create New Request using the + Create Request button

Fields dynamically update based on payment type

View All Requests in a paginated, filterable table

Check Notifications for status changes and approvals

Logout via dropdown on the top-right profile section

✅ Testing
Testing can be integrated using React Testing Library or Jest.

bash
Copy
Edit
npm test
Unit and integration tests should be located in a __tests__/ folder alongside components.

📦 Deployment
Build your application:

bash
Copy
Edit
npm run build
Deploy the dist/ directory to:

Vercel

Netlify

AWS S3 + CloudFront

🤝 Contributing
We welcome contributions from everyone! To contribute:

bash
Copy
Edit
git checkout -b feature/your-feature-name
git commit -m "✨ Add your feature"
git push origin feature/your-feature-name
Then open a Pull Request.

Please follow our internal code style guide and naming conventions.

📄 License
This project is licensed under the MIT License.

📬 Contact
For support or inquiries, contact the project maintainer at:

📧 ayushg1@damcogroup.com
🌐 www.familyguardian.com

