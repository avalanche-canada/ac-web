var request = require('request');
var Q = require('q');
var logger = require('../../logger');


function fetchAvalx2016(region_id) {
    var url = "http://avalx2016.avalanche.ca/public/CAAML-eng.aspx?r=" + region_id;
    return doFetch(url);
}

function fetchAvalx2019(region_id) {
    var url = "http://avalx2019.avalanche.ca/public/CAAML-eng.aspx?r=" + region_id;
    return doFetch(url);
    
}

function fetchParks(region_id) {
    var url = "http://avalanche.pc.gc.ca/CAAML-eng.aspx?d=TODAY&r=" + region_id;
    return doFetch(url);
}


function doFetch(url) {
    var options = {
        uri: url,
        headers: {
            'cache-control': 'no-cache',
        },
        timeout: 300000,
    }

    logger.debug('doFetch url=%s', url)
    return Q.Promise(function(resolve, reject, notify) {
        request(options, function(error, response, data){
            if (!error && response.statusCode == 200) {
                logger.debug('doFetch success url=%s', url);
                resolve(data);
            } else {
                logger.error(
                    'doFetch request_error url=%s responseCode=%d',
                    url,
                    response.statusCode
                );
                reject(error);
            }
        });

    });
}

module.exports = {
    fetchAvalx2019:fetchAvalx2019,
    fetchAvalx2016:fetchAvalx2016,
    fetchParks:fetchParks,
}
