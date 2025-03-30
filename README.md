
# Welcome to the Syncra Backend!
This repo is for authorized developers to access the and develop the Syncra API.

## Current Technology
- Express: Backend Framework
- PostgreSQL: Database
- Prisma: Type-safe ORM for manipulating data
- Docker: Containerization for consistent development | mock production environment
- Commitizen: Git hook to automatically update changelog
- Commitlint: Git hook to enforce consistent commit messages
- Lefthook: Git hook to enforce consistent code style
- Biomejs: Git hook to enforce consistent code style
- Make: Utility for automating tasks
- Vercel: Deployment platform


## Setup 

### Prerequisites
* Pnpm (package manager) version 9.15 or higher
* Node version 18 or higher
* npm version 8 or higher
* Docker version 22 or higher
* Git version 2.34.1 or higher


### Install & Run the Syncra Backend
1. Clone the backend repository using either of the following command:
    ```bash
    # via HTTPS:
    git clone https://github.com/InSyncra/Syncra-Backend.git <optional custom folder name>
    ```
    ```bash
    # via SSH:
    git clone git@github.com:InSyncra/Syncra-Backend.git <optional custom folder
    ```

2. Open the cloned repository and install everything from the root repository. This will install all the necessary dependencies and hooks required for the backend.
    ```bash
    make install
    ```

3. Create a `.env` file in the root directory and setup the necessary environment variables. A `.env.example` file has been provided for you to know what to fill in.

4. Run the backend using the following command:
    ```bash
    make run
    ```

## Running the database
There are 3 ways to interact with the data in your database:

1. **Prisma Studio** (Recommended): When you run `pnpm start` in the root directory, your browser will pop up with Prisma Studio, as it is set to run with this command. You can view and manipulate your database and data in realtime here or anytime by navigating to [http://localhost:5555](http://localhost:5555).

2. **PGAdmin**: Also run on `pnpm start`, the development docker compose file runs the PGAdmin client on [http://localhost:5556](http://localhost:5556). PGAdmin allows for more granular control using SQL commands
    - Upon first run, you will need to setup your database for PGAdmin. Login using these credentials
        - email: `user@syncra.com`
        - password: `password`
    - Then, right click on `Servers` in the Object Explorer column. Select `Register Server...` and fill in the following:
        #### General Tab
        #### Connection Tab
            - Host: `postgres`
            - Port: 5432
            - Username: `postgres`
            - Password: `postgres`
            - Save password ? : yes
        - Then click _Save_
    - If successful, Click Syncra, Database, Schemas, then syncra_dev_db, then Tables. You should see all your tables here.
    - Select the table you want to view then press `Alt/Option + Shift + V`
    - From here, you can view, edit, and delete data in your database via the SQL Commands script runner.

3. **Postgres CLI**: Since Postgres is ran via Docker, you can access the CLI by running `docker exec -it postgres-syncra psql -U postgres`. From here, you can run Postgres and SQL commands to view and manipulate your database.

* _If any database method didn't work, make sure you have run step 5 in [Install & Run the Syncra Backend](#install--run-the-syncra-backend)_

## Making Commits
When making commits, please follow the following guidelines:
- **Use meaningful commit messages**: When making a commit, please make sure to include a meaningful commit
message. This will help other developers understand the changes you made and why you made them.
- **Use the imperative mood**: When writing a commit message, use the imperative mood. For example:
    ```bash
    `fix: update user schema to include new field`
    ``` 

    instead of 

    ```bash
    `updated user schema to include new field`
    ````
    
_Refer to the Syncra [Git Guidelines] for detailed information on commit messages and Syncra workflow._

### Pre-Commit
Before making a commit, please run the following command in the root directory:
```bash
pnpm format
pnpm lint
```
This will ensure that your code is formatted correctly and that there are no linting errors. If there are any issues, they will be reported and you will need to fix them before making a commit.

- In the future, pre-commit hooks will be implemented, which will automatically run these commands before your commit is finalized.
