# Frontend Boilerplate

## Table Of Content

- [Frontend Boilerplate](#frontend-boilerplate)
  - [Table Of Content](#table-of-content)
  - [1. Overview](#1-overview)
  - [Description](#description)
  - [Problem and Solution](#problem-and-solution)
    - [Problem](#problem)
    - [Solution](#solution)
  - [Technical Choices](#technical-choices)
    - [Reasoning Behind Choices](#reasoning-behind-choices)
    - [Trade-offs and Considerations](#trade-offs-and-considerations)
    - [Future Improvements](#future-improvements)
  - [2. Usage](#2-usage)
  - [3. Yarn Commands](#3-yarn-commands)
  - [4. Dependencies](#4-dependencies)
  - [5. Dev Dependencies](#5-dev-dependencies)

## 1. Overview

 Voice Assistant for Ministry of Interior UAE

## Description

Maha is an AI voice assistant project developed during InnovateX Hackathon by the Ministry of Interior (MOI). The assistant designed for elderly and people of determination, allows users to ask questions about MOI, or their provided services using the power of Large Language Models (LLMs).

## Problem and Solution

### Problem
Elderly individuals and people of determination often face significant challenges when trying to access government services. These challenges can include difficulty navigating websites, understanding complex procedures, and physically visiting government offices. These barriers lead to frustration, reduced independence, and exclusion from essential services.

### Solution
Our voice assistant provides a seamless and intuitive solution to these problems. By enabling users to interact with the Ministry of Interior's services through simple voice commands, the assistant ensures that information is easily accessible to all, regardless of physical or technological limitations. The assistant leverages Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG) to understand user questions and generate accurate, detailed answers.

## Technical Choices

### Reasoning Behind Choices
1. **Large Language Models (LLM):**
   - **Reasoning:** LLMs are capable of understanding and processing natural language queries, making the voice assistant conversational and easy to use.

2. **Retrieval-Augmented Generation (RAG):**
   - **Reasoning:** RAG combines the strengths of retrieval-based and generation-based models, ensuring accurate and comprehensive answers.

3. **Voice Recognition and Synthesis:**
   - **Reasoning:** These technologies are essential for enabling voice-based interactions, making the assistant accessible to users with limited reading or typing abilities.

### Trade-offs and Considerations
- **Performance vs. Accuracy:** Balancing the performance of the assistant with the accuracy and relevance of its responses was a key consideration. While high accuracy is essential, it should not come at the cost of slow response times.
- **Data Privacy:** Ensuring the privacy and security of user data was prioritized, potentially limiting some advanced features that require extensive data collection.
- **User Experience:** Simplicity and ease of use were prioritized over adding numerous features, to ensure the assistant remained user-friendly for the target audience.

### Future Improvements
- **Voice Application for Services:** Allow users to apply for ministry services directly through voice commands.
- **AI-Driven Insights:** Use AI to analyze user interactions and improve service recommendations and responses.
- **Integration with Other Services:** Integrate with other government and non-governmental services for a more comprehensive user experience.
- **Multi-Language Support:** Introduce support for multiple languages to cater to a diverse population.


## 2. Usage

To run this project locally, follow these steps:

1. Clone the Repository:

```bash 
git clone https://github.com/Ahmad-Zaaza/moi-assistant.git
```

2. Navigate to Project Directory:

```bash
  cd moi-assistant

```


3. Install dependencies:

```bash
  yarn install
``` 

4. Run the dev server:

```bash
  yarn dev
```


## 3. Yarn Commands

| Command   | Description                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------- |
| `commit`  | Interactively create a commit message adhering to Commitlint rules using the command-line interface |
| `build`   | Create a production-ready build                                                                     |
| `dev`     | Run the Vite development server.                                                                    |
| `preview` | Launch the Vite preview server and serve the build.                                                 |

## 4. Dependencies

| Dependency              | Purpose                                                    | Misc                                  |
| ----------------------- | ---------------------------------------------------------- | ------------------------------------- |
| `@tanstack/react-query` | React hooks for managing and caching asynchronous data     |                                       |
| `antd`                  | React UI library                                           |                                       |
| `axios`                 | Promise-based HTTP client for the browser and Node.js      |                                       |
| `cva`                   | npm package for class variance authority                   |                                       |
| `echarts`               | library for creating charts                                |                                       |
| `localforage`           | Offline storage library for web browsers                   | Used by `react-router-dom`            |
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
