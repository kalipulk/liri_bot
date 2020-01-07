
//reading any environment variables with dotenv package
require("dotenv").config();

var axios = require("axios");


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
// searchSpotify();


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

// searchOMDb();

//Bands in Town 

function searchBands() {
   var bands = "https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp"
   axios.get(APIurl).then(function(data){
    console.log(data.artist.name);
    console.log(data.venue.city);
    console.log(data.venue.country);
    console.log(data.datetime);
})
} 

searchBands();
