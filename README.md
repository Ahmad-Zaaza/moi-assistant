# Frontend Boilerplate

## Table Of Content

- [Frontend Boilerplate](#frontend-boilerplate)
  - [Table Of Content](#table-of-content)
  - [1. Overview](#1-overview)
  - [2. Usage](#2-usage)
  - [3. Yarn Commands](#3-yarn-commands)
  - [4. Dependencies](#4-dependencies)
  - [5. Dev Dependencies](#5-dev-dependencies)

## 1. Overview

The frontend boilerplate project is designed with the primary goal of establishing a development convention within the company, fostering best practices, consistency, and knowledge sharing.

Follow the [Usage](#2-usage) section if you want to use this boilerplate in a new project

Please refer to the [Contributing](./CONTRIBUTING.md) document if you wish to contribute to this project.

## 2. Usage

To use this boilerplate in a new frontend project, follow these steps. You need to have a Gitlab repo for your new project created before beginning.

1. The end-to-end (e2e) tests require a password for the user used in the tests to authenticate. The password is configured as a CICD variable to avoid storing the password in the repository files. Add a CICD variable named `TEST_ADMIN_ROLE_USERNAME` and `TEST_ADMIN_ROLE_PASSWORD` and set the username password used for the test user as its value.

2. An Access Token is required for the semantic-release to be able to interact with the repository and add commits and tags. Generate an Access Token in GitLab with the following scopes: `api`, `read_repository`, `write_repository`. Add a CICD variable named `GITLAB_TOKEN` with the Access Token you created as its value.

3. Request a GitLab admin to add the new project to the Renovate Bot.

4. Setup a an application on datadog and fill in the applicationId, clientToken and service in the tracking config in tracking/index.ts

5. Fork the Repository:


6. Change the name of the project directory to the name of the new project.

```bash
mv frontend-boilerplate project_name
```

7. Navigate to Project Directory:

```bash
cd project_name
```

8. Set the package.json name to the project name and set the version to 0.0.0.

9. Update the `issuePrefixes` field in the `commitlint.config.cjs` file to reflect the Jira issue prefix used in your project. Each commit requires a reference to the JIRA issue ID, for example **feat(charts): add line chart `FRON-4`**, with FRON-4 being the Jira issue ID.

10. Remove the git history so that the project has a clean history.

```bash
rm -rf .git
```

11. Initialize a new Git repository in the project folder.

```
git init
```

12. Install dependencies

```bash
yarn install
```

13. Run the dev server

```bash
yarn dev
```

14. Update [contributing](./CONTRIBUTING.md) and replace this README file with the [SAMPLE_README](./SAMPLE_README.md). Delete [SAMPLE_README](./SAMPLE_README.md) after.

15. Set the remote origin for the remote git repo. Now you are ready to commit and push.

## 3. Yarn Commands

| Command    | Description                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------------- |
| `commit`   | Interactively create a commit message adhering to Commitlint rules using the command-line interface |
| `build`    | Create a production-ready build                                                                     |
| `dev`      | Run the Vite development server.                                                                    |
| `prepare`  | Install Husky hooks for pre-commit and pre-push actions.                                            |
| `preview`  | Launch the Vite preview server and serve the build.                                                 |
| `test`     | Run tests using Playwright headless.                                                                |
| `test:gen` | Run tool for generating Playwright test code.                                                       |
| `test:ui`  | Run Playwright tests with a graphical user interface.                                               |

## 4. Dependencies

| Dependency              | Purpose                                                    | Misc                                  |
| ----------------------- | ---------------------------------------------------------- | ------------------------------------- |
| `@datadog/browser-rum`  | Tracking service                                           |                                       |
| `@tanstack/react-query` | React hooks for managing and caching asynchronous data     |                                       |
| `antd`                  | React UI library                                           |                                       |
| `axios`                 | Promise-based HTTP client for the browser and Node.js      |                                       |
| `cva`                   | npm package for class variance authority                   |                                       |
| `echarts`               | library for creating charts                                |                                       |
| `keycloak-js`           | JavaScript adapter for Keycloak authentication             |                                       |
| `localforage`           | Offline storage library for web browsers                   | Used by `react-router-dom`            |
| `match-sorter`          | A utility for sorting and filtering arrays of objects      | Used by `react-router-dom`            |
| `react`                 | A JavaScript library for building user interfaces          |                                       |
| `react-dom`             | Entry point for working with the DOM in React applications |                                       |
| `react-icons`           | Icon library for React applications                        |                                       |
| `react-router-dom`      | Declarative routing for React.js                           |                                       |
| `sort-by`               | Utility for sorting arrays by multiple fields              | Used by `react-router-dom`            |
| `usehooks-ts`           | A collection of React hooks                                | Specifically for useLocalStorage hook |

## 5. Dev Dependencies

| Dev Dependency                      | Purpose                                                   | Misc                  |
| ----------------------------------- | --------------------------------------------------------- | --------------------- |
| `@commitlint/cli`                   | Lint commit messages                                      | conventional commits  |
| `@commitlint/config-conventional`   | Commitlint                                                | conventional commits  |
| `@commitlint/prompt-cli`            | Interactive CLI for Commitlint                            | conventional commits  |
| `@playwright/test`                  | End-to-end testing library for web applications           | Use for e2e tests     |
| `@semantic-release/changelog`       | Automated changelog generation for semantic releases      | semantic-release      |
| `@semantic-release/git`             | Semantic-release plugin for Git                           | semantic-release      |
| `@semantic-release/gitlab`          | Semantic-release plugin for GitLab                        | semantic-release      |
| `@semantic-release/npm`             | Semantic-release plugin for npm                           | semantic-release      |
| `@types/node`                       | TypeScript type definitions for Node.js                   |                       |
| `@types/react`                      | TypeScript type definitions for React                     |                       |
| `@types/react-dom`                  | TypeScript type definitions for React DOM                 |                       |
| `@typescript-eslint/eslint-plugin`  | ESLint plugin for TypeScript                              | linting               |
| `@typescript-eslint/parser`         | TypeScript parser for ESLint                              | linting               |
| `@vitejs/plugin-react`              | Vite plugin for React applications                        | Used by `vite`        |
| `autoprefixer`                      | Parse CSS and add vendor prefixes to rules                | Used by `tailwindcss` |
| `commitizen`                        | Facilitate conventional commit messages with prompts      | conventional commits  |
| `dotenv`                            | Load environment variables from a .env file               | Used by `playwright`  |
| `eslint`                            | Linting utility for JavaScript and TypeScript             | linting               |
| `eslint-plugin-import`              | ESLint plugin for linting import statements               | linting               |
| `eslint-plugin-jsx-a11y`            | ESLint plugin for accessibility rules in JSX              | linting               |
| `eslint-plugin-playwright`          | ESLint plugin for Playwright                              | linting               |
| `eslint-plugin-react`               | ESLint plugin for React                                   | linting               |
| `eslint-plugin-react-hooks`         | ESLint plugin for React Hooks                             | linting               |
| `eslint-plugin-react-refresh`       | ESLint plugin for React Refresh                           | linting               |
| `eslint-plugin-redundant-undefined` | ESLint plugin for redundant undefined checks              | linting               |
| `eslint-plugin-sonarjs`             | ESLint plugin for SonarJS                                 | linting               |
| `husky`                             | Git hooks made easy                                       |                       |
| `lint-staged`                       | Run linters on pre-committed files                        |                       |
| `postcss`                           | A tool for transforming styles with JS plugins            | Used by `tailwindcss` |
| `prettier`                          | Opinionated code formatter                                |                       |
| `semantic-release`                  | Fully automated version management and package publishing | semantic-release      |
| `tailwindcss`                       | A utility-first CSS framework                             |                       |
| `typescript`                        | JavaScript superset for static typing                     |                       |
| `vite`                              | Build tool                                                |                       |
| `vite-plugin-checker`               | Vite plugin that provide checks of TypeScript, ESLint     | Used by `vite`        |
| `vite-plugin-istanbul`              | Used to instrument code for nyc/istanbul code coverage    | Used by `vite`        |
| `vite-tsconfig-paths`               | Vite plugin for tsconfig paths resolution                 | Used by `vite`        |