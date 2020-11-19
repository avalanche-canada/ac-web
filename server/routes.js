'use strict'

const fs = require('fs')
const logger = require('./logger.js')
const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')
const jwksRsa = require('jwks-rsa')
const Raven = require('raven')

const config = require('./config/environment')

var useRaven = false
if (config.SENTRY_DSN) {
    Raven.config(config.SENTRY_DSN).install()
    useRaven = true
}

const jwksSecret = jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    strictSsl: true,
    jwksUri: 'https://avalancheca.auth0.com/.well-known/jwks.json',
})

const OLD_SECRET = new Buffer(config.AUTH0_CLIENT_SECRET, 'base64')

function secretProvider(req, header, payload, cb) {
    if (header.alg === 'RS256') {
        logger.info('secretProfider', 'got RS256')
        return jwksSecret(req, header, payload, cb)
    } else if (header.alg === 'HS256') {
        logger.info('secretProfider', 'got HS256')
        return cb(null, OLD_SECRET)
    } else {
        logger.error('unknown jwt algorithm:', header.alg)
        cb(new Error('UNABLE TO DO ANYTHING WITH algorithm: ' + header.alg))
    }
}

var apiAuth = expressJwt({
    secret: secretProvider,
    algorithms: ['RS256', 'HS256'],
}).unless({ method: ['GET', 'HEAD'] })

module.exports = function(app) {
    var env = app.get('env')

    var shareRouter = require('./share')

    app.use(shareRouter)

    app.use('/', require('./favicon'))
    app.use('/api', apiAuth)

    app.use('/api/mobile', require('./api/mobile'))
    app.use('/api/docs', require('./api/docs'))
    app.use('/api/features', require('./api/features/routes'))
    app.use('/api/forecasts', require('./api/forecasts').router)
    app.use('/api/bulletin-archive', require('./api/bulletin_archive'))
    app.use('/api/min', require('./api/observations'))
    app.use('/api/mcr', require('./api/mcr'))
    app.use('/api/ates', require('./api/ates'))
    app.use('/vendor/cloudinary/', require('./api/proxy'))

    app.use('/basic-html', require('./mobile'))
    app.use('/schema', require('./schema/handlers'))
    app.use('/api/static', require('./static'))

    //! Error middle ware \todo make this better and inc better logging (winston)
    app.use(function(err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            logger.warn(
                'UnauthorizedError',
                req.method,
                req.path,
                req.params,
                '--',
                err.code + ':',
                err.message
            )

            var auth = req.get('Authorization')
            if (typeof auth !== 'undefined') {
                //logger.warn('Token=' + auth);
                logger.warn(
                    'Token=' +
                        JSON.stringify(
                            jwt.decode(auth.slice(7), { complete: true }),
                            null,
                            2
                        )
                )
            }

            res.status(401).send('UnauthorizedError')
        } else if (err.name === 'URIError') {
            //TODO(wnh): Make this a 404? Not sure why utf-8 fails to decode
            res.status(err.status).send('Bad URI')
        } else {
            if (useRaven) {
                Raven.captureException(err, { request: req })
            }
            if (typeof err.stack !== 'undefined') {
                logger.error(
                    'UNHANDLED path="%s"',
                    req.path,
                    JSON.stringify(err.stack)
                )
            } else {
                logger.error('UNHANDLED path="%s"', req.path, err)
            }
            res.status(500).send('An Error occured on the server.')
        }
    })
}
