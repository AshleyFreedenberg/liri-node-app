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
            for (var i = 0; i < response.data.length; i++) {
                //console.log(response);
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city);
                var eventDate = response.data[i].datetime;
                var convertedDate = moment(eventDate);
                console.log("Date of Event: " + (convertedDate.format("MM/DD/YYYY")));
                console.log("--------------------------");
            }
        })
}

function spotify() {

    var song = process.argv[3];

    var defaultSong = "'The Sign'by Ace of Base"

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //console.log(data);
        console.log("--------------------------");
        console.log("Artists: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song's Name: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("--------------------------");
    });

}

function movie() {

    var movie = process.argv[3];

    var defaultMovie = "Mr. Nobody."

    axios
        .get("https://www.omdbapi.com/?apikey=trilogy&t=" + movie + "&y=&plot=short")
        .then(function (response) {

            console.log(response);
            console.log("--------------------------");
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country where the movie was produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("--------------------------");

        })

}

var fs = require("fs");

function whatItSays() {
    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        console.log(dataArr);
    });

    


}

