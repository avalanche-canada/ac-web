let configure = null

if (process.env.NODE_ENV === 'production') {
    configure = require('./configure/prod')
} else {
    configure = require('./configure/dev')
}

export default configure.default
