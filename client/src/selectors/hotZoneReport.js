import {createSelector} from 'reselect'
import Immutable from 'immutable'
import * as Schemas from 'api/schemas'
import {getEntityForSchema} from 'getters/entities'
import {getDocumentsOfType, getIsFetching} from 'getters/prismic'
import {getResultsSet} from 'reducers/api/getters'
import {RESULT} from 'reducers/api/results'
import {computeFitBounds} from 'selectors/map/bounds'
import Parser from 'prismic/parser'
import camelCase from 'lodash/camelCase'
import {isHotZoneReportValid} from 'prismic/utils'

function getHotZone(state, {params}) {
    return getEntityForSchema(state, Schemas.HotZone, params.name)
}

function getHotZoneReportDocuments(state, {params}) {
    return getDocumentsOfType(state, 'hotzone-report')
}

const getParsedHotZoneReports = createSelector(
    getHotZoneReportDocuments,
    documents => documents.map(document => Parser.parse(document))
)

const ASPECT = new Immutable.Map({
    E: false,
    W: false,
    SE: false,
    SW: false,
    S: false,
    NW: false,
    N: false,
    NE: false,
})

const HotZoneReport = Immutable.fromJS({
    uid: null,
    region: null,
    headline: null,
    dateOfIssue: null,
    validUntil: null,
    criticalFactors: {
        recentWindLoading: null,
        persistentAvalancheProblem: null,
        recentRainfall: null,
        slabAvalanches: null,
        recentSnowfall: null,
        instability: null,
        significantWarming: null,
        comments: null,
    },
    treelineTerrainAvoidance: {
        aspect: ASPECT.toObject(),
        terrainFeatures: {
            unsupported: false,
            leeSlopes: false,
            crossloadedSlopes: false,
            convex: false,
            shallowSnowpack: false,
            variableDepthSnowpack: false,
        },
        travelAdvice: null,
    },
    belowTreelineTerrainAvoidance: {
        aspect: ASPECT.toObject(),
        terrainFeatures: {
            creeks: false,
            unsupported: false,
            leeSlopes: false,
            convex: false,
            cutblocks: false,
            runoutZones: false,
        },
        travelAdvice: null,
    },
    alpineTerrainAvoidance: {
        aspect: ASPECT.toObject(),
        terrainFeatures: {
            unsupported: false,
            leeSlopes: false,
            crossloadedSlopes: false,
            convex: false,
            shallowSnowpack: false,
            variableDepthSnowpack: false,
        },
        travelAdvice: null,
    },
    images: [],
})

const yesNoValues = new Map([
    ['Yes', true],
    ['No', false],
    ['', false],
    [null, false],
    [undefined, false],
])
const yesNoUnknownValues = new Map([
    ['Yes', true],
    ['No', false],
    ['', null],
    [null, null],
    [undefined, null],
])
function extractTerrainAvoidance(report, prefix) {
    prefix = `${prefix}TerrainAvoidance`
    const prefixRegExp = new RegExp(`^${prefix}`)
    const data = report.filter((v, k) => prefixRegExp.test(k))
                       .mapKeys(k => camelCase(k.replace(prefixRegExp, '')))
    const aspect = data.mapKeys(k => k.toUpperCase())
                       .filter((v, k) => ASPECT.has(k))
                       .map(v => yesNoValues.get(v))
    const terrainFeatures = HotZoneReport.getIn([prefix, 'terrainFeatures'])
                                 .map((v, k) => yesNoValues.get(data.get(k)))
    return {
        aspect: ASPECT.merge(aspect),
        travelAdvice: data.get('travelAdvice'),
        terrainFeatures,
    }
}
function extractCriticalFactors(report) {
    const regExp = /^criticalFactors/
    const criticalFactors = report.filter((v, k) => regExp.test(k))
            .mapEntries(([k, v]) => [
                camelCase(k.replace(regExp, '')),
                k === 'criticalFactorsComments' ? v : yesNoUnknownValues.get(v)
            ])

    return HotZoneReport.get('criticalFactors').map((v, k) =>
        criticalFactors.get(k, yesNoUnknownValues.get(v))
    )
}
function transform(raw) {
    const report = Immutable.fromJS(raw)

    return HotZoneReport.map((v, k) => raw[k]).merge({
        criticalFactors: extractCriticalFactors(report),
        treelineTerrainAvoidance: extractTerrainAvoidance(report, 'treeline'),
        belowTreelineTerrainAvoidance: extractTerrainAvoidance(report, 'belowTreeline'),
        alpineTerrainAvoidance: extractTerrainAvoidance(report, 'alpine'),
        images: report.get('hotzoneImages', []).map(image => image.get('hotzoneImage')),
    }).toJSON()
}

const getHotZoneReport = createSelector(
    (state, props) => props.params,
    getParsedHotZoneReports,
    ({name, uid}, reports) => {
        const finder = typeof uid === 'string' ?
            report => report.uid === uid :
            report => report.region === name && isHotZoneReportValid(report)

        return reports.find(finder)
    }
)

const getComputeBounds = createSelector(
    getHotZone,
    computeFitBounds,
    (region, computeBounds) => () => computeBounds(region)
)

export default createSelector(
    getHotZone,
    getHotZoneReport,
    getComputeBounds,
    (state, props) => props.isLoading,
    (zone, report, computeBounds, isLoading) => {
        const name = zone && zone.get('name')
        const Schema = Schemas.HotZoneReport

        if (report) {
            report = transform(report)
            const {region, uid} = report

            return {
                title: name,
                report,
                link: `/${Schema.getKey()}/${region}`,
                shareUrl: `${window.location.origin}/${Schema.getKey()}/${region}/${uid}`,
                computeBounds,
            }
        } else {
            return {
                title: isLoading ? name : name && `${name} report is not available`,
                computeBounds,
            }
        }
    }
)
