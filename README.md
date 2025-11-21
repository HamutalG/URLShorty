# URL Shortener Application

#### React (Next.js) - Express (NestJS) - NodeJs - MongoDB

A simple full-stack application that generates shortened URLs and stores them in a database.
The app allows users to enter a long URL on the client side and receive a short, easily copyable link for quick-sharing. The code was written in order to showcase Next.js and Nest.js in a single, simple and straightforward application. It is structured for scalability, making it easy to expand this “base” into a larger, more feature-rich application.

The project is written using:

- Client side:
  - React (Next.js)
- Server side:
  - NodeJs with Express (NestJS)
- Database:
  - MongoDB (Mongoose)

#### Extras

- The database includes one collection (**urls**) containing:
  - The original URL
  - The generated short code (unique)
- Backend API created with NestJS that supports:
  - Creating a shortened URL
    - Note: In production, DNS points `urlshorty.ly` to your backend so the GET request works. Locally, you can use `localhost:PORT` instead.
- Client side React application that allows the user to:
  - Enter any URL
  - Generate a short version
  - Copy the result to clipboard
- Both the frontend and backend run **simultaneously** using the **concurrently** package.

#### Installation:

This project requires a source code editor, such as [Visual Studio Code](https://code.visualstudio.com/).

You will need to have **MongoDB running locally** and ensure it is connected.

---

### Steps to run the project:

#### 1. Clone the repo

```sh
git clone <repo-url>
cd URLShorty
```

#### 2. Create `.env` file in the backend

In the `backend` folder, create an `.env` file with the following contents:

```sh
MONGO_URI=mongodb://localhost:27017/urlshorty
PORT=3001
```

- `MONGO_URI` – connection string for your MongoDB database
- `PORT` – port the NestJS backend will run on

Make sure to restart the backend server whenever updating the `.env` file.

#### 3. Install dependencies for the root folder

```sh
npm install
```

#### 4. Install dependencies in the backend folder

```sh
cd backend
npm install
```

#### 5. Install dependencies in the frontend folder

```sh
cd ../frontend
npm install
```

#### 6. Run the project with concurrently

Make sure you are back in the root folder:

```sh
cd ..//
npm run dev
```

This will:

- Start the Next.js client (usually on http://localhost:3000)
- Start the NestJS backend (usually on http://localhost:3001)
- Both processes run together through concurrently.

#### Database Setup

- Ensure MongoDB is running locally.
- Connect your MongoDB client (e.g., Compass) to:

```sh
mongodb://localhost:27017/urlshorty
```

The backend automatically creates:

- Database: `urlshorty`
- Collection: `urls`
- Each document contains:
  - `original` – the long URL
  - `short` – the short code

#### How it Works

1. The user enters a URL in the React frontend.
2. A POST request is sent to the NestJS backend with the original URL.
3. The backend generates a short, unique, code and stores `{ original, short }` in MongoDB.
4. The user receives a shortened link.
5. Visiting `http://localhost:3001/<shortCode>` redirects to the original URL.
