const {
    api,
    accessToken,
    username,
} = require('../../client/services/mapbox/config.json')

const styleId = 'ciy4r3jhm001f2rn4nyg6gluw'
const longitude = -124.5
const latitude = 50
const zoom = 6.5
const width = 1200
const height = 800

console.log(
    `${api}/styles/v1/${username}/${styleId}/static/${longitude},${latitude},${zoom}/${width}x${height}@2x?access_token=${accessToken}`
)

// console.log(
//     `https://api.mapbox.com/styles/v1/${username}/${styleId}/sprite@2x?access_token=${accessToken}`
// )
