var mongoose = require('mongoose');
var env = require('dotenv').load();    //Use the .env file to load the variables

mongoose.connect(process.env.COSMOSDB_CONNSTR+"?ssl=true&replicaSet=globaldb", {
  auth: {
    user: process.env.COSMODDB_USER,
    password: process.env.COSMOSDB_PASSWORD
  }
})
.then(() => console.log('Connection to CosmosDB successful'))
.catch((err) => console.error(err));
