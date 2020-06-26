# Social app inspired by Twitter
Made with React, Redux, Styled Components, Express, PostgreSQL, Nginx and hosted on Google Cloud with continuous deployment.

Allows users to create account or login with Google credentials. Users can make posts, delete them, add pictures, like, and reply. App creates a personalized feed based on user's followings and replies to their tweets. Users can edit their profile page, search other users and follow them.

This repository contains frontend source code.
- [Link to backend](https://github.com/AnnaDunajeva/twitter-clone-backend_2.0)
- [Link to live demo](https://twitter-frontend-4zauvs5bna-uc.a.run.app/login)
    - if you do not wish to sign up, you can use the following credentials: 
        - username: `user`
        - password: `12345`

NB! To make the app fully functional you would also need to set up the backend. More information on how to do it in [backend repository's README.md file](https://github.com/AnnaDunajeva/twitter-clone-backend_2.0)

## Setup for development

Run the initial setup
```
git clone https://github.com/AnnaDunajeva/twitter-clone_2.0 frontend
cd frontend
npm install
```
To resolve CORS issues proxy server is required. An example nginx configuration is included. To setup it:
```
cp nginx.conf.dev /etc/nginx/sites-available/twitter-clone
ln -s /etc/nginx/sites-available/twitter-clone /etc/nginx/sites-enabled
sudo service nginx start  # or restart
```
- if you change nginx configuration, them make sure to check .env files as well
run application in the development mode:
```
npm start
```

Open [http://localhost](http://localhost) to view it in the browser.

## Local testing <a name="local-testing"></a>

1. Using Docker:
    <!-- do i need it to be interactive? -->
    `docker build . -f Dockerfile.test -t [YOUR CONTAINER NAME]`

2. Directly on your machine:
    - To run tests in the interactive watch mode use:
    `npm test`
    - To run tests once use:
    `test:nowatch`

## Deploy application 

- Replace frontends's public address (`https://twitter-clone-4zauvs5bna-uc.a.run.app/` in this project) in `.env.production` and in `nginx.conf` with your URL.

1. Deploying on Google Cloud:
    - Replace `gcr.io/augmented-world-276110/twitter-clone-frontend` in `cloudbuild.yaml` with path to your container registry.
        - `cloudbuild.yaml` includes instructions, that first run test. The build will fail if tests fail. Afterwards it builds container image described in `Dockerfile`, which includes building app with react-script build script and setting up an Nginx server. Finally it pushes container to GCR.
    - You can automate build step by setting up triggers for Github repository. Cloud build can create an image automatically, for example on each push to master branch.
    - To manually build container using cloud build:
        ```
        gcloud builds submit --config=cloudbuid.yaml
        ```
2. Build container with Docker:
    - To run tests before building a container, follow the instructions provided in [Local testing](#local-testing) section
    - `docker build . -t [YOUR CONTAINER NAME]`

------------
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `test:nowatch`

Runs all test and exits.


### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

