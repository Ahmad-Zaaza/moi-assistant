# MOI Assistant

## Table Of Content

- [MOI Assistant](#moi-assistant)
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
    - [Backend Setup](#backend-setup)
      - [Running the Application](#running-the-application)
      - [Additional Notes](#additional-notes)
    - [Frontend Setup](#frontend-setup)
  - [3. Create `.env` file](#3-create-env-file)
  - [4. Yarn Commands](#4-yarn-commands)
  - [5. Dependencies](#5-dependencies)

## 1. Overview

 Voice Assistant for Ministry of Interior UAE

## Description

Rafiq is an AI voice assistant project developed during InnovateX Hackathon by the Ministry of Interior (MOI). The assistant designed for elderly and people of determination, allows users to ask questions about MOI and their provided services using the power of Large Language Models (LLMs) and Retreival Augmented generaion (RAG).

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
- **User Experience:** Simplicity and ease of use were prioritized over adding numerous features, to ensure the assistant remained user-friendly for the target audience.

### Future Improvements

- **Voice Application for Services:** Allow users to apply for ministry services directly through voice commands.
- **AI-Driven Insights:** Use AI to analyze user interactions and improve service recommendations and responses.
- **Integration with Other Services:** Integrate with other government and non-governmental services for a more comprehensive user experience.
- **Multi-Language Support:** Introduce support for multiple languages to cater to a diverse population.

## 2. Usage

To run this project locally, follow these steps:


### Backend Setup


1. Clone the Repository:

    ```sh
    git clone https://github.com/Ahmad-Zaaza/moi-assistant.git
    ```


2. **Navigate to the Backend Directory**

    ```sh
    cd backend
    ```

3. **Create and Activate a Virtual Environment**

    ```sh
    python -m venv .venv
    ```

    ```
    source .venv/bin/activate  # On Windows, use `.venv\Scripts\activate`
    ```

4. **Install Dependencies**

    ```sh
    pip install -r requirements.txt
    ```

5. **Configure Environment Variables**

    ```sh
    cp .env.example .env
    ```

6. **Add API Keys**
    Open `.env` file and update the keys.

#### Running the Application

1. **Start the Flask Application**

    ```sh
    flask run
    ```

Open a new terminal, navigate to the backend directory, and follow the steps above to set up and run the Flask application.

#### Additional Notes

- Ensure you have Python and pip installed on your system.
- The application runs on `http://127.0.0.1:5000` by default.

### Frontend Setup



1. Navigate to Project Directory:

```bash
  cd moi-assistant
```

2. Install dependencies:

```bash
  yarn install
```

3. Run the dev server:

```bash
  yarn dev
```

## 3. Create `.env` file

The RAG bot is hosted on OpenInnovation servers and is not included in this repository. To use the RAG bot, you will need to request an API key from the OpenInnovation team and update the `RAG_API_KEY` in the `.env` file.

Check `.env.example` for the required environment variables.

## 4. Yarn Commands

| Command   | Description                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------- |
| `commit`  | Interactively create a commit message adhering to Commitlint rules using the command-line interface |
| `build`   | Create a production-ready build                                                                     |
| `dev`     | Run the Vite development server.                                                                    |
| `preview` | Launch the Vite preview server and serve the build.                                                 |

## 5. Dependencies

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
