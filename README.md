![foto](assets/img/banner.png)

<p align='center'>
  <a><strong>Who we are?</strong>
  <br />
  ·
  <a href='https://github.com/pafz'>Patricia Fdez.</a>
  🤜🏽🤛🏽
  <a href='https://github.com/saraoriola'>Sara Oriola</a>
  ·
</p>


# Introduction

Hello everyone! We are two enthusiastic students who have developed this amazing REST API for an awesome Student Bonus App. We are excited to share our work with all of you.

## Technologies Used 🚀

To make this project possible, we combined our creativity and skills with the following technologies:

- **Node.js** 🟢: The foundation for our fast and efficient backend.
- **Express** 🌐: The framework that allowed us to build a robust and flexible API.
- **MongoDB with Mongoose** 🍃: The NoSQL database we used to store all our data.
- **Bcrypt** 🔐: To securely store our users' passwords.
- **JSON Web Tokens (JWT)** 🔒: An elegant way to handle authentication in our application.
- **Git and GitHub** 🗂️: We worked as a team using the power of version control and online collaboration.
- **Vercel** 🚀: Deployment platform to have our backend available in production.

## "Users" Collection 👤

The "Users" collection is where we store all the relevant information about our beloved users. Whether they are enthusiastic students or passionate teachers, everyone has their space here. Each user has their unique ID, and we also store their Name, Last Name, Role (student or teacher), Accumulated Points, and much more.

 <a href='https://documenter.getpostman.com/view/28520865/2s946mapu7'>User's Documentation</a>


## "Doubts" Collection 🤔

Have you ever wondered about something you haven't quite understood? Students do too! In the "Doubts" collection, we register all the exciting questions that our students ask. Each doubt is related to the student who generated it, contains the question itself, the date it was asked, and whether it has already been resolved.

 <a href='https://documenter.getpostman.com/view/28520865/2s946mZpNy'>Doubs's Documentation</a>

## Project Description 💡

We are excited about the potential of this application. Our goal is to develop a REST API that provides an incredible experience for our users. Here are the challenges we want to overcome:

- Allow secure registration of new users with passwords encrypted with Bcrypt.
- Perform user login using JWT tokens for secure and uncomplicated authentication.
- Offer CRUD operations for the "Users" and "Doubts" collections for complete application management.
- Ensure that the backend is available in production for a smooth user experience.

We hope you enjoy exploring our API as much as we enjoyed creating it!

## Development 💻

Clone the repository, install the dependencies, and start the application:

```bash
git clone git@github.com:saraoriola/buddyApp.git
npm install
npm run dev
```

Note: use the `depth` parameter to reduce the clone size and speed up the clone.

```sh
git clone --depth=1 https://github.com/saraoriola/buddyApp.git
```

## Pending Tasks and Work in Progress 🚧

Our project is still under development, and we are working diligently to improve and add new functionalities. Here is the list of pending tasks and what we are currently working on:

- **Implement the ability to vote on answers to questions to encourage interaction among users.**
- **Implement a list of favorite questions, so users can view them from their profile.**
- **Improve the notification system to keep users informed about updates on questions and answers.**
- **Optimize the performance and efficiency of the API to handle larger user loads.**

We are thrilled about these upcoming features and improvements! We will continue updating and enhancing the project, so stay tuned for the next updates.

## Deployment on Vercel 🚀

This API is available for you to enjoy in production! We have deployed it with the help of Vercel, ensuring a smooth and reliable user experience.

Visit our API on Vercel: [Link to the API on Vercel](https://your-api-name.vercel.app/)

## Contributions and Feedback 🤝

We would love to receive your contributions and feedback! If you have any brilliant ideas or find something that can be improved, please don't hesitate to open an issue or send a pull request. Together, we will make this API even more awesome!

Thank you for your interest and support in our project! 🌟

