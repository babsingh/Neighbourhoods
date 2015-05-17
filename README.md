# Neighbourhoods
### BlueHack Project 

#### Before starting the server:

##### Install global (-g) dependencies
    1. Express
    2. Express-Generator
    3. Mongo
    4. Nodemon
  
##### How? 
  - npm install -g ${dependency}

##### Go to workspace 
  - cd Neighbourhoods/nhoods

##### Install local dependencies 
  - npm install

##### Start mongo server 
  - mongod --dbpath ${PATH_TO}/data
  
#### Starting the server:
  - npm start
    - If the above command fails, it means that few global depencies are missing. 
    - Find the name of the dependency from the error message, and install it using:
      - npm install -g ${dependency}.
