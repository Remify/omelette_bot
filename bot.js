'use strict';
let config = require('./config.json');
let botResponse = require('./response.json');
const _ = require('underscore');
const snoowrap = require('snoowrap');

const reddit = new snoowrap({
    userAgent: config.userAgent,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    username: config.username,
    password: config.password
});

let commented = [];

runBot(reddit)


function runBot(reddit) {


    reddit.getSubreddit('OmeletteBot').getNewComments().then(async (comments) => {
        if (comments.length > 0) {
            
            comments.forEach(c => {
                
                if (c.author.name != 'Omelette_bot' && commented.indexOf(c.id) < 0) {

                    let body = c.body.toLowerCase();
                    if (body.indexOf('omelette du fromage') >= 0) {
                        commented.push(c.id);
                        c.reply(botResponse.message);
                        console.log('replied to ' + c.id)
                    }
                }
            });
        }

        await sleep(config.sleepDuration);
        runBot(reddit);
    });
}

function sleep(ms) {
    console.log('sleeping')
    return new Promise(resolve => setTimeout(resolve, ms));
}
