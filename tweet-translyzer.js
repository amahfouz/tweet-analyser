// Main file for Tweet Translyzer

var fs = require('fs');
var log4js = require('log4js');

var logger = log4js.getLogger();


// read the file that has the Twitter credentials
var config = JSON.parse(fs.readFileSync('twitter-auth.json'));


logger.debug("Initializing Twitter API client.");

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: config.consumerKey,
  consumer_secret: config.consumerSecret,
  access_token_key: config.accessTokenKey,
  access_token_secret: config.accessTokenSecret
});

logger.debug("Retrieving tweets.")

client.get('search/tweets', {q: 'node.js', lang: "ar"}, function(error, tweets, response){
	if (error) {
		logger.warn(error);
	}
	else {
   		logger.info(tweets);
   		var content = JSON.stringify(tweets);
   		fs.writeFileSync("tweets.json", content, 'utf8', function(error) {
   			logger.warn(error);
   		});
	}
});


// var twitterAPI = require('node-twitter-api');
// var twitter = new twitterAPI({
// 	consumerKey: 'TgnZD9PYg8jaywNC1QtKQyKlE',
// 	consumerSecret: 'ojUxdzlggVyol5YItTSfqABgysko4L5GhPMyOz8eYjfrkdcZDu'
// });

// console.log("Obtaining request token");

// twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
// 	if (error) {
// 		console.log("Error getting OAuth request token : " + error);
// 	} else {
// 		//store token and tokenSecret somewhere, you'll need them later; redirect user 
// 		console.log(requestToken);
// 	}
// });