# 'MOVIES-EXPLORER' API. Backend diploma project at [Yandex.Practicum](https://practicum.com)

## Description

This is a backend part of a diploma project of the web development course of Yandex Practicum. This repository contains REST API used for user authentification, user data edition and setting favorite movies in Movies Explorer - a web application that allows to search for documentaries within the database provided by [Beat Film Festival](https://beatfilmfestival.ru).

### Check out [frontend part of the project](https://github.com/AnastasiiaUferova/movies-explorer-frontend)

## Functionality

| Method | Route| Description|
| ------------- | ------------- | ------------- 
| GET | ```/users/me```  | returns values of email and name of the current user |
| PATCH	  | ```/users/me``` | updates user info with the email and name passed in the body of the query |
| POST  | ```/movies``` | creates a movie entity with the following values set in the body: country, director, duration, year, description, *image, trailer, nameRU, nameEN, movieId and thumbnail (method used for creating a "saved movies" page) |
| GET | 	```/movies```  | returns all movies that were saved by the user |
| DELETE | ```/movies/movieId```  | 	deletes a saved movie with a certain _id |
| POST	  | ```/signup```  | creates a new user with email, password, name set in body |
| POST  | ```/signin```  | checks email and password sent in body for validity and returns JWT if succeeded |


## Validation
* The queries that reach the server are getting validated with via celebrate middleware and joi validation library;
* Validation and server errors are handled via customized error classes;
* API is protected with authorization middleware.

## Technologies

* express.js;
* nodemon;
* MongoDB;
* mongoose;
* dotenv;
* celebrate;
* bcrypt.js;
* express-rate-limit;
* winston;
* express-winston;
* helmet;
* jsonwebtoken;
* validator;
* eslint


## Installation instructions:

```
git clone https://github.com/AnastasiiaUferova/movies-explorer-api.git

npm install 

npm run start — starts the server;

npm run dev — starts the server with hot-reload;
```
## Future project development

Deploy the project at the cloud server so it'll be available together with the frontend part via URL.
