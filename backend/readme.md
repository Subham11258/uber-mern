# User Registration Endpoint

## Endpoint
`POST /users/register`

## Description
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

## Request Body
The request body should be a JSON object with the following fields:
- `firstname` (string, required): The first name of the user. Must be at least 3 characters long.
- `lastname` (string, optional): The last name of the user. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user account. Must be at least 6 characters long.

Example:
```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}
```

## Responses

### Success
- **Status Code**: `201 Created`
- **Response Body**: The newly created user object (excluding the password).

Example:
```json
{
    "_id": "60c72b2f9b1e8b001c8e4e3b",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
}
```

### Error
- **Status Code**: `400 Bad Request`
- **Response Body**: An error message indicating what went wrong.

Example:
```json
{
    "error": "All fields are required"
}
```

- **Status Code**: `422 Unprocessable Entity`
- **Response Body**: Validation errors for the provided data.

Example:
```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "First name must be at least 3 characters long",
            "param": "fullname.firstname",
            "location": "body"
        },
        {
            "msg": "Password must be 6 characters long",
            "param": "password",
            "location": "body"
        }
    ]
}
```

### Example Response
Example of a successful response:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "60c72b2f9b1e8b001c8e4e3b",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null
    }
}
```

# User Login Endpoint

## Endpoint
`POST /users/login`

## Description
This endpoint is used to log in an existing user. It requires the user's email and password.

## Request Body
The request body should be a JSON object with the following fields:
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user account. Must be at least 6 characters long.

Example:
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

## Responses

### Success
- **Status Code**: `200 OK`
- **Response Body**: The user object (excluding the password) and a JWT token.

Example:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "60c72b2f9b1e8b001c8e4e3b",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null
    }
}
```

### Error
- **Status Code**: `400 Bad Request`
- **Response Body**: An error message indicating what went wrong.

Example:
```json
{
    "error": "Invalid email or password"
}
```

- **Status Code**: `422 Unprocessable Entity`
- **Response Body**: Validation errors for the provided data.

Example:
```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Password must be 6 characters long",
            "param": "password",
            "location": "body"
        }
    ]
}
```

# Authentication Middleware

## Description
The `auth.middleware.js` file contains middleware to authenticate users using JWT tokens. It checks for the presence of a token in the cookies or the `Authorization` header and verifies it.

## How It Works
1. The middleware extracts the token from either the cookies or the `Authorization` header.
2. If no token is found, it responds with a `401 Unauthorized` status.
3. If a token is found, it verifies the token using the secret key from the environment variables.
4. If the token is valid, it retrieves the user associated with the token and attaches the user object to the `req` object.
5. If the token is invalid, it responds with a `401 Unauthorized` status.

## Code Example
```javascript
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'unauthorized' });
    }
}
```

## How Cookies Work
Cookies are small pieces of data stored on the client-side and sent to the server with each request. They are used to maintain session information between the client and the server.

## How Tokens Work for Headers and Cookies
- **Headers**: Tokens can be sent in the `Authorization` header as a Bearer token. This is a common practice for APIs.
- **Cookies**: Tokens can also be stored in cookies and sent with each request. This is useful for web applications where cookies are automatically managed by the browser.

## Why We Use `cookie-parser` Package
The `cookie-parser` package is used to parse cookies attached to the client request object. It makes it easy to access and manipulate cookies in the request.

Example usage in `app.js`:
```javascript
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```
