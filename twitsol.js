// Bridge that converts tweets to documents
// and posts them to be indexed by solr

var solr = require('solr');

// define the object

function Twitsol(options) {
	opts = options | {};
	this.options = opts;

    this.client = solr.createClient({'core': "/tweets"});
}

exports.Twitsol = Twitsol;

// add the specified tweet to solr

Twitsol.prototype.add = function(tweet, callback) {
	var tsol = this;

    var id = tweet.id;
    var text = tweet.text;
    var date = tweet.created_at;

    var doc = {"id": id, "title_t": "Foo Bar", "text_t": text, "date_t": date};

    this.client.add(doc, function(err) {
        if (err)
            console.log(err);
        else
            console.log("Document added.");
    });
}