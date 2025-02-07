# Polyglot Blog Application

## Overview
This full-stack blog application supports CRUD operations for blog posts, which can be written and rendered in Markdown. It also features a summarization capability powered by Python through MetaCall, offering a variety of AI services to choose from.
## Showcase
![Video](./showcase/showcase.mp4)
## Features
1. 📝 Create, edit, and delete blog posts
2. 🔍 Retrieve blog posts via REST APIs
3. 📄 Write and render blog posts in Markdown
4. 🤖 AI-Powered Summarization (via Python & MetaCall)
5. ⚡ Supports multiple AI services for summarization (e.g., Gemini, Hugging Face, Claude, OpenAI, etc.)
## Requirements
Ensure you have the following installed before running the application:
1. Nodejs
2. [Metacall CLI](https://github.com/metacall/install)

## Environment Configuration
Before running the project, navigate to the server directory, rename .env.example to .env, and add your configurations like:
```bash
MONGO_URI=your_mongodb_connection_string
PORT=4000

HUGGING_FACE_KEY=your_api_key
OPENAI_API_KEY=your_api_key
GEMINI_KEY=your_api_key
EDEN_Authorization=your_api_key
ANTHROPIC_API_KEY=your_api_key
DEEPSEEK_API_KEY=your_api_key
```
## Installation
1. Clone the repository:

```sh
git clone https://github.com/mohyware/polyglot-blog
```

2. Install MetaCall CLI [(More Info)](https://github.com/metacall/install):

```sh
curl -sL https://raw.githubusercontent.com/metacall/install/master/install.sh | sh
```
3. Backend (Server) Setup
```bash
cd server
metacall npm install
metacall pip3 install dotenv huggingface_hub openai anthropic genai
```
4. Frontend (Client) Setup
```bash
cd client
npm install
```
## Usage
1. Start the Backend Server
```bash
cd server
npm run dev  # Start development mode
# OR
npm start    # Run production mode
```
2. Start the Frontend Client
```bash
cd client
npm run dev  # Start development mode
# OR
npm run build  # Build the project before running start
npm start      # Run production mode
```
3. Open your browser and navigate to http://localhost:3000
## Run tests
You can run tests by executing the following command:
```bash
cd client
npm run test
```
```bash
cd server
npm run test
```