# Polyglot Blog Application
The backend of this polyglot blog application will be responsible for managing blog posts and user interactions. It will be implemented using Node.js and expose REST APIs for creating, editing, and retrieving blog posts.

## Features
1. 📝 Create, edit, and delete blog posts
2. 🔍 Retrieve blog posts via REST APIs
3. 🤖 AI-Powered Summarization (via Hugging Face API & Python)

## Requirements
Ensure you have the following installed before running the application:
1. Nodejs
2. [Metacall CLI](https://github.com/metacall/install)

## Environment Configuration
Before running the project, navigate to the server directory, rename .env.example to .env, and add your configurations like:
```bash
MONGO_URI=your_mongodb_connection_string
PORT=4000
HUGGING_FACE_KEY=your_huggingface_api_key
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
metacall pip3 install dotenv huggingface_hub
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