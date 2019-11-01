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

function fetchAvid() {
    //var url = "http://localhost:9000/v1/public/en/products"
    // var url = 'http://localhost:9000/v1/public/en/products?date=2019-11-01T00:00:00-08:00'
    var url = "http://avid-beta.avalanche.ca/v1/public/en/products"
    return doFetch(url);
}

function filterAvidByLocation(location_id) {
    return function(avid_product_list) {
        avid_product_list = JSON.parse(avid_product_list);
        return avid_product_list.find(function(product) {
            return (product.areaId === location_id);
        });
    }
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
    return Q.Promise(function(resolve, reject, _notify) {
        request(options, function(error, response, data){
            if (error){
                logger.error(
                    'doFetch fetch_error url=%s',
                    url,
                    error
                );
                reject(error);
            } else if (response.statusCode != 200) {
                logger.error(
                    'doFetch request_error url=%s responseCode=%d',
                    url,
                    response.statusCode
                );
                reject(response);
            } else {
                logger.debug('doFetch success url=%s', url);
                resolve(data);
            }
        });

    });
}

module.exports = {
    fetchAvalx2019:fetchAvalx2019,
    fetchAvalx2016:fetchAvalx2016,
    fetchParks:fetchParks,
    doFetch:doFetch,
    fetchAvid:fetchAvid,
    filterAvidByLocation:filterAvidByLocation,
}
