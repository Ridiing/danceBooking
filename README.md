# Dance Class Booking Web Application

This is a web-based dance class booking system that allows users to register, browse available classes, enroll, and manage their enrollments. Organisers can add courses, view participants, and manage users. Built with 
Node.js, Express, Mustache and NeDB, hosted with Heroku.

## Features

### For General Users
- View the landing page and explore available dance courses
- Register and login to create an account
- Browse course details including schedules, location, and prices
- Enroll in courses and manage your enrollments

### For Organisers
- Add, edit, and delete courses
- View participants for each course
- Promote users to organisers and remove users

### Authentication & Session Management
- Session-based login system
- Role-based access control for organisers vs standard users

---

## Live Demo

You can access the live application here:  
https://dancebookingcw-575696c3be7f.herokuapp.com

Organiser - Username: userr Password: user
User - Username: user Password: user

---
Installation & Local Setup

1. Clone the repository

   git clone https://github.com/Ridiing/danceBooking.git
   cd danceBooking

2. Install dependencies
    npm install

3. Configure environment variables
    Create a .env file in the project root:

    PORT=3000
    SESSION_SECRET=your_secret_key

4. Run the application

    npm start

    Visit http://localhost:3000 in your browser.


