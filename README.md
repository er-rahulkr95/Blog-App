<h1 align="center" id="title">QBlog - Blog App</h1>


<p align="center"><img src="https://socialify.git.ci/er-rahulkr95/Blog-App/image?font=Inter&language=1&logo=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F9%2F94%2FMERN-logo.png&name=1&owner=1&pattern=Plus&theme=Auto" alt="Blog-App" width="640" height="320" /></p>

# QBlog - Blog App

A simple blog application which will allow users to register, log in, create blog posts, Edit and Delete a post, comment on existing posts, and like/dislike them.

## <h2>🚀 Demo</h2>

[https://rahulkr95-qblog.netlify.app/](https://rahulkr95-qblog.netlify.app/)

## Tech Stack

### Frontend Built With
Technologies/Framework/Library used in building the frontend of the project:
- React
- Javascript
- HTML
- CSS
- Material UI
- Axios
- Redux ToolKit + React Redux
- React Toastify
- React DropZone
- React Quill
- React Router

### Backend Built With
Technologies/Framework/Library used in building the backend of the project:
- Node.js
- Mongoose
- Express
- bcrypt
- jsonwebtoken
- passport + passport-jwt
- joi
- validator
- cors
- dotenv
- cloudinary
- body-parser
- winston
- http-status
- helmet
- express-mongo-sanitize
- express-rate-limit

### DataBase Used
- MongoDB

## Technical Requirements

- **Frontend**: Use ReactJS or AngularJS to develop the client-side of the application. Implement a user-friendly design that includes feedback to user actions (like errors, success messages, etc.).

- **Backend**: Use Node.js with Express.js for the server-side. It should be capable of
handling user authentication and performing CRUD operations for blog posts and
comments.

- **Database**: Use MongoDB or PostgreSQL to store user information, blog posts,
comments, and likes/dislikes.

- **API**: Develop RESTful APIs to interact between the frontend and the backend.

- **Version Control**: Use Git for version control. Regularly commit your changes with
meaningful commit messages.


## Features

### Frontend Features

- A simple blog application which will allow users to register, log in, log out, create blog posts, Delete a post, Edit a post, comment on existing posts, and like/dislike them.

**User Authentication:** 
- Users can register for an account using their full name, user name, email address and password. Users can log in using their e-mail and log out.

- User can register using only unique email and username otherwise error message will appear indicating user is already registered.

- Custom validation to verify field should not be empty or should not contain only white spaces with no character whenever a record is submitted.

- A success message will slide through from top center of display whenever a user register, login, create or delete a post and comment on a post.


- A warning message will appear whenever try to submit an empty field or wrong input in field.

**Blog Posts:** 

- All users (even those not logged in) can view the posts.

- Only Logged In user can be able to Create, Edit, Delete a blog post, like/dislike and comment on post.

- A Dashboard is provided for a Logged In user, where users can see blog post created by them so that they can edit and delete the post.
**Note: The post shown on dashboard belongs only to the Logged In user, user can't edit or delete other user blog post.**

- A logged in user can like/dislike any post from home page.

- An advance post creation UI where user can give post title, write content in the text editor and upload one image using drag and drop feature.

- Logged In user can also edit their post, the fields get auto populated with the post data when redirected to edit post ui.


### Backend Features

- Created a public and protected RESTful APIs to interact between the frontend and the backend.

- Capable of handling user authentication and authorization and performing CRUD operations for blog posts and comments.

- Used MongoDB to store user information, blog posts, comments, and likes/dislikes.

- Used Mongoose query to retrieve user information, blog posts, comments, and likes/dislikes.

- Used bcypt to hash the password before saving in the data base.

- Used jsonwebtoken and passport for protected routes for handling user authentication and authorization.

- Implemeted Cloudinary library to upload image of blog post on cloudinary which is image/video hosting platform.

- Cors for cross origin access of Restful APIs.

- Added security :
    - SQL preventions
    - Security for headers
    - Preventing DOS attack by limiting number of queries during an amount of time
    - Param Pollution Prevention

## Responsiveness

The whole website is responsive to different screen sizes made using CSS media queries and Material UI.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Run Locally

Clone the project

```bash
  git clone https://github.com/er-rahulkr95/Blog-App
```

Go to the project directories in different terminals

For Frontend 

```bash
  cd frontend
```

For Backend 

```bash
  cd backend
```

Install dependencies in both the directories separately

```bash
  npm install
```

Start the server in both the directories separately

```bash
  npm run start
```

It will runs the app in the development mode.
Backend will start on http://localhost:3000 to view it in your browser.

It will runs the app in the development mode.
Frontend will start on http://localhost:3001 , go the url to view it in your browser. 
**Here Port number number can change depending upon your device free ports or ports not in use.** 

# Other available scripts

Builds the app for production to the `build` folder.

```bash
  npm run build
```

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

Eject

```bash
  npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

# Feedback

If you have any feedback, please reach out to  er.rahulkr95@gmail.com

# License

MIT
