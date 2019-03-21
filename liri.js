var Spotify = require('node-spotify-api');
var axios = require("axios");
require('dotenv').config()
var moment = require('moment');
var keys = require("./keys.js");
var fs = require("fs");

var action = process.argv[2];
var dataInput = process.argv[3];

var command = function (action, dataInput) {
    switch (action) {
        case "concert-this":
            concert(dataInput);
            break;

        case "spotify-this-song":
            spotify(dataInput);
            break;

        case "movie-this":
            movie(dataInput);
            break;

        case "do-what-it-says":
            whatItSays(dataInput);
            break;
    }
}

command(action, dataInput);

// node liri.js concert-this "Thomas Rhett"
function concert(dataInput) {
    var artist = dataInput

    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                //console.log(response);
                console.log("--------------------------");
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city);
                var eventDate = response.data[i].datetime;
                var convertedDate = moment(eventDate);
                console.log("Date of Event: " + (convertedDate.format("MM/DD/YYYY")));
            }
        })
}

// node liri.js spotify-this-song Rumor 
// node liri.js spotify-this-song 
function spotify(dataInput) {

    var spotify = new Spotify(keys.spotify);

    var song = dataInput

    if (song === undefined) {

        var defaultSong = "The Sign"

        spotify.search({ type: "track", query: defaultSong, limit: 46 }, function (err, data) {

            if (err) {
                return console.log('Error occurred: ' + err);
            }

            //console.log(data);
            console.log("--------------------------");
            console.log("Artists: " + data.tracks.items[45].album.artists[0].name);
            console.log("Song's Name: " + data.tracks.items[45].name);
            console.log("Preview Link: " + data.tracks.items[45].preview_url);
            console.log("Album: " + data.tracks.items[45].album.name);
            console.log("--------------------------");
        });

    }

    else {
        spotify.search({ type: "track", query: song, limit: 1 }, function (err, data) {

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

}

// node liri.js movie-this "Toy Story"
// node liri.js movie-this
function movie(dataInput) {
    var movie = dataInput;
    var defaultMovie = "Mr. Nobody."

    if (movie === undefined) {

        axios
            .get("https://www.omdbapi.com/?apikey=trilogy&t=" + defaultMovie + "&y=&plot=short")
            .then(function (response) {

                // console.log(response);
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
    else {
        axios
            .get("https://www.omdbapi.com/?apikey=trilogy&t=" + movie + "&y=&plot=short")
            .then(function (response) {

                // console.log(response);
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
}

// node liri.js do-what-it-says
function whatItSays() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        command(dataArr[0], dataArr[1]);
    });

}

// HOMEWORK

// node liri.js concert-this "Thomas Rhett”
// node liri.js spotify-this-song Rumor
// node liri.js spotify-this-song
// node liri.js movie-this "Toy Story"
// node liri.js movie-this
// node liri.js do-what-it-says


