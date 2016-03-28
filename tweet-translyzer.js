// Main file for Tweet Translyzer

var Twitter = require('twitter');
var fs = require('fs');
var log4js = require('log4js');
var twitsol = require('./twitsol');

// globals 

var solrClient = new twitsol.Twitsol();
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

// read the query spec

var queryJson = JSON.parse(fs.readFileSync("search-query.json", "utf8"));

logger.debug(queryJson);

if (process.argv.length < 3) {
  logger.error("Provide tweets file as command line argument.")
  process.exit(1);
}

var tweetsFile = process.argv[2];

client.stream('statuses/filter', queryJson,  function(stream){
  stream.on('data', function(tweet) {

    // write the tweet text to file

    fs.appendFile(tweetsFile, tweet.text, 'utf8', function(err) {
      fs.appendFile(tweetsFile, "\r------------------------\r");
      if (err)
         console.log("Append error:" + err);
    });

    // add the tweet test to solr

    addTweetToSolr(tweet);

  });

  stream.on('error', function(error) {
    console.log("Stream error:" + error);
  });
});


function addTweetToSolr(tweet) {
  solrClient.add(tweet);
};