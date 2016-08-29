# MEAN Starter App

## Synopsis
MEAN Starter App to give you a flying start on your web app. The Front end of the app is based on the amazing Angular Material. 

The App is all hooked up with user signup and sign in using passportjs and a sample Posts API to highlight the basic principles of writing an API.

## Motivation
Most projects often follow the same set of rules and processes during set up . Tired of doing the same thing over and over I thought I'd write this starter app 
to save time on project set up, configuration and user authentication


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisities

* NodeJs
* MongoDB


### Installing

#### Step 1
Clone the App to a depositort on your local computer

#### Step 2
Fire up your MongoDB by going to the console and navigating to the project folder where tou have placed this project. 
To fire up MongoDB to type **mongod**

#### Step 3
Open up another terminal window (Do not close the widow which you used to fire up mongodb). 
In the new terminal window start the app by typing *node index.js*. 
You can also start the app by typing **nodemon**. That too will start the app and will refresh the server every time you make a change on index.js

## API Reference
The application listens to restful API calls on 
* http://localhost:3000/api/

**Example routes**
* http://localhost:3000/api/users
* http://localhost:3000/api/posts
* http://localhost:3000/api/posts/57bbad33a0877bdc14011b86

## TODO 
* Add gulp


