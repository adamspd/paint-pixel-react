# Pixel Art - Paintpixel

The goal of the project is to have a collaborative game (with authentication) in which users draw on different canvases at defined intervals.
The application provides a light and a dark mode according to the user's wishes

On The Home Page we can see the number of registered users, the number of pixels board to create, connect and create an account.

In this Project You can :
- see the number of registered user
- see the number of created pixelboard
- create your own account
- Login
- change Theme (dark/light mode)
- create a pixel Board on which every authenticated user can participate
- list your pixel Boards
- list all pixel Boards (title, size, author)
- contribute on any existing pixel board
- Logout

Contribution on a pixel Bord : 
* selecting a color
* hovering over the pixelboard to see what will result when you click
* click on the pixel that interests you)


### Authors
Judicaêl Nshimiye - Judicael99
Adams Pierre David - adamspd

### Website
The Project is deployed on `paintpixel.adamspierredavid.com`

##  Installation

`npm i` at the the Root & `npm i` in the 'server' directory

## Projet Launch

### `npm start` (For The client )

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm start` (For the server)

move to 'server' directory and run npm start to launch the server

###  `docker-compose up` (DataBase)
move to 'mongoDB' directory and run docker-compose up to run the database container

## Database inspection 

### `docker exec -it mongoPaint bash`

to interact|enter the container ('mongoPaint' is the container-name); 
Inside the container you can run 'mongosh' to interract with the database;

collections(pixelboard, user) are in `test` database

#### Ps
The project could not be completed due to the lack of staff in the group

