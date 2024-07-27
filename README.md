# Syncra Backend Repo

### Jump to

#### This Page

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Firebase Integration](#firebase-integration)
- [Changes](#changes)
- [Contact](#contact)

#### Documentation

- [Database Models Reference](./documentation/DATABASE.md)
- [Code of Conduct](./documentation/CODE_OF_CONDUCT.md)
- [Contributing](./documentation/CONTRIBUTING.md)
- [License](./documentation/LICENSE.md)

## Overview

Welcome is the backend to Syncra. Only authorized users are permitted to clone and access this codebase. If you are a frontend developer, please refer to our routes and endpoints section.

As Syncra follows a Model, Views, Controller layout (MVC), the backend serves the Models and Controller portion. We allow the frontend to rely entirely on the views portion.

The backend is built using Express.js and uses Firebase as the platform to handle all backend functionality. This includes Authentication, Database, server functions, etc.

Frontend devs are provided RESTful API endpoints for interactivity with the database and receiving information need to display to users. Again, please refer to the routes and endpoints section for information on how to use our APIs.

## Getting Started

`For authorized devs only`

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
3.  Make sure you are not working in the main branch by creating or checking out to the branch you've created

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

4.  Start the development server: `npm run dev`

From there, you can now make the necessary changes.

## Backend

### Firebase Integration

The backend integrates with Firebase for database and authentication services. Firebase configuration is stored in the `firebase.config.js` file.

### Routes & Endpoints

The backend provides the following endpoints:

<!-- TODO: Ruben and Tyler to add endpoints -->

### Database & Models

We are using Postgres via Neon to serve as our production database.

#### Models

View all models and info in the [`models` readme](./documentation/DATABASE.md).

# Changes

`v1.0.0`: Initial backend setup

## Contributing

If you would like to contribute to the Backend, please follow the guidelines in the contributing.md file.

## Contact

For any questions or concerns, please contact [isaiah.vickers@outlook.com](mailto:isaiah.vickers@outlook.com) for immediate attention or send a message in our `Syncra General Channel` on Discord.
