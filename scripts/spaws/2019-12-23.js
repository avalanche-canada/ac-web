const USENAME = 'avalanchecanada'
const ACCESS_TOKEN =
    'pk.eyJ1IjoiYXZhbGFuY2hlY2FuYWRhIiwiYSI6ImNqd2dvZmUxdzE4ZWg0M2tkaXpuNG95aTQifQ.pBLM87fE3sIxRJqJT7Bf7g'

const API = 'https://api.mapbox.com'

const styleId = 'ciy4r3jhm001f2rn4nyg6gluw'
const longitude = -119.5
const latitude = 50.85
const zoom = 5.7
const width = 1200
const height = 800

console.log(
    `${API}/styles/v1/${USENAME}/${styleId}/static/${longitude},${latitude},${zoom}/${width}x${height}@2x?access_token=${ACCESS_TOKEN}`
)
// console.log(
//     `https://API.mapbox.com/styles/v1/${USENAME}/${styleId}/sprite@2x?access_token=${ACCESS_TOKEN}`
// )

//     'banff-yoho-kootenay'
//     'kananaskis'
//     'lizard-range'
//     'purcells'
//     'sea-to-sky'
//     'south-coast-inland'
//     'south-rockies'
