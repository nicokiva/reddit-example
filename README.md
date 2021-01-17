# Decisions

### How to create the app
The options analyzed where 2:
1. To use a library such as Create React App which generates the scaffolding of the app and extra tools such as webpack or testing framework, everything already configured.
2. To create the environment from scratch adding all the libraries I need and when I need.

Option #1 is good but there are several limitations. For example Webpack is already configured (you may need another library to edit  it), you get libraries you do not need.
Option #2, instead, is a really good decision because you add libraries you need whenever you need and you are free to configure the project the way you want, from scratch.
However I decided Option #1. The goal of the project did not require any extra customization, so installing everything from scratch would have been a not needed extra effort.

### TypeScript or not
> TypeScript is an open-source language which builds on JavaScript

TypeScript allows developers to add types to the entities in the app.
Despite TypeScript is one of my first choices on every project, having to get concerned about types on a simple app would have been useless.

### Project structure
```
/src
    /reducers
    /actions
    /components
        /utilitarian
    /helpers
```

* __Reducers:__ the reducers of the app. There are two different reducers to separate `posts` and `app` logic. App logic is related to the functionality of the structure of the app (such as sidebar status). Posts logic is about how posts are loaded and manipulated. 

* __Actions:__ the actions of the app and follows the same logic as the reducers.

* __Components:__ the html of the app. The files inside this folder contains the HTML used to render each piece of the app. Components inside utilitarian can be reused as they are agnostic.

* __Helpers:__ reusable functions not business case related.

### Material UI vs another library / custom
The reason for picking Material UI vs another library or creating custom components is because they provide the required components I needed to develop the app with minimum effort.

### Code decisions

__[REF #1]:__ when developing the action of refetch the data when user scroll down, in file `src/components/SideBar.jsx`, as scroll can move up and down, I needed to find a way to `fetch only once`. In other words, if fetch was triggered, it should not trigger again.
1. __Semaphore:__ if fetch, then change a boolean which will prevent from fetching again. Next time React library renders the component again, the value will be false again allowing to fetch the data again.

2. __Debounce execution:__ debounce the execution of the fetch function for some miliseconds, so will start refetching as soon as user stop scrolling.

The option I picked was #1 because of the simplicity.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
