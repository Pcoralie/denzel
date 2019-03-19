// nodemon will help us to keep track of changes to our application by watching changed files and automatically restart the server
//npm install --save-dev nodemon
// express will be used to create the server
//npm install express --save
//npm install body-parser --save
//npm install mongodb --save

  var port = process.env.PORT || 9292,
//  mongoose = require('mongoose'),
  env = require('dotenv').load();    //Use the .env file to load the variables
//  Movie = require('./src/model');

  // mongoose instance connection url connection
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/movies');

const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;


const CONNECTION_URL = "mongodb+srv://pcoralie:coconolween@cluster0-udrol.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "movies";

var app = Express();

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

var database, collection;

//var routes = require('./src/routes'); //importing route
//routes(app); //register the route

const imdb = require('./src/imdb');
const DENZEL_IMDB_ID = 'nm0000243';

const fs = require('fs');

async function fetchFilmography(actor) {
  try {
    console.log(`📽️  fetching filmography of ${actor}...`);
    const movies = await imdb(actor);
    const awesome = movies.filter(movie => movie.metascore >= 70);

    fs.writeFileSync('awesome.json', JSON.stringify(awesome, null, 2));
    fs.writeFileSync('movies.json', JSON.stringify(movies, null, 2));
    console.log("Filmography fetched !");
    //process.exit(0);
  } catch (e) {
    console.error(e);
    //process.exit(1);
  }
}

fetchFilmography(DENZEL_IMDB_ID);

//app.use(function(req, res) {
//  res.status(404).send({url: req.originalUrl + ' not found'})
//});

//app.listen(port);

//app.listen(9292, () => {
app.listen(port, () => {
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if(error){
      throw error;
    }
    //const database = client.db(DATABASE_NAME);
    database = client.db(DATABASE_NAME);
    collection = database.collection("movies");
    console.log("Connected to`" + DATABASE_NAME + "`!");
    //client.close();
  });
});

console.log('denzel RESTful API server started on: ' + port);

//npm run start

//npm install mongoose --save

// Mongoose is what we will use to interact with a MongoDB instance

//Populate the database with all the Denzel's movies from IMDB_URL
app.get("/movies/populate", (request, response) => {
  const file = fs.readFileSync("movies.json");
  collection.insertMany(JSON.parse(String(file)),(error, result) => {
    if(error){
      return response.status(500).send(error);
    }
    response.send(result);
  });
console.log("Filmography inserted ! ");
});

// Fetch a random must watch movie
app.get("/movies", (request, response) => {
    collection.find({metascore: {$gte :70}}),((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        else
        {
          //const index = randomIntFromInterval(0 , results.length -1);
          response.send(results[index]);
        }
    });
});

// Fetch a specific movie
app.get("/movies/:id", (request, response) => {
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

// Save a wathced date and a review :
     // date : the watched date
     // review : the personal review
app.post("/movies/:id", (request, response)=>{
  const date = req.query.date;
  const review = req.query.review;
  collection.update({ "_id": request.params.id}, {$set : {date :date , review : review}});
  response.send(" Date and Review updated ! ")
});

// Search for denzel's movies
     // limit : number of movies to return (default : 5)
     //metascore : filter by metascore (default : 0)
app.get("/movies/search", (request, response) => {


});
