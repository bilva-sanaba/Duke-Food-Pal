# FoodPal
A data driven website which allows Duke students to make more informed decisions on what to eat in terms of popularity and nutrition. 

Created by Bilva Sanaba, Teddy Ruby, Ryan Pond, Alex Boss, and Katie Van Dyk
## Construction
The website is built using Node.JS with Express. The database is implemented with sqllite3. 
## Project Structure
### top-level
Contains app.js which routes the entire website as well as various metadata
### public
Contains all static html.
### public/queries
Contains all queries used for graphs, diary log, login/logout, etc. These files are used by app.js in http requests.
### public/database-backend
Contains all nutrition and vendor data used for database as well as scripts for generating a sqlite3 database using this data.
### public/web-backend
Contains all javascript files used by the static html pages to create various functionality. 

## Access the Website
The website is live and can be found at http://dukefoodpal.herokuapp.com/. 

Create an account or check out one of the following:


Username: ryanpond21 Password: pass


Username: katie      Password: pass

## Host the Website
To host the website first download or clone the repository.

Install the needed dependencies with:

    npm install
    
To locally run the site type:

    node app.js

