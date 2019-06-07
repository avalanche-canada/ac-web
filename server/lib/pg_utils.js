var url = require('url');
var querystring = require('querystring');


function configFromUrl(urlString) {
    const db_params = url.parse(urlString);
    const db_auth = db_params.auth.split(':');

    var db_use_ssl = true;
    if (db_params.search) {
        const db_opts = querystring.parse(db_params.search.slice(1));
        if (db_opts.use_ssl === 'false') {
            db_use_ssl = false;
        }
    }

    const db_config = {
        user: db_auth[0],
        password: db_auth[1],
        host: db_params.hostname,
        port: db_params.port,
        database: db_params.pathname.split('/')[1],
        ssl: db_use_ssl,
    };

    return db_config;
}


module.exports = {
    configFromUrl: configFromUrl,
};
