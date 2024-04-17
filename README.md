# Voting Application

This backend application for a voting system allows users to vote for candidates. It includes functionalities for user authentication, candidate management, and voting.

## Prerequisites

Before you can run the server using these models, make sure you have the following installed:
- Node.js
- MongoDB
- NPM or Yarn (NPM used in Voting_App)

## Features

- **User Authentication:**
  - User sign up and login using Aadhar Card Number and password.
- **Candidate Management:**
  - Users can view the list of candidates.
  - Admin can add, update, and delete candidates.
- **Voting:**
  - Users can vote for a candidate (only once).
  - Admin cannot vote.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)

## Installation

Clone the repository:

```bash
git clone https://github.com/roh-ann23/voting_app.git
```

# API Endpoints

## Authentication

- **Sign Up**
  - `POST /signup` - Sign up a user.
- **Login**
  - `POST /login` - Login a user.

## Candidate Model 

### Model Description

The `Candidate` model represents a political candidate within the application. It includes several fields that store data related to the candidate, their political party, their age, and the voting details.

#### Fields

- **name** (String): The full name of the candidate.
- **party** (String): The name of the political party to which the candidate belongs.
- **age** (Number): The current age of the candidate.
- **votes** (Array): An array representing individual votes. Each item in the array is an object that includes a reference to a `User` and a timestamp.
- **voteCount** (Number): A count of the total votes the candidate has received.

#### Example

```json
{
  "name": "Jane Doe",
  "party": "Green Party",
  "age": 45,
  "votes": [
    {
      "user": "user_001",
      "timestamp": "2024-04-15T08:00:00Z"
    },
    {
      "user": "user_002",
      "timestamp": "2024-04-15T08:05:00Z"
    }
  ],
  "voteCount": 2
}
```
## Candidates Routes

- **Get Candidates**
  - `GET /candidates` - Get the list of candidates.
- **Add Candidate** (Admin only)
  - `POST /candidates` - Add a new candidate.
- **Update Candidate** (Admin only)
  - `PUT /candidates/:id` - Update a candidate by ID.
- **Delete Candidate** (Admin only)
  - `DELETE /candidates/:id` - Delete a candidate by ID.

## Voting Routes

- **Get Vote Count**
  - `GET /candidates/vote/count` - Get the count of votes for each candidate.
- **Vote for Candidate** (User only)
  - `POST /candidates/vote/:id` - Vote for a candidate.

## User Model 

### Model Description

The `User` model represents a voter or admin within the application. It encapsulates various fields containing user information, including personal details, contact information, authentication credentials, and user role.

#### Fields

- **name** (String): The full name of the user.
- **age** (Number): The age of the user.
- **email** (String): The email address of the user.
- **mobile** (String): The mobile number of the user.
- **address** (String): The residential address of the user.
- **adharCardNumber** (Number): The unique Aadhar card number for Indian citizens.
- **password** (String): Hashed password for the user account.
- **role** (String): Specifies if the user is a 'voter' or an 'admin'.
- **isVoted** (Boolean): Flag to check if the user has already voted.

#### Example

```json
{
  "name": "John Smith",
  "age": 30,
  "email": "john@example.com",
  "mobile": "+1234567890",
  "address": "123 Main Street, City, Country",
  "adharCardNumber": 123456789012,
  "password": "hashed_password_string",
  "role": "voter",
  "isVoted": false
}
```

## User Profile Routes

- **Get Profile**
  - `GET /users/profile` - Get user profile information.
- **Change Password**
  - `PUT /users/profile/password` - Change user password.

## Installation

To get started with this application, clone the repository and install the dependencies.

```bash
git clone https://github.com/roh-ann23/voting_app.git
cd voting_app
npm install
```

## Usage
After installing, you can start the server with:
```bash
npm start
```
