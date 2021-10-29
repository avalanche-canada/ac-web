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
    var url = "https://avid-api.avalanche.ca/v1/public/en/products"
    //var url = "https://avid-beta-api.avalanche.ca/v1/public/en/products"

    return doFetch(url);
}


function fetchAvidKananaskis() {
    var url = "https://avid-kananaskis-api.avalanche.ca/v1/public/en/products"

    return doFetch(url);
}

function fetchAvidAvalancheQuebec() {
    var url = "https://avid-avq-api.avalanche.ca/v1/public/en/products"

    return doFetch(url);
}

function filterAvidByLocation(location_id) {
    return function(avid_product_list) {
        // This is a string because it is the only common format between XML and JSON
        avid_product_list = JSON.parse(avid_product_list);
        
        var product = avid_product_list.find(function(product) {
            return (product.areaId === location_id);
        });
        avid_product_list = avid_product_list.filter(function(product) {
            return product.productType === 'forecast' || product.productType === 'offseason'
        });


        if (!product) {
            throw new Error('No product available for location=' + location_id);
        }
        
        if (product.productType === 'forecast' || product.productType === 'offseason') {
            return product;
        }
        
        throw new Error('Incorrect product type for location=' + location_id + ' productType=' + product.productType);
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
                // TODO Create a custom error type that contains the 
                //      whole resposne. Useful later if we would like 
                //      access to headers or other, more specific data
                reject(new Error('doFetch request_error url=' + url+ ' responseCode=' + response.statusCode));
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
    fetchAvidKananaskis:fetchAvidKananaskis,
    fetchAvidAvalancheQuebec:fetchAvidAvalancheQuebec,
    filterAvidByLocation:filterAvidByLocation,
}
