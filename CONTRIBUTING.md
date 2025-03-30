# Contributing to the Syncra Backend

**!!!!! This project is only for authorized developers to access the and develop the Syncra API !!!!!!**

We appreciate your interest in contributing to our project! . Whether you're fixing a bug, suggesting a new feature, or improving documentation, we welcome your contributions.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Improving Documentation](#improving-documentation)
  - [Submitting Code Changes](#submitting-code-changes)
- [Getting Started](#getting-started)
  - [Install & Run the Syncra Backend](#install--run-the-syncra-backend)
- [Style Guides](#style-guides)
  - [Commit Messages](#commit-messages)
  - [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)
- [Questions?](#questions)

## Code of Conduct

Please be respectful and considerate to all contributors. Follow our [Code of Conduct](CODE_OF_CONDUCT.md) to maintain a friendly and welcoming environment for everyone.

## Ways to Contribute

There are several ways you can contribute to this project:

### Reporting Bugs

If you've encountered a bug, please open an issue on GitHub with the following information:

- A description of the problem.
- Steps to reproduce the issue.
- Expected behavior vs. actual behavior.
- Screenshots (if applicable).
- Your environment details (OS, Node.js version, etc.).

### Suggesting Features

If you have an idea for a new feature or improvement, feel free to suggest it by opening an issue. Include:

- A clear description of the feature or improvement.
- Why you think it's useful.
- Any potential challenges or trade-offs.

### Improving Documentation

Good documentation helps everyone. If you see an area that needs more detail or could be clearer, feel free to open a pull request with your improvements.

### Submitting Code Changes

If you'd like to submit a code change, follow the instructions below to get started.

## Getting Started

You must have the following installed on your local machine, WSL, or SSH instance:

- [Node.js version 20 or higher](https://nodejs.org/en/download/)
- [pnpm version 9 or higher](https://pnpm.io/)
- [Git version 2.34.1 or higher](https://git-scm.com/)
- [Docker version 22 or higher](https://www.docker.com/)
- [Make version 4.3 or higher](https://www.gnu.org/software/make/) (may already be installed on your system)

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

## Style Guides

### Commit Messages
We use [Commitlint](https://commitlint.js.org/) and [Conventional Commits](https://www.conventionalcommits.org) to enforce consistent commit messages. Here are some guidelines for commit messages:

- Use a type to describe the change: feat, fix, docs, chore, style, refactor, test, perf, ci, etc.

- Provide a scope (optional) for the area of the code you're changing.

- Use a subject to describe the change in the present tense.

```bash
feat(auth): add login functionality
fix(ui): resolve button alignment issue
```

### Code Style
We use [Biomejs](https://biomejs.dev/) to enforce consistent code style. Your code should be properly linted and formatted before committing. If you do 'forgit', your code will be automatically linted and formatted before committing. Any errors will need to be fixed before committing and pushing.

To manually lint and format your code, use the following command:
```bash
make check
```

## Pull Request Process

- Before making a pull request, please run the following command in the root directory:
    ```bash
    make check
    ```
    This will ensure that your code is linted and formatted correctly. If there are any issues, they will be reported and you will need to fix them before making a pull request.

- Pre-commit and pre-push hooks will be implemented, which will automatically run these commands before your pull request is finalized.

- Please ensure that your pull request is targeted to the `dev` branch. And make sure that your branch is up to date with `dev`.

- Please ensure that your pull request is not a duplicate of an existing pull request.
- Create a pull request with a clear description of the changes you are making and why you are making them. A template has been provided for you.- Your PR will be reviewed by the team. Be open to feedback and make changes if necessary.

- Once your pull request is approved, it will be merged to the `dev` branch. You can safely delete your branch after the merge. It will not be necessary to rework in your branch after the merge.

## Questions?
If you have any questions or run into issues, feel free to reach out via GitHub discussions or open an issue on the repository.

Happy coding! 🚀


### Key Sections in the `CONTRIBUTING.md`:

1. **Code of Conduct**: Encourages positive, respectful behavior in the project community.
2. **Ways to Contribute**: Lists different ways a person can contribute (reporting bugs, suggesting features, documentation improvements, or code changes).
3. **Getting Started**: Steps to fork the repo, set up the local environment, and run tests.
4. **Style Guides**: Details the commit message conventions, code style, and testing practices to ensure consistency.
5. **Pull Request Process**: Clear instructions for submitting a pull request, including how to create a branch, make changes, and submit for review.
6. **Questions**: An area where contributors can ask questions if they need clarification.

This guide provides contributors with everything they need to know about working on the project, and it ensures that contributions are consistent, easy to review, and adhere to the project's standards.

### Thank you for contributing to the Syncra Backend!