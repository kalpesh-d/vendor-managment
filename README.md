# Vendor Management System

A modern, full-stack vendor management application built with Next.js 15, MongoDB, and NextAuth.js for authentication.

## Architecture Overview

### Tech Stack
- **Frontend**: Next.js 15 (React 19)
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Hooks and Custom Hooks
- **Development**: ESLint support

### Directory Structure

```
vendor-management/
├── app/                    # Next.js App Router directory
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   └── vendors/      # Vendor CRUD endpoints
│   └── vendors/          # Vendor pages
├── components/            # Reusable React components
│   ├── VendorList.jsx    # Vendor listing component
│   ├── VendorForm.jsx    # Vendor creation/editing form
│   ├── SignIn.jsx        # Authentication components
│   └── theme-provider.jsx # Theme context provider
├── hooks/                 # Custom React hooks
│   └── useVendors.js     # Vendor data management hook
├── lib/                   # Utility functions and configurations
│   └── mongodb.js        # MongoDB connection setup
├── models/               # Mongoose models
│   ├── User.js          # User schema and model
│   └── Vendor.js        # Vendor schema and model
└── public/              # Static assets
```

### Core Components

1. **Authentication (NextAuth.js)**
   - Google OAuth integration
   - Session management
   - Protected routes and API endpoints

2. **Database Layer**
   - MongoDB Atlas cloud database
   - Mongoose schemas for data modeling
   - Connection pooling and error handling

3. **API Architecture**
   - RESTful API endpoints using Next.js API routes
   - CRUD operations for vendors
   - Protected routes with session validation

4. **Frontend Architecture**
   - Component-based architecture using React
   - Server and Client Components separation
   - Responsive design with Tailwind CSS

### Key Features

1. **Vendor Management**
   - Create, Read, Update, Delete (CRUD) operations
   - Pagination
   - Data validation

2. **User Interface**
   - Responsive design
   - Loading states and error handling
   - Modern UI components from shadcn/ui

3. **Authentication & Authorization**
   - Google OAuth sign-in
   - Protected routes
   - Role-based access control
   - Secure session management

4. **Data Management**
   - Custom hooks for data fetching
   - Optimistic updates
   - Error boundary implementation
   - Form validation

## Environment Setup

### Required Environment Variables

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Development Setup

1. Clone the repository
```bash
git clone https://github.com/kalpesh-d/vendor-managment.git
cd vendor-management
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

4. Run development server
```bash
npm run dev
```

## Deployment

The application is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel
4. Deploy