// Bridge that converts tweets to documents
// and posts them to be indexed by solr

var solr = require('solr');

// define the object

function Twitsol(options) {
	opts = optiona | {};
	this.options = opts;

    this.client = solr.createClient();
}

Twitsol.prototype.add = function(tweet, callback) {
	var tsol = this;

    var id = tweet.id;
    var text = tweet.text;
    var date = tweet.created_at;

    var doc = {"id": id, "text_t": text, "date_t": date};

    client.add(doc1, function(err) {
        if (err)
            console.log(err);
    });
}