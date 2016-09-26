
var express = require('express');
var prerender = require('prerender-node');
var _ = require('lodash');
var Prismic = require('prismic.io');
var predicates = Prismic.Predicates

var getForecastData = require('../api/forecasts').getForecastData;
var forecastRegions = require('../api/forecasts/forecast-regions');

var prerenderRouter = express.Router();
var get = function get(route, handler){ prerenderRouter.get(route, prerenderGuard(handler)); }

get('/map/forecasts/:region', forecastPage);
get('/forecasts/:region',     forecastPage);
get('/forecasts/:region/archives/:date', forecastPage)


get('/map', tags([['og:title',       'Avalanche Canada'],
                  ['og:description', 'Get the latest avalanche forecast'],
                  ['og:image',       'http://res.cloudinary.com/avalanche-ca/image/upload/bo_20px_solid_rgb:fff,c_pad,h_315,w_600/v1413919754/logos/avalanche_canada_left_quqmls.jpg']]));


get('/blogs', tags([['og:title',       'Avalanche Canada Blogs'],
                  ['og:description', 'Stay up to date'],
                  ['og:image',       'http://res.cloudinary.com/avalanche-ca/image/upload/bo_20px_solid_rgb:fff,c_pad,h_315,w_600/v1413919754/logos/avalanche_canada_left_quqmls.jpg']]));

get('/blogs', tags([['og:title',     'Avalanche Canada News'],
                  ['og:description', 'Stay up to date'],
                  ['og:image',       'http://res.cloudinary.com/avalanche-ca/image/upload/bo_20px_solid_rgb:fff,c_pad,h_315,w_600/v1413919754/logos/avalanche_canada_left_quqmls.jpg']]));


get('/blogs/:uid', blogPost);
get('/news/:uid',  newsPost);

//TODO(wnh): add all static pages here stuff
get('/membership',  staticPage('membership-overview'));
get('/youth',       staticPage('youth'));


// FALLBACK
get('*', tags([['og:title',       'Avalanche Canada'],
               ['og:description', 'Get the latest avalanche forecast'],
               ['og:image',       'http://res.cloudinary.com/avalanche-ca/image/upload/bo_20px_solid_rgb:fff,c_pad,h_315,w_600/v1413919754/logos/avalanche_canada_left_quqmls.jpg']]));

function prerenderGuard(fn){
    return function(req, res, next) {
        if(!prerender.shouldShowPrerenderedPage(req)) {
            return next();
        } else {
            console.log('Showing Prerender...');
            fn(req,res,next);
        }
    }
}

function tags(tags){
    var out = renderTags(tags);
    return function (req, res){
        res.status(200).send(out);
    }
}


function renderTags(tags) {
    var tpl = ['<html><head>'];
    tags.push(['twitter:card',   'summary_large_image'], 
              ['twitter:site',   '@avalancheca']);
    _.each(tags, function(i) { tpl.push('<meta property="', i[0], '" content="', i[1], '" />')});
    tpl.push('</head><body></body></head>');
    return tpl.join('');
}

function forecastPage(req,res) {
    var region = _.find(forecastRegions.features, {id: req.params.region});
    if(!region){
        res.status(404).send('NOT FOUND');
    }
    getForecastData(req.params.region, region)
        .then((data) => {
            console.log(JSON.stringify(data.json, null, '  '));
            var out = renderTags([
                ['og:title', 'Latest forecast for ' + data.json.bulletinTitle],
                ['og:description',  cleanHTML(data.json.highlights)],
            ]);
            res.status(200).send(out)
        });
}

function cleanHTML(txt) {
    return txt.replace(/\n/g, '')
        .replace(/.*<\/style>/m, '')
        .replace(/<.*?>/g, '')
}


function prismicQuery(query, options, cb) {
    Prismic.api("https://avalancheca.prismic.io/api", function(err, api){
        if(err){ 
            cb(err); 
        }
        api.query(query, options, function(err, docs) {
            if(err){ 
                cb(err);
            }
            cb(null, docs);
        });
    });
}

function staticPage(uid) {
    return function(req, res) {
        prismicQuery(predicates.at('my.static-page.uid', uid), {}, function(err, docs){
            if(err){ 
                console.error(err);
                return res.status(500).send('<html><body>Error</body></html>');
            }
            var doc = docs.results[0].data;
            var title = doc['static-page.title'];
            var headline = doc['static-page.headline'];
            var banner = doc['static-page.banner'];

            //TODO(wnh): Remove full tag if value doesnt exist
            res.status(200).send(renderTags([
                ['og:title',       title && title.value],
                ['og:description', headline && headline.value],
                ['og:image',       banner && banner.value.main.url],
            ]));
        });
    }
}

function singleItem(query, opts, cb) {
    prismicQuery(query, opts, function(err, data){
        if(err){ 
            console.error(err);
            return res.status(500).send('<html><body>Error</body></html>');
        } else if(data.results_size !== 1) {
            return res.status(404).send('<html><body>Not Found</body></html>');
        }
        cb(data.results[0]);
    });
}
function newsPost(req, res) {
    singleItem(predicates.at('my.news.uid', req.params.uid), {}, function(doc){

        var title    = doc.getText('news.title');
        var headline = doc.getText('news.shortlede');
        var img      = doc.getImage('news.featured_image');

        res.status(200).send(renderTags([
            ['og:title',       title],
            ['og:description', headline],
            ['og:image',       img && img.url],
        ]));
    })
}
function blogPost(req, res) {
    singleItem(predicates.at('my.blog.uid', req.params.uid), {}, function(doc){
        var title    = doc.getText('blog.title');
        var headline = doc.getText('blog.shortlede');
        var img      = doc.getImage('blog.preview_image');

        res.status(200).send(renderTags([
            ['og:title',       title],
            ['og:description', headline],
            ['og:image',       img && img.url],
        ]));
    })
}

function prismicGetByUid(uid) {
}
module.exports = prerenderRouter

