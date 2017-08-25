'use strict';
let config = require('./config.json');
const _ = require('underscore');
const snoowrap = require('snoowrap');

const reddit = new snoowrap({
  userAgent: config.userAgent,
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  username: config.username,
  password: config.password
});

reddit.getSubreddit('OmeletteBot').getNewComments().then(comments => {
    comments.forEach(c => {
        let body = c.body.toLowerCase();
        if(body.indexOf('omelette du fromage') >= 0) {
            
            reddit.getSubmission('t3_6w1jl7').expandReplies().then(replies => {

                // replies.comments.forEach(r => {
                //     Object.values(r).indexOf('Omelette_bot');
                //     console.log('has Omelette_bot, r');

                // })
                console.log(_.pick(replies, 'id'));
            })
            //c.reply('**Do you mean "Omelette au fromage" ?** \n \n Although meant to depict "cheese omelette", "Omelette du fromage" is grammatically incorrect. You should say "omelette au fromage", which means "an omelette with cheese". \n \n [Read more](http://www.urbandictionary.com/define.php?term=Omelette%20du%20fromage)');
        }

    });
})