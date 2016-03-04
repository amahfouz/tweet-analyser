// Main file for Tweet Translyzer

var Twitter = require('twitter');
var fs = require('fs');
var log4js = require('log4js');

var logger = log4js.getLogger();


// read the file that has the Twitter credentials
var authConfig = JSON.parse(fs.readFileSync('twitter-auth.json'));


logger.debug("Initializing Twitter API client.");

var client = new Twitter({
  consumer_key: authConfig.consumerKey,
  consumer_secret: authConfig.consumerSecret,
  access_token_key: authConfig.accessTokenKey,
  access_token_secret: authConfig.accessTokenSecret
});

logger.debug("Retrieving tweets.")

var queryJson = JSON.parse(fs.readFileSync("search-query.json", "utf8"));

logger.debug(queryJson);

var tweetsFile = 'oscar-tweets.txt';

client.stream('statuses/filter', queryJson,  function(stream){
  stream.on('data', function(tweet) {
    fs.appendFile(tweetsFile, tweet.text, 'utf8', function(err) {
      fs.appendFile(tweetsFile, "\r------------------------\r");
      if (err)
         console.log("Append error:" + err);
    });
  });

  stream.on('error', function(error) {
    console.log("Stream error:" + error);
  });
});


// client.get('search/tweets', queryJson, function(error, tweets, response){
// 	if (error) {
// 		logger.warn(error);
// 	}
// 	else {
//    		logger.info(tweets);
//    		var content = JSON.stringify(tweets);
//    		fs.writeFileSync("tweets.json", content, 'utf8', function(error) {
//    			logger.warn(error);
//    		});
// 	}
// });


