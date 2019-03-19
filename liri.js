var Spotify = require('node-spotify-api');

var axios = require("axios");

require('dotenv').config()

var moment = require('moment');

var keys = require("./keys.js");



var action = process.argv[2];

switch (action) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        spotify();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        whatItSays();
        break;
}

function concert() {
    var artist = process.argv[3];

    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            console.log(response);
            // (JSON.stringify(result, null, 2));
            // console.log("Venue: " + response.data.venue);
            // console.log("Location: " + response.data.venue.city);
            // console.log("Date of Event: " + response.data.datetime);

            //Date of the Event (use moment to format this as "MM/DD/YYYY")
        })
}

function spotify() {

    var song = process.argv[3];

    var defaultSong = "'The Sign'by Ace of Base"

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: song }, function (err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
        // (JSON.stringify(result, null, 2));
        // console.log("Artists: " + response);
        // console.log("Song's Name: " + response);
        // console.log("Preview Link: " + response);
        // console.log("Album: " + response);
    });

}

function movie() {

    var movie = process.argv[3];

    var defaultMovie = "Mr. Nobody."

    axios
        .get("https://www.omdbapi.com/?apikey=trilogy&t=" + movie)
        .then(function (response) {

            console.log(response);
            
        })

}

