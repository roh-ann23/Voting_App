# Voting Application

This backend application for a voting system allows users to vote for candidates. It includes functionalities for user authentication, candidate management, and voting.

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

## Candidates

- **Get Candidates**
  - `GET /candidates` - Get the list of candidates.
- **Add Candidate** (Admin only)
  - `POST /candidates` - Add a new candidate.
- **Update Candidate** (Admin only)
  - `PUT /candidates/:id` - Update a candidate by ID.
- **Delete Candidate** (Admin only)
  - `DELETE /candidates/:id` - Delete a candidate by ID.

## Voting

- **Get Vote Count**
  - `GET /candidates/vote/count` - Get the count of votes for each candidate.
- **Vote for Candidate** (User only)
  - `POST /candidates/vote/:id` - Vote for a candidate.

## User Profile

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
