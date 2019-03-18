# This repo houses code for auth by token and crud on react redux-saga (using Sequelize and PostgreSQL)"

If you dont have install  node-js, please go this link [https://nodejs.org](https://nodejs.org)

# Sequelize Setup

Let's begin by installing Sequelize CLI package. ```npm install -g sequelize-cli```

# PostgreSQL Setup for LINUX 

### You need to add the latest PostgreSQL repository for the latest version.
  
```sudo add-apt-repository "deb https://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main"```

### Update and Install PostgreSQL on ubuntu 18.04, please go this link [install-and-use-postgresql](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)


# Config Setup

#### go to directory /you_project/server/config and open file config.json and change settings under your database

```$xslt
{
  "development": {
    "username": "you_DATABASE_username",
    "password": "you_DATABASE_password",
    "database": "you_DATABASE_name",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
}
```


# Project Setup

1. Use command  ```npm install``` for install dependices
2. Now try running the migrate ```npm run migrate```
3. Now try running the application server ```npm run server```
and visiting [http://localhost:8000](http://localhost:8000). 
3. Running the client to do this, we run the following command:  ```npm run client```

Have fun! smile


