const phantomcss = require('phantomcss')
const casper = require('casper').create({
    viewportSize: {
        width: 1024,
        height: 768
    }
})

const paths = [
    // AvCan
    'about',
    'mountain-information-network',
    'mountain-information-network/faq',
    'mountain-information-network/submission-guidelines',
    'mountain-information-network/submissions',
    'events',
    'events/northern-bc-snowmobile-outreach-tour',
    'news',
    'news/albertafunding2017',
    'blogs',
    'blogs/clemina_20161230',
    'forecasts/archives',
    'forecasts',
    'forecasts/purcells',
    'weather/forecast/2017-02-01',
    'weather/hourly-precipitation',
    'weather/12h-precipitation',
    'weather/temperatures',
    'weather/winds',
    'weather/surface-maps',
    'weather/other-maps',
    'weather/radar',
    'weather/satellite',
    'weather/actual-temperatures',
    'weather/warnings',
    'sponsors',
    'collaborators',
    'ambassadors',
    'training',
    'training/providers',
    'training/courses',
    'faq',
    'planning',
    'information',
    'tech',
    'early-season-conditions',
    'instructing-ast',
    'youth',
    'gear',
    'sled',
    'auction',
    'tutoriel',
    'terms-of-use',
    'privacy-policy',
    'trip-planner',
    'incidents',
    'membership',
    // AvCan Foundation
    'foundation',
    'foundation/about',
    'foundation/programs',
    'foundation/donors',
    'foundation/event-sponsors',
    'foundation/news-and-events',
    'foundation/funds',
    'foundation/funds/hugh-and-helen-hincks-memorial',
    'foundation/funds/craig-kelly-memorial-scholarship',
    'foundation/funds/cora-shea-memorial',
    'foundation/funds/al-hodgson-memorial',
    'foundation/funds/issw',
    'foundation/donate',

    'does-not-exist',
]
const hosts = [
    'http://avalanche.ca/',
    'http://avalanche-canada-dev.elasticbeanstalk.com/'
]

phantomcss.init({
    screenshotRoot: './screenshots',
    failedComparisonsRoot: './failures',
})

casper.start()

function take(name, index) {
    console.log(index + 1, 'of', paths.length, '>', name)
    phantomcss.screenshot('body', name)
}

const host = hosts[1]

paths.forEach(function(path, index) {
    casper.thenOpen(host + path)
          .wait(10000, take.bind(null, path, index))
})

casper.then(function() {
    phantomcss.compareAll()
})

casper.run()
