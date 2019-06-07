var request = require('request');
var jws     = require('jws');
var dateFns = require('date-fns');


function get_jwt() {
    var now = new Date();
    var epoch = Math.floor(now / 1000)
    var time_stuff = {
        updated_at: now.toISOString(),
        iat: epoch,
        exp: epoch + (10 * 60 * 60)
       
    };
    var test_data = Object.assign({}, jwt_template, time_stuff);
       
    var signature = jws.sign({
      header: { alg: 'HS256' },
      payload: test_data,
      secret: Buffer.from(process.env.AUTH0_CLIENT_SECRET, 'base64'),
    });

    return signature;
};


function get_MIN_payload(options){
    var now = new Date();
    return Object.assign({}, form_template, {
        title: "AUTO TEST REPORT " + now.toISOString(),
        datetime: dateFns.subHours(now, 3).toISOString(),
    }, options);
}



var jwt_template = { 
    'https://avalanche.ca/submission_nickname': 'test_user_nick',
    'https://avalanche.ca/developer_account': false,

    nickname:       'test_user',
    name:           'wharding@avalanche.ca',
    updated_at:     '2019-02-25T22:14:54.058Z', // Match the issued at? (ISO format)
    email:          'support@avalanche.ca',
    email_verified: false,
    iss:            'https://testing-issuer/',
    sub:            'avcan|test_user_id',
    aud:            'ZQ0uMq56UX7k9FMfR1aF5AOlaf4sguad',
    iat:            undefined, // Time of issue (Unix Epoch)
    exp:            undefined  // Expiration time (Unix Epoch)
}


var form_template =  {
	title: "AUTO TEST REPORT",
	datetime: "2000-01-01:00:00:00Z",
    latlng: JSON.stringify(["60.50047","-102.89496"]),
    files: [],
    obs: JSON.stringify({
       "quickReport" : {
          "ridingConditions" : {
             "rideType" : {
                "type" : "multiple",
                "prompt" : "We rode:",
                "options" : {
                   "Cut-blocks" : false,
                   "Open trees" : false,
                   "Convex slopes" : false,
                   "Sunny slopes" : false,
                   "Steep slopes" : false,
                   "Dense trees" : false,
                   "Mellow slopes" : false,
                   "Alpine slopes" : false
                }
             },
             "weather" : {
                "prompt" : "The day was:",
                "options" : {
                   "Foggy" : false,
                   "Wet" : false,
                   "Cold" : false,
                   "Cloudy" : false,
                   "Windy" : false,
                   "Warm" : false,
                   "Stormy" : false,
                   "Sunny" : false
                },
                "type" : "multiple"
             },
             "ridingQuality" : {
                "prompt" : "Riding quality was:",
                "options" : [
                   "Amazing",
                   "Good",
                   "OK",
                   "Terrible"
                ],
                "selected" : "OK",
                "type" : "single"
             },
             "stayedAway" : {
                "type" : "multiple",
                "options" : {
                   "Steep slopes" : false,
                   "Sunny slopes" : false,
                   "Convex slopes" : false,
                   "Alpine slopes" : false,
                   "Open trees" : false,
                   "Cut-blocks" : false
                },
                "prompt" : "We stayed away from:"
             },
             "snowConditions" : {
                "prompt" : "Snow conditions were:",
                "options" : {
                   "Crusty" : false,
                   "Wet" : false,
                   "Hard" : false,
                   "Heavy" : false,
                   "Powder" : false,
                   "Deep powder" : true,
                   "Wind affected" : true
                },
                "type" : "multiple"
             }
          },
          "avalancheConditions" : {
             "snow" : false,
             "temp" : false,
             "slab" : true,
             "sound" : true
          },
          "comment" : "TEST POST. DO NOT USE FOR MOUNTAIN TRAVEL."
       }
    })
};

module.exports = {
    get_MIN_payload: get_MIN_payload,
    get_jwt: get_jwt,
}
