var path = require('path');

module.exports = {
    AC_API_ROOT_URL:      'https://avalanche.ca',
    ROOT:                 path.normalize(__dirname + '/../..'),
    ENV:                  process.env.NODE_ENV,
    LOG_PREFIX:           process.env.LOG_PREFIX,
    PORT:                 process.env.PORT || 9000,
    AC_MCR_HOST:          process.env.AC_MCR_HOST,
    AC_SEASON:            process.env.AC_SEASON || '2015',
    ARCHIVE_DBURL:        process.env.ARCHIVE_DBURL,
    AUTH0_CLIENT_SECRET:  process.env.AUTH0_CLIENT_SECRET,
    AVALX2016_ENDPOINT:   process.env.AVALX2016_ENDPOINT || 'http://avalx2016.avalanche.ca/public/CAAML-eng.aspx',
    BULLETIN_ARCHIVE_DB:  process.env.BULLETIN_ARCHIVE_DB,
    CLOUDINARY_AUTH:      process.env.CLOUDINARY_AUTH,
    MCR_LIMIT_DAYS:       process.env.MCR_LIMIT_DAYS || 7,
    OBS_TABLE:            process.env.MINSUB_DYNAMODB_TABLE,
    REDIS_HOST:           process.env.REDIS_HOST,
    SENTRY_DSN:           process.env.SENTRY_DSN,
    UPLOADS_BUCKET:       process.env.UPLOADS_BUCKET || 'ac-user-uploads',
}
