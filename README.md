# Larissa restaurant

API to make restaurant order service.

## Setup instructions

- Clone GitHub repository  
  `git clone https://github.com/estebanrojasl/acamica-restaurant.git`

- Install npm dependencies  
  `npm install`

- Setup a new DB connection with the User, Password and Host values on `./config/environments/development.js` or set new connection values and replace them on the config file.

- Setup database creating tables, keys and populating with a few data  
  `npm run seed`  
  Or Setup a database using the information on restaurant\config\environments\development.js and then execute the seed\_.sql file preferably using MySQL Workbench

- Initialize server  
  `npm run dev`

- Start calling the API using the documentation:
  https://documenter.getpostman.com/view/2166416/T17Dg97V
