# Tech Quiz Application

A full-stack MERN (MongoDB, Express.js, React, Node.js) application that allows users to take a tech quiz and test their knowledge. The application includes both component and end-to-end testing using Cypress.

## Features

- Interactive quiz interface
- Random question selection
- Score tracking
- Loading states
- Responsive design
- Comprehensive test coverage

## Tech Stack

- **Frontend**: React with TypeScript
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Testing**: Cypress for both component and end-to-end testing
- **Styling**: Bootstrap
- **Build Tool**: Vite

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd QuizTest
```

2. Install dependencies:
```bash
cd DevelopX
npm install
```

This will install dependencies for both client and server.

3. Set up environment variables:
- Copy `.env.example` to `.env` in the server directory
- Update the MongoDB connection string and other environment variables as needed

## Running the Application

### Development Mode

To run both client and server in development mode:

```bash
cd DevelopX
npm run start:dev
```

This will:
- Start the server on port 3001
- Start the client on port 5173
- Enable hot reloading for both client and server

### Production Build

To create a production build:

```bash
cd DevelopX
npm run build
```

## Testing

The application includes both component and end-to-end tests using Cypress.

### Running Tests

To run all tests:

```bash
cd DevelopX/client
npm run test
```

To open Cypress test runner:

```bash
cd DevelopX/client
npm run test:open
```

### Test Structure

- **Component Tests**: Located in `DevelopX/client/cypress/component/`
  - Tests individual React components in isolation
  - Mocks API calls and component dependencies

- **End-to-End Tests**: Located in `DevelopX/client/cypress/e2e/`
  - Tests complete user flows
  - Includes tests for:
    - Full quiz flow
    - Incorrect answer handling
    - Loading states

## Project Structure

```
QuizTest/
├── DevelopX/              # Main application directory
│   ├── client/           # React frontend
│   │   ├── src/
│   │   │   ├── components/  # React components
│   │   │   ├── models/     # TypeScript interfaces
│   │   │   └── services/   # API services
│   │   └── cypress/      # Cypress tests
│   │       ├── component/  # Component tests
│   │       └── e2e/       # End-to-end tests
│   ├── server/           # Express.js backend
│   │   ├── src/
│   │   │   ├── controllers/  # Route controllers
│   │   │   ├── models/       # MongoDB models
│   │   │   └── routes/       # API routes
│   │   └── seeds/           # Database seed data
│   └── package.json       # Root package.json
└── README.md             # Project documentation
```

## API Endpoints

- `GET /api/questions/random`: Get 10 random questions for the quiz

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- Bootstrap for the UI components
- Cypress for the testing framework
- MongoDB for the database
