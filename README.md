# Syncra Backend Repo

### Jump to

#### This Page

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Firebase Integration](#firebase-integration)
- [Changes](#changes)
- [Contact](#contact)

#### Documentation

- [Code of Conduct](./documentation/CODE_OF_CONDUCT.md)
- [Contributing](./documentation/CONTRIBUTING.md)
- [License](./documentation/LICENSE.md)

## Overview

Welcome to the backend to Syncra. Only authorized users are permitted to clone and access this codebase. If you are a frontend developer, please check out how to run our Docker image. If you already have our latest Docker image running on your machine, please navigate to http://localhost:8080/ to checkout how to use our backend.

As Syncra follows a Model, Views, Controller layout (MVC), the backend serves the `Models` and `Controllers` portion. We allow the frontend to rely entirely on the views portion. Most of the processes that involve processing user information (i.e. form submissions, edit profiles, records of project matches, etc.) will require the frontend team to send API requests to one of our many endpoints.

The backend is built using Express.js and uses Firebase as the platform to handle all backend functionality. This includes Authentication, server functions, cloud messaging, etc. Lastly, we use the serverless PostgreSQL database platform to securely store and manage user data.

Frontend devs are provided RESTful API endpoints for interactivity with the database and receiving information need to display to users.

## Getting Started

`Authorized developers only`

To get started, follow these steps:

1.  Clone this repository then open it in your code editor:

    `via HTTPS:`

    ```bash
    git clone https://github.com/Syncra-Organization/Syncra-Backend.git
    ```

    `via SSH:`

    ```bash
    git clone git@github.com:InSyncra/Syncra-Backend.git
    ```

2.  Install the dependencies: `npm install`
3.  Run the following command afterward: `npx prisma generate` to make sure the database on your system is current.
4.  Make sure you are not working in the main branch by creating or checking out to the branch you've created

    `Creating a new branch`

        In your terminal type:

    ```bash
    git checkout -b <Your new branch name>
    ```

    `Existing branch`

    In your terminal type:

    ```bash
    git checkout <Your existing branch name>
    ```

    Always be sure you are not working in the main branch!

5.  Start the development server: `npm run dev`

From there, you can now make the necessary changes.

## Backend

### Firebase Integration

The backend integrates with Firebase for database and authentication services. Firebase configuration is stored in the `firebase.config.js` file.

### Prisma Integration

The current database is Neon, a serverless PostgreSQL database. However, we will execute functions via Prisma. Prisma is an ORM that serves as the middle step between creating and managing data while allowing security and abstraction.

# Changes

`v1.0.0`: Initial backend setup
`v1.0.1`: Test backend setup/Multi-container ports created

## Contact

For any questions or concerns, please contact [isaiah.vickers@outlook.com](mailto:isaiah.vickers@outlook.com) for immediate attention or send a message in our `Syncra General Channel` on Discord.
