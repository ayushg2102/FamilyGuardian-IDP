# FGIDP

**Family Guardian Intelligent Document Processing (FGIDP)**  
A modern, production-ready application for secure, intelligent document management and processing for families and guardians.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

FGIDP is a secure, scalable, and user-friendly platform for managing, processing, and sharing sensitive family documents. It leverages modern web technologies to provide a seamless experience for guardians and family members, ensuring privacy and efficiency.

---

## Features

- 🔒 **Secure Authentication**: Role-based access and protected routes.
- 📄 **Document Upload & Management**: Upload, view, and organize documents.
- 🧠 **Intelligent Processing**: Automated document classification and status tracking.
- 📊 **Dashboard**: Overview of requests, statuses, and recent activity.
- 🔔 **Notifications**: Stay updated on document status and requests.
- 🌐 **Responsive UI**: Works across devices and screen sizes.
- 🛠️ **Mock Data Support**: For development and testing.

---

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **State Management**: React Context API
- **Testing**: (Add your testing framework, e.g., Jest, React Testing Library)
- **Build Tools**: Vite, PostCSS

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm (v8+ recommended) or yarn

### Installation

```bash
git clone https://github.com/your-org/FGIDP.git
cd FGIDP
npm install
```

### Running Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or as specified in your Vite config).

---

## Project Structure

```
FGIDP/
├── assets/
│   └── images/           # SVG logos and document images
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── AppLayout.tsx     # Main layout wrapper
│   │   ├── ProtectedRoute.tsx # Route protection logic
│   │   └── common/           # Shared utilities/components (e.g., statusUtils)
│   ├── contexts/         # React Contexts (e.g., AuthContext)
│   ├── mock/             # Mock data for development (mockData.ts)
│   ├── pages/            # Page components (Dashboard, Login, Requests, etc.)
│   ├── utils/            # (Currently empty, for future utility functions)
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   ├── index.css         # Global styles (Tailwind)
│   └── vite-env.d.ts     # Vite/TypeScript environment types
├── index.html            # HTML entry point
├── package.json          # Project metadata and scripts
├── package-lock.json     # Dependency lock file
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── eslint.config.js      # ESLint configuration
├── tsconfig.json         # TypeScript base config
├── tsconfig.app.json     # TypeScript app config
├── tsconfig.node.json    # TypeScript node config
├── vite.config.ts        # Vite build config
└── README.md             # Project documentation
```

- **assets/images/**: Contains SVG logos and document images used in the UI.
- **src/components/**: Houses all reusable UI components, including layout and route protection. The `common/` subfolder contains shared utilities like status helpers.
- **src/contexts/**: Contains React Contexts for global state management (e.g., authentication).
- **src/mock/**: Provides mock data for development and testing.
- **src/pages/**: Contains all main page components (Dashboard, Login, Requests, Profile, etc.).
- **src/utils/**: Reserved for utility/helper functions (currently empty).
- **src/App.tsx**: The root React component.
- **src/main.tsx**: The application entry point.
- **src/index.css**: Global styles, primarily Tailwind CSS imports.
- **src/vite-env.d.ts**: TypeScript environment declarations for Vite.
- **index.html**: The main HTML file loaded by Vite.
- **package.json**: Project metadata, dependencies, and scripts.
- **tailwind.config.js, postcss.config.js, eslint.config.js**: Tooling and configuration files.
- **tsconfig\*.json**: TypeScript configuration files for different environments.
- **vite.config.ts**: Vite build and dev server configuration.
- **README.md**: This documentation file.

---

## Usage

- **Login**: Access the app using your credentials.
- **Dashboard**: View document requests and statuses.
- **Create Request**: Submit new document processing requests.
- **Profile**: Manage your user profile and settings.

---

## Environment Variables

Create a `.env` file in the root directory and configure as needed:

```
VITE_API_URL=https://api.example.com
VITE_APP_ENV=development
```

---

## Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `npm run dev`     | Start development server  |
| `npm run build`   | Build for production      |
| `npm run preview` | Preview production build  |
| `npm run lint`    | Run linter                |
| `npm test`        | Run tests (if configured) |

---

## Testing

To run tests:

```bash
npm test
```

(Add details about your testing framework and coverage if applicable.)

---

## Deployment

1. Build the app:

   ```bash
   npm run build
   ```

2. Deploy the contents of the `dist/` directory to your production server or static hosting provider (e.g., Vercel, Netlify, AWS S3).

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request.

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions, issues, or feature requests, please open an issue or contact the maintainer at [your-email@example.com].

<!-- Deployment Instructions -->

# FG Invoice Processing Automation Frontend

A modern React + TypeScript + Ant Design application for invoice processing automation.

## Features

- React 18, Vite, TypeScript
- Ant Design UI
- Tailwind CSS
- Centralized error handling and notifications
- Prettier, ESLint, Husky, lint-staged
- Jest & React Testing Library
- CI/CD ready

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

### Linting & Formatting

```bash
npm run lint      # Lint code
npm run format    # Format code with Prettier
```

### Testing

```bash
npm run test
```

### Build for Production

```bash
npm run build
```

### Preview Production Build Locally

```bash
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and fill in required values.

## Deployment

- The app is ready for static hosting (Vercel, Netlify, GitHub Pages, etc.)
- See `.github/workflows/deploy.yml` for CI/CD example.

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit with linted & formatted code
4. Ensure all tests pass
5. Open a pull request

---

For more details, see code comments and the `/src` directory structure.
