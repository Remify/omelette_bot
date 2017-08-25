let config = require('./config.json');
let rawjs = require('raw.js');
let _ = require('underscore');


let reddit = new rawjs(config.user_agent);
reddit.setupOAuth2(config.client_id, config.client_secret, "http://localhost:8080");

reddit.auth({ "username": config.username, "password": config.password }, function(err, response) {
    if (err) {
        console.log("Unable to authenticate user: " + err);
    } else {
        console.log('logged');
        var CommentStream = rawjs.CommentStream;
        var stream = new CommentStream({ "subreddit": "france", "run": false });

        stream.on('comment', function(comment) {

            if (comment.body.toLowerCase().indexOf('Omelette de fromage') >= 0) {
                console.log('HON HON HON');
            }
            console.log("New comment in subreddit " + comment.subreddit, comment);
        });

        stream.on('error', function(e) {
            console.log("Error: " + e);
        });

        stream.start();
    }
});