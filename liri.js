var Spotify = require('node-spotify-api');

var axios = require("axios");

require('dotenv').config()

var moment = require('moment');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

