var request = require('request');
var fs      = require('fs');

var common = require('./MIN_common')



var form = common.get_MIN_payload({
    title: "Photo with random data",
    files: [
        fs.createReadStream(__dirname + '/broken/random_data.jpg'),
    ]
});

var signature = common.get_jwt();
var headers = {'Authorization': 'Bearer ' + signature};
console.log('Posting form');
request.post({url:'http://localhost:9000/api/min/submissions',  formData: form, headers: headers }, function(err, resp, body) {
    if(err) {
        console.log('Error:', err.message)
        return;
    }
    console.log('Server resp: ' + resp.statusCode);
    if (resp.statusCode == 201) {
        var ret = JSON.parse(body);
        console.log('Location: http://localhost:9000/mountain-information-network/submissions/' + ret.subid);
    } else if (resp.statusCode == 500) {
        console.error(body);
    }
});
