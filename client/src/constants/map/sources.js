import * as Schemas from 'api/schemas'
import * as Layers from 'constants/drawers'
import turf from 'turf-helpers'
import Parser from 'prismic/parser'

function createSource(source = {}) {
    const {features = [], ...props} = source

    return {
        ...props,
        type: 'geojson',
        data: turf.featureCollection(features),
    }
}

export const Transformers = new Map([
    [Layers.MOUNTAIN_INFORMATION_NETWORK, days => submission => {
        const [lat, lng] = submission.latlng
        const types = submission.obs.map(ob => ob.obtype)

        return turf.point([lng, lat], {
            id: submission.subid,
            ...types.reduce((types, type) => ({...types, [type]: true}), {}),
            [String(days)]: true,
            icon: types.includes('incident') ? 'min-pin-with-incident' : 'min-pin',
            title: submission.title,
        })
    }],
    [Layers.WEATHER_STATION, station => {
        return turf.point([station.longitude, station.latitude], {
            title: station.name,
            id: station[Schemas.WeatherStation.getIdAttribute()],
        })
    }],
    [Layers.TOYOTA_TRUCK_REPORTS, document => {
        const report = Parser.parse(document)
        const {uid, position: {longitude, latitude}, headline} = report

        return turf.point([longitude, latitude], {
            title: headline,
            id: uid,
        })
    }],
    [Layers.HOT_ZONE_REPORTS, reports => area => {
        return {
            ...area,
            properties: {
                ...area.properties,
                active: Number(!!reports[area.properties.id]),
            }
        }
    }]
])

export default {
    // TODO: Remove when https://github.com/mapbox/mapbox-gl-js/issues/2613 gets resolved
    [`all-${Layers.MOUNTAIN_INFORMATION_NETWORK}`]: createSource(),
    [Layers.MOUNTAIN_INFORMATION_NETWORK]: createSource({
        cluster: true,
        clusterMaxZoom: 14,
    }),
    [Layers.WEATHER_STATION]: createSource({
        cluster: true,
    }),
    [Layers.TOYOTA_TRUCK_REPORTS]: createSource(),
}
