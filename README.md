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
The Project is deployed on [https://paintpixel.adamspierredavid.com](https://paintpixel.adamspierredavid.com).
To do so, we created a subdomain of a domain name own by Adams, then we build the files with `npm run build`, used the command scp to copy the resulted files to a vps where Adams previously installed nginx. Then we edit the configuration of nginx to indicate the location of the files to serve when the subdomain is requested and restarted nginx.

For mongodb, we used a docker container version, both locally and on production.

#### Problems you may encounter
Sometimes, we don't know the reason, we can still see the homepage when requested, but we cannot create an account or login, because axios is unavailable. If you see 0 user registered and 0 pixel board created, then axios is down and nothing can be done on the website. It resolves on its own, that is what is strange.

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

