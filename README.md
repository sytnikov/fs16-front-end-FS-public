# Front-end Project - E-commerce website

This project is designed to represent an e-commerce website based on the [Platzi Fake Store API](https://fakeapi.platzi.com/) as a third-party tool providing all the information about the products, their categories and the users.

This project can be of interest for those who is building their webstore from scratch and need the core structure to start working with. Overall, this project helps provide the basic operations with products, customers, and orders.

## Contents

- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Architecture & Design](#architecture-and-design)
- [Testing](#testing)
- [Live Application](#live-application)

## Technologies

![Typescript](https://img.shields.io/badge/Typescript-5.2.2-blue)
![React](https://img.shields.io/badge/React-18.2.0-purple)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-red)
![React Router](https://img.shields.io/badge/ReactRouter-6.16.0-yellow)
![Axios](https://img.shields.io/badge/Axios-6.16.0-blue)
![Material UI](https://img.shields.io/badge/MaterialUI-5.14.10-green)

The project is build with Typescript and React using Redux Toolkit as a tool for state management. Axios is used for server data queries, React Router for creating the routing structure, and Material UI library and custom SCSS for styling.

## Getting Started

To start working with the project, clone the repo to your local machine using
`git clone https://github.com/sytnikov/fs16_6-frontend-project.git`.

Create node.js environment by running `npm install`. Use `npm install` to install dependencies to work with the project. Tip: if you are a MacOS user `brew install` can be considered as an alternative. The list of all necessary dependencies can be found in `package.json`. No additional config files required.

Run `npm start` to start the application in your browser.

## Usage

There are several scripts available to run:

`npm start`: runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
`npm test`: launches all the tests in the interactive watch mode
`npm run build`: builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The main project features are represented in the picture below. If the features is starred, it is accessible only for the users with admin rights.

![project-features](project-features.png)

## Architecture & Design

According to the scope of the project, it was decided to use horizontal slice aka functional based architecture.

In this project, Redux Tollkit library is used to manage the state globally. There are 5 reducers responsible for state management.

Here's the list of the main pages of the app:
 - Homepage/Store
 - Single product
 - Cart
 - Profile
 - Admin dashboard
 - Signup and Login

 There are also modals implemented to add and update products.

Below is the high-level project folder structure represented.
```
 .
 ├── public
 ├── src
 |  ├── components
 |  ├── hooks
 |  ├── img
 |  ├── pages
 |  ├── redux
 |  ├── routing
 |  ├── routing
 |  ├── types
 |  ├── App.tsx
 |  ├── index.scss
 |  ├── index.tsx
 |  ├── react-app-env.d.ts
 |  ├── reportWebVitals.ts
 |  └── setup.Tests.ts
 ├── .gitignore
 ├── package.json
 ├── project-features.png
 ├── README.md
 └── tsconfig.json
```

## Testing:

The test cases for all the project reducers have been built with Jest testing library. In this porject, there was unit testing approach used. The test requests are sent to the mock server not the real API. 

## Live Application

The app is deployed with [Vercel](https://vercel.com/). [Click here](https://fs16-6-frontend-project-iota.vercel.app) to interact with the ECO website live.
