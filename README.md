# DevMate-Backend

## Overview

This is the backend portion to DevMate. Only authorized users are permitted to clone and access this codebase. If you are a frontend developer, please refer to our routes and endpoints section.

As DevMate follows a Model, Views, Controller layout (MVC), the backend serves the Models and Controller portion. We allow the frontend to rely entirely on the views portion.

The backend is built using Express.js and uses Firebase as the platform to handle all backend functionality. This includes Authentication, Database, server functions, etc.

Frontend devs are provided RESTful API for interactivity with the database and receiving information need to display to users. Again, please refer to the routes and endpoints section for information on how to use our APIs.

## Getting Started

`For authorized devs only`

To get started, follow these steps:

1. Clone this repository:

```
git clone https://github.com/devMate-Organization/devMate-Backend.git
```

2. Install the dependencies: `npm install`
3. Start the development server: `npm start`

## Backend

### Firebase Integration

The backend integrates with Firebase for database and authentication services. Firebase configuration is stored in the `firebase.config.js` file.

### Routes & Endpoints

The backend provides the following endpoints:

<!-- TODO: Ruben to add endpoints -->

### Database & Models

We are using a NoSql Database structure via Firebase's `Firestore`.

#### Models

All models are stored in the `models` directory

#### Querying

<!-- TODO: Ruben to add querying setup-->

### Contollers

The controllers directory houses all of the functions for when a developer reaches a certain endpoint.

## Contributing

If you would like to contribute to the Backend, please follow the guidelines in the contributing.md file.

## Contact

For any questions or concerns, please contact [isaiah.vickers@outlook.com](mailto:isaiah.vickers@outlook.com) for immediate attention or send a message in our `devMate General Channel` on Discord.
