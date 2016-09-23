
var express = require('express');
var prerender = require('prerender-node');
var _ = require('lodash');
var Prismic = require('prismic.io');
var predicates = Prismic.Predicates

var prerenderRouter = express.Router();
var get = function get(route, handler){ prerenderRouter.get(route, prerenderGuard(handler)); }

get('/map', tags([['og:title',       'Avalanche Canada'],
                  ['og:description', 'Get the latest avalanche forecast'],
                  ['og:image',       'http://res.cloudinary.com/avalanche-ca/image/upload/bo_20px_solid_rgb:fff,c_pad,h_315,w_600/v1413919754/logos/avalanche_canada_left_quqmls.jpg']]));

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
            fn(res,res,next);
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

function staticPage(uid) {
    return function(req, res) {
        Prismic.api("https://avalancheca.prismic.io/api", function(err, api){
            if(err){ 
                console.error(err);
                return res.status(500).send('<html><body>Error</body></html>');
            }

            api.query(predicates.at('my.static-page.uid', uid), {}, function(err, docs) {
                if(err){ 
                    console.error(err);
                    return res.status(500).send('<html><body>Error</body></html>');
                }

                var doc = docs.results[0].data;
                var title = doc['static-page.title'];
                var headline = doc['static-page.headline'];
                var banner = doc['static-page.banner'];

                console.log(doc)
                res.status(200).send(renderTags([
                    ['og:title',       title && title.value],
                    ['og:description', headline && headline.value],
                    ['og:image',       banner && banner.value.main.url],
                ]));
            });
        });
    }
}


function prismicGetByUid(uid) {
}

module.exports = prerenderRouter

