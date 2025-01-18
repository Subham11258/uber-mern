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

# User Profile Endpoint

## Endpoint
`GET /users/profile`

## Description
This endpoint is used to retrieve the profile of the authenticated user.

## Authentication
This endpoint requires the user to be authenticated. The JWT token should be provided in the cookies or the `Authorization` header.

## Responses

### Success
- **Status Code**: `200 OK`
- **Response Body**: The user object (excluding the password).

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
- **Status Code**: `401 Unauthorized`
- **Response Body**: An error message indicating that the user is not authenticated.

Example:
```json
{
    "message": "unauthorized"
}
```

# User Logout Endpoint

## Endpoint
`GET /users/logout`

## Description
This endpoint is used to log out the authenticated user. It clears the JWT token from the cookies and blacklists the token to prevent further use.

## Authentication
This endpoint requires the user to be authenticated. The JWT token should be provided in the cookies or the `Authorization` header.

## Responses

### Success
- **Status Code**: `200 OK`
- **Response Body**: A message indicating that the user has been logged out successfully.

Example:
```json
{
    "message": "Logged out successfully"
}
```

### Error
- **Status Code**: `401 Unauthorized`
- **Response Body**: An error message indicating that the user is not authenticated.

Example:
```json
{
    "message": "unauthorized"
}
```

# Blacklist Token Model

The `blacklistToken.model.js` file defines a Mongoose schema and model for storing blacklisted JWT tokens in a MongoDB collection. This is used to manage and invalidate tokens that should no longer be accepted for authentication, such as after a user logs out.

### Key Points:
1. **Schema Definition**:
    - `token`: A string field to store the JWT token. It is required and unique.
    - `createdAt`: A date field that defaults to the current date and time. It has an expiration time of 86400 seconds (24 hours), meaning the document will be automatically removed from the collection after this period.

2. **Purpose**:
    - **Security**: By blacklisting tokens, you can ensure that tokens which should no longer be valid (e.g., after logout) are not accepted for authentication.
    - **Automatic Cleanup**: The `expires` option on the `createdAt` field ensures that blacklisted tokens are automatically removed after 24 hours, keeping the collection clean and efficient.

### Usage in `auth.middleware.js`:
- When a user makes an authenticated request, the middleware checks if the token is blacklisted by querying the `blacklistTokenModel`.
- If the token is found in the blacklist, the request is rejected with a 401 Unauthorized status.
- This prevents the use of tokens that have been explicitly invalidated, enhancing the security of the application.

## Example usage in `auth.middleware.js`:
```javascript
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');

module.exports.authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });
    if (isBlacklisted) {
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


# Captain Registration Endpoint

## Endpoint
`POST /captains/register`

## Description
This endpoint is used to register a new captain. It requires the captain's first name, last name, email, password, and vehicle details.

## Request Body
The request body should be a JSON object with the following fields:
- `fullname.firstname` (string, required): The first name of the captain. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the captain. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the captain. Must be a valid email format.
- `password` (string, required): The password for the captain's account. Must be at least 5 characters long.
- `vehicle.color` (string, required): The color of the vehicle. Must be at least 3 characters long.
- `vehicle.plate` (string, required): The plate number of the vehicle. Must be at least 3 characters long.
- `vehicle.capacity` (number, required): The capacity of the vehicle. Must be at least 1.
- `vehicle.vehicleType` (string, required): The type of the vehicle. Must be one of `car`, `motorcycle`, or `auto`.

Example:
```json
{
    "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "password": "password123",
    "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}


