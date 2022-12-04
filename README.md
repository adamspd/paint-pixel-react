# Pixel Art

The goal of the project is to have a collaborative game (with authentication) in which users draw on different canvases at defined intervals.
The application provides a light and a dark mode according to the user's wishes

On The Home Page we can see the number of registered users, the number of pixels board to create, connect and create an account.

##  Installation

npm i at the the Root & npm i in the 'server' directory

### `npm start` (For The client )

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm start` (For the server)

move to 'server' directory and run npm start to launch the server

###  `docker-compose up` (DataBase)
move to 'mongoDB' directory and run docker-compose up to run the database container

### `docker exec -it mongoPaint bash || mongo`

to interact|enter the container ('mongoPaint' is the container-name); 
Inside the container you can run 'mongosh' to interract with the database;

#### Ps
The project could not be completed due to the lack of staff in the group

