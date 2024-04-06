# Assessment System

Assessment System Build with Next.js + Nest.js + PostgreSQL

### Install

#### database

    Install PostgreSQL and create database named 'assessment'.

#### backend

    cd backend
    npm install

    Config .env

#### frontend

    cd frontend
    npm install

### Start

#### backend

    cd backend
    npm run start:dev

#### frontend

    cd frontend
    npm run dev

### Technologies

- React
- Next.js 13
- Dash UI
- React Bootstrap
- Node.js
- Nest.js
- PostgreeSQL

### Usage

- Server : http://localhost:5000/
- Frontend : http://localhost:3000/

- Sign up : http://localhost:3000/authentication/sign-up
  The first sign-up user will be Administrator.
- Sign in : http://localhost:3000/authentication/sign-in with first signed up user
- Add Assessment : /pages/assessment
- Add Section : /pages/section
- Add Questions : /pages/question
- Add Testing : /pages/submit
- Check score : /pages/score
- Add other users : /pages/user
