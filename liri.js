
require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
moment().format();
var fs = require("fs");

var totalInput = process.argv;
var userInput = process.argv[2];
var userData = totalInput.slice(3).join(" ");

function playMaker() {
switch (userInput) {
    case "concert-this":
        concertThis(userData);
        break;
    case "spotify-this-song":
        spotifyThis(userData);
        break;
    case "movie-this": 
        movieThis(userData);   
        break;
    case "do-what-it-says":
        doWhatItSays(userData);
        break;
};  
}   
playMaker();

//   SPOTIFY
function spotifyThis() {
    
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "22babf00afac41a185c3f43cdfafba00",
  secret: "866dc5ea3f6c4184880acebf3ba5757e"
});
 
spotify.search({ type: 'track', query: userData }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
console.log(data.tracks.items[0].artists[0].name); 
console.log(data.tracks.items[0].name); 
console.log(data.tracks.items[0].artists[0].external_urls); 
console.log(data.tracks.items[0].album.name); 
});

}

//OMDb 

function movieThis() {
var APIurl = "http://www.omdbapi.com/?t=" + process.argv[3] + "&apikey=trilogy";
axios.get(APIurl).then(function(data){
console.log(data.data.Title);
console.log(data.data.Year);
console.log(data.data.imdbRating);
console.log(data.data.Ratings);
console.log(data.data.Country);
console.log(data.data.Language);
console.log(data.data.Plot);
console.log(data.data.Actors);
})
}

//Bands in Town 

function concertThis(userData) {
   if (!userData) {
        userData = "Maggie Rogers";
   } 
   axios.get("https://rest.bandsintown.com/artists/" + userData + "/events?app_id=codingbootcamp")
   .then(function(data){
        console.log(userData + " next 3 concert dates");
        for (var i = 0; i < 3; i++) {
            console.log(data.data[i].venue.name);
            console.log(data.data[i].venue.city);
            var showTime = data.data[i].datetime;
            showTime = moment(showTime).format("MMM Do YYYY");
            console.log(showTime);  
            console.log("----------------------");  

        }  
})
    .catch(function(err) {
        console.log(err);
    });
} 

function doWhatItSays() {
    fs.readFile("read.txt", "utf8", function(err, data){
        // console.log(data.split(","));
        userInput = data.split(",")[0];
        userData = data.split(",")[1];
        playMaker();
    })
}
