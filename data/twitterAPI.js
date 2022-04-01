const Twit = require('twit')
require('dotenv').config();

const Twitter_client = new Twit({
    consumer_key: 'SQlcPwUbSA8kkKja4VLFjZtqz',
    consumer_secret: 'h9nUGKaSVwcJCPfQky7YbxKW40yI8I75V6gdG27oSUuGrdxt8Y',
    access_token: '2940417962-Ba3iMuJd2p20V91uaMi9GuHdyISryLecHJ3jYHz',
    access_token_secret: 'YioJJoL90fV2qZ2LC4mM21VMuOYmIOBrGSviJi0LeSvDr'
});




function getAlltweets(keyword){

    return new Promise((resolve,reject)=>{

        if(keyword){

            Twitter_client.get('search/tweets', { q: `#${keyword} since:2021-12-15`, count: 1 }, function(err, data, response) {
                const tweets = data.statuses;
                return resolve(tweets);
             });
    
        }else{
    
            Twitter_client.get('search/tweets', { q: `#crypto since:2021-12-15`, count: 2 }, function(err, data, response) {
                const tweets = data.statuses;
                return resolve(tweets);
             });
    
        }

    })

}



module.exports = {getAlltweets};





