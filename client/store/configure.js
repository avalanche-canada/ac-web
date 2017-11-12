export default (process.env.NODE_ENV === 'production'
    ? require('./configure/prod').default
    : require('./configure/dev').default)
