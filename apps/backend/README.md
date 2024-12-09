# Backend Setup and Development Guide

## Setup your Backend Environment

### Step 0. Familiarize Yourself with the codebase
This project is structed as a monorepo layout. This means the backend is intending to use multiple projects pertaining to the backend in a single project under the `apps` directory. All apps are considered _`workspaces`_ that will sometimes share dependencies and configurations.

#### The `backend` directory:
- The backend directory serves as the main part of the code that will handle the API routes and server functions.
- This code is based on `ESM` and not the standard `CommonJs`. The goal was to provide a familiar _"frontend/React"_ setup.

#### Keep a `notes.md` handy
- as you're writing code, ideas may hit you faster than you can write out the steps.
- I would create a `notes.md` in your working directory. it has been added to the .gitignore so that it will not be uploaded with your changes.

### Step 1. Clone and Install
Make sure you have followed the instructions from the **[Project's Readme](../../README.md)**

### Step 2. Create `.env` File
Create a `.env` file in the apps/backend root directory using the `.env.example` file as your template.

### Step 3. Start the Database & Database Manager
Run the following command to start the database and database manager:

```bash
docker compose -p syncra-backend up -d
```
***You will now have a PostgreSQL and PGAdmin instance running in the backgorund. We will configure these in a moment*.**

### Step 4. Generate Prisma Client
Cd into the `apps/backend` directory from your terminal and run the following command:

```bash
bunx prisma generate
```

### Step 5. Sync Migrations and Database
Run the following command to sync the database:
```bash
bunx prisma db push
```

### Step 6. Start Backend
Finally, run the following command to start the backend and begin developing:

```bash
bun start
```

### Step 7. Closing Down Your Containers When Finished
If you are done developing and don't want the containers to run in the background simply run:

```bash
docker compose down # completely removes container instances
```

Your data and configuration will be persisted on your next run. If you do however run into any issues and need to start over for any reason so you can reset entirely by running: 

```bash
docker compose -v --remove-orphans # removes all data, config, etc.
```

---

## Configure DB and DB Manager
You should have your database _Postgres_ and the database manager _PGAdmin_ running in the background by now (if not, cd to the project root in your terminal and refer to [step 3](#step-3-start-the-database--database-manager))

You only need to configure the PGAdmin Settings Once. This is because a volume has been setup to remember your configuration. When 
 
**Check .env file**

Make sure your .env file has the following environment variable
```plain
DATABASE_URL=postgresql://postgres:postgres@localhost:5455/syncra_db?schema=syncra_schema
```

_Note that the port is set to 5455 to prevent conflicts with any other Postgres instances running on your local machine. Also, Prisma needs to use your localhost port while developing. In a future update, we will containerize the backend._

**Check out the ./compose.yaml file**

The compose.yaml file has the information needed to follow these next steps

### Logging into PGAdmin: **First Time**
To access PGAdmin, navigate to http://localhost:5050 in your web browser. Use the following credentials to log in:

- Email: `user@syncra.com` (*this is a dummy email*)
- Password: `password`

Once logged in, you can add a new server by clicking _"Add New Server"_ and enter the following details:

#### General Tab
- Name: `syncra`

#### Connection Tab
- Host name/address: `postgres`
- Port: `5432` _(note that this refers to the open port in the container, not your local machine)_
- Username: `postgres`
- Password: `postgres`

You should now be able to access your Postgres database using PGAdmin. We will have a walkthrough to show how to use PGAdmin.

---

## Prisma Studio for DB Management
If you prefer a simpler way to handle CRUD in your app, you can use Prisma Studio, provided by Prisma. It's an easy and intuitive way to manage your development database. All of your data in the database will be synced in realtime.

### Running Prisma Studio
In your terminal, make sure you are in the `apps/backend` directory

```bash
cd apps/backend # if in project root
```

### Then run the studio script
```bash
bun studio
```

This opens on Prisma studio on `localhost:5556` automatically. If not, simply navigate to it in your browser.

---

## Writing Routes
### API Code Location
All API code should be handled in the src directory.

### Using Prisma Client
Routes that require the Prisma client can use the Prisma instance located in `apps/backend/config/prisma.js`. Prisma is type-safe, and all models are accessed using the prisma.model.model-function syntax (e.g., prisma.project.findMany()).

### Route File Structure
Write route files based on the requested resource (e.g., a Project model should have routes located in src/routes/projects.js). To integrate your routes, import them in `src/routes/index.js.`

---

## Tests
### Writing Tests
It is encouraged to write tests for your routes to ensure they work under certain circumstances. bun:test and supertest have been provided for you.

### Example Test Route
Here is an example of a test route:
```js
// src/routes/__tests__/projects.test.js
import { describe, it, expect } from "bun:test"
import request from 'supertest';
import app from '../app';

describe('GET /projects', () => {
  it('should return a list of projects', async () => {
    const response = await request(app).get('/projects');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
```
---

## Pushing Code and Making Pull Requests
Please refer to the [Git Guidelines](./documentation/git-guidelines.md) for more instructions on pushing code and making pull requests.

#### Format and Lint Your Code
The repo is designed to check for any formatting and linting issues that are inconsistent with the current codebase. To prevent having to redo your hard work and make extra commits after submitting your code, there are scripts written for you to fix these errors.

In most cases, running the scripts `bun format` and `bun lint` allows the code to automatically fix anything it finds. There may be some cases where you will have to manually fix your errors.

Common Linting Issues:
- The code will check for small issues such as unused variables, console logs, and preferring const over let. 

Preventing Formatting Issues:
- This code uses Prettier as a development dependency, a highly opinionated formatter, with extra configuration. 

- It is best to run linting and formatting before making any commits, so that you don't have to write a new commit for the changes.

- You may also benefit from downloading the ESlint and Prettier extension to update and have issues displayed in realtime.

If pushed without any fixes, your code will fail and you will have to correct the errors, make a new commit, and make another push. The repo is setup to **not** allow code to be merged that doesn't pass.

## Issues
#### Assigning Issues
If you are assigned an issue, create a branch based on the issue instead of creating your own branch. To do this:

1. Go to the issue page on GitHub.
2. Click on the "Create a branch" button.
3. Name your branch using the issue number and a brief description (e.g., `issue-123-fix-project-routing`).
4. Make your changes and commit them to the new branch.
5. Open a pull request from the new branch to the main branch.

If you encounter any issues with your tests passing that you know aren't your error, _**submit an issue**_ and the request/fix will be pushed or expressed in the next update.