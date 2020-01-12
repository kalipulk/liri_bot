
//reading any environment variables with dotenv package
require("dotenv").config();

var axios = require("axios");
moment().format();
var fs = require("fs");

var totalInput = process.argv;
var userInput = process.argv[2];
var userData = totalInput.slice(3).join(" ");

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

//   SPOTIFY
function searchSpotify() {
    
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "22babf00afac41a185c3f43cdfafba00",
  secret: "866dc5ea3f6c4184880acebf3ba5757e"
});
 
spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
console.log(data.tracks.items[0].artists[0].name); 
console.log(data.tracks.items[0].name); 
console.log(data.tracks.items[0].artists[0].external_urls); 
console.log(data.tracks.items[0].album.name); 
});

}
searchSpotify();


//OMDb 

function searchOMDb() {
var APIurl = "http://www.omdbapi.com/?t=" + process.argv[3] + "&apikey=trilogy";
axios.get(APIurl).then(function(data){
console.log(data.data.Title);
console.log(data.data.Year);
console.log(data.data.imdbRating);
console.log(data.data.Ratings[1].Value);
console.log(data.data.Country);
console.log(data.data.Language);
console.log(data.data.Plot);
console.log(data.data.Actors);
})
}

searchOMDb();

//Bands in Town 

function searchBands(userData) {
   if (!userData) {
        userData = "Maggie Rogers";
   } 
   axios.get("https://rest.bandsintown.com/artists/" + userData + "/events?app_id=codingbootcamp")
   .then(function(data){
        console.log(userData + " next 3 concert dates");
        for (i = 0; i < 3; i++); {
            console.log(data[i].venue.name);
            console.log(data[i].venue.city);
            var showTime = data[i].datetime;
            showTime = moment(showTime).format("MMM Do YYYY");
            console.log(showTime);  
        }  
})
    .catch(function(err) {
        console.log(err);
    });
} 

searchBands();
