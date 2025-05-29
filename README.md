# News Aggregator API

## Overview

News Aggregator API is a backend application that allows users to register, log in, manage their preferences, and fetch news based on those preferences. It is built with Node.js, Express, and MongoDB.

## Features

- **User Authentication:** Sign up and login.
- **Preferences Management:** Get and update user preferences.
- **News Aggregation:** Fetch top headlines from the [News API](https://newsapi.org/).

## Prerequisites

- **Node.js**: Version 18 or later (see [package.json](d:\airtribe\news-aggregator-api-aneesazc\package.json) for Node engines).
- **MongoDB**: A running MongoDB instance. Set your MongoDB connection string in the `.env` file.

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd news-aggregator-api
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Environment Variables

Create a `.env` file in the project root with the following variables for an example:

```properties
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEWS_API_KEY=your_news_api_key
```

## Usage

### Starting the Server

To start the server on port 3000, run:

```sh
npm run start
```

For development with automatic restarts, use:

```sh
npm run dev
```

### API Endpoints

#### User Routes (/users)

- **POST /users/signup**  
  Registers a new user.

- **POST /users/login**  
  Authenticates a user and returns a JWT token.

- **GET /users/preferences**  
  Retrieves the authenticated user's news preferences.

- **PUT /users/preferences**  
  Updates the authenticated user's news preferences.

#### News Routes (/news)

- **GET /news**  
  Fetches news articles based on the user's preferences. (Requires JWT)

## Testing

This project uses [tap](https://www.node-tap.org/) and [supertest](https://github.com/visionmedia/supertest) for testing API endpoints.

To run the tests:

```sh
npm run test
```

## Project Structure

```
.
├── app.js
├── .env
├── package.json
├── README.md
├── controllers
│   ├── newsController.js
│   └── usersController.js
├── middlewares
│   └── auth.js
├── models
│   └── usersModel.js
├── routes
│   ├── newsRoute.js
│   └── usersRoute.js
└── test
    └── server.test.js
```

- **app.js**: Initializes the Express server, connects to MongoDB, and configures the routes.
- **controllers/**: Contains business logic for handling requests:
- **middlewares/**: Contains authentication middleware:
- **models/**: Mongoose models such as [usersModel.js]
- **routes/**: API route definitions
- **test/**: Contains tests for API endpoints:
  - [server.test.js]

## License

This project is licensed under the ISC License.

## Author

Airtribe
