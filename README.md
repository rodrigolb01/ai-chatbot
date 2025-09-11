# Chat AI Project

This project consists of a **back-end API** (`chat-ai`) and a **front-end UI** (`chat-ai-ui`) for a chat application powered by OpenAI and Stream Chat.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Back-end (`chat-ai`)](#back-end-chat-ai)
  - [Front-end (`chat-ai-ui`)](#front-end-chat-ai-ui)
- [Environment Variables](#environment-variables)
  - [Back-end .env Example](#back-end-env-example)
  - [Front-end .env Example](#front-end-env-example)
- [Running the Project](#running-the-project)

---

## Project Structure

```
chat-ai-api/
├── chat-ai/        # Back-end (Node.js/Express/TypeScript)
│   ├── src/
│   ├── .env
│   └── ...
├── chat-ai-ui/     # Front-end (Vue 3 + Vite)
│   ├── src/
│   ├── .env
│   └── ...
```

---

## Setup Instructions

### Back-end (`chat-ai`)

1. **Install dependencies:**
   ```bash
   cd chat-ai
   npm install
   ```

2. **Create a `.env` file** in the `chat-ai` directory (see example below).

3. **Start the server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

---

### Front-end (`chat-ai-ui`)

1. **Install dependencies:**
   ```bash
   cd chat-ai-ui
   npm install
   ```

2. **Create a `.env` file** in the `chat-ai-ui` directory (see example below).

3. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## Environment Variables

### Back-end `.env` Example (`chat-ai/.env`)

```env
PORT=8000
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_postgres_database_url (neon database used for this project)
```

> **Note:** Do **not** wrap values in quotes.  
> Replace the example values with your actual credentials.

---

### Front-end `.env` Example (`chat-ai-ui/.env`)

```env
VITE_API_URL=http://localhost:8000
```

- `VITE_API_URL` should point to your back-end API URL.

---

## Running the Project

1. **Start the back-end server** (`chat-ai`).
2. **Start the front-end dev server** (`chat-ai-ui`).
3. Open your browser and go to [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## Notes

- Make sure both `.env` files are present and correctly configured before running the project.
- Never commit your `.env` files with real secrets to public
