# Front-end Project

The main project features are represented in the picture below. If the features is starred, it is accessible only for the users with the admin rights.

![project-features](project-features.png)

## Architecture & Design

1. Use the API endpoint [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/) to create an e-commerce website. Read the documentation and learn how to use the different endpoints.
2. Create at lease 4 pages (can be more if you want): Page for all products, product page,
   profile page (only available if user logins), and cart page (cart page could be a page or a modal)
3. Create Redux store for following features:
   - product reducer: get all products, find a single products, filter products by
     categories, sort products by price. Create, update and delete a product (enable update & delete features only for admin of the webapp)
   - user reducer: register and login
   - cart reducer: add product to cart, remove products, update products's quantity in cart
4. When adding routers to your application, programatically set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.
5. Implement unit testing for the reducers
6. Deploy the application and rewrite README file.

To manage the state globally Redux Toolkit library is used. There are 5 reducers responsible for state management.

Here's the list of the main pages of the app:

- Homepage/Store
- Single product
- Cart
- Profile
- Admin dashboard
- Login and SignUp

There are also modals implemented to add and update products.

Below is the high-level project folder structure represented.

```
 .
 ├── public
 ├── src
 |  ├── components
 |  ├── context
 |  ├── hooks
 |  ├── img
 |  ├── pages
 |  ├── redux
 |  ├── routing
 |  ├── tests
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

## Testing

The test cases for all the Redux store reducers have been built with Jest testing library. In this porject, unit testing approach was used. The test requests are sent to the mock server not the real API.

Run `npm test` to implement all the tests.

## Live Application

Run `npm run build` to build the app for production to the `build` folder in the project directory. It will correctly bundle React in production mode and optimize the build for the best performance.

The app is deployed with [Vercel](https://vercel.com/).

[Click here](https://fs16-6-frontend-project-iota.vercel.app) to interact with the ECO website live.
