import {createSelector} from 'reselect'
import Immutable from 'immutable'
import * as Schemas from 'api/schemas'
import {getEntityForSchema, getEntitiesForSchema} from 'getters/entities'
import {getDocumentsOfType} from 'getters/prismic'
import {computeFitBounds} from 'selectors/map/bounds'
import Parser from 'prismic/parser'
import camelCase from 'lodash/camelCase'
import {isHotZoneReportValid, isReportWithinRange} from 'prismic/utils'
import endOfDay from 'date-fns/end_of_day'
import parse from 'date-fns/parse'

// TODO: Rework to take advantage of the new prismic structure and loading

function getHotZone(state, {params}) {
    return getEntityForSchema(state, Schemas.HotZone, params.name)
}

function getHotZoneReportDocuments(state) {
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
    title: null,
    headline: null,
    dateOfIssue: null,
    validUntil: null,
    dateUpdated: null,
    criticalFactors: {
        recentWindLoading: null,
        persistentAvalancheProblem: null,
        recentRainfall: null,
        slabAvalanches: null,
        recentSnowfall: null,
        instability: null,
        significantWarming: null,
        questions: null,
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
    goodTerrainChoices: null,
    terrainToWatch: null,
    terrainToAvoid: null,
    goodTerrainChoicesComment: null,
    terrainToWatchComment: null,
    terrainToAvoidComment: null,
    terrainAdviceComment: null,
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

    if (!data.has('travelAdvice') && aspect.isEmpty()) {
        return null
    }

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
                k === 'criticalFactorsComments' || k === 'criticalFactorsQuestions' ? v : yesNoUnknownValues.get(v)
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
        images: report.get('hotzoneImages', []).map(image => ({
            ...image.get('hotzoneImage'),
            caption: image.get('caption'),
        })),
    }).toJSON()
}

const getValidHotZoneReport = createSelector(
    (state, props) => props.params,
    getParsedHotZoneReports,
    ({name, uid}, reports) => {
        const filter = typeof uid === 'string' ?
            report => report.uid === uid :
            report => report.region === name && isHotZoneReportValid(report)


        return reports.filter(filter).sortBy(report => report.dateOfIssue).last()
    }
)

const getComputeBounds = createSelector(
    getHotZone,
    computeFitBounds,
    (region, computeBounds) => () => computeBounds(region)
)

const getHotZoneReport = createSelector(
    getHotZone,
    getValidHotZoneReport,
    getComputeBounds,
    // TODO: Remove that isLoading
    (state, props) => props.isLoading,
    (zone, report, computeBounds, isLoading) => {
        const name = zone && zone.get('name')
        const Schema = Schemas.HotZoneReport

        if (report) {
            report = transform(report)
            const {region, uid} = report
            const {key} = Schema

            return {
                title: name,
                report,
                link: `/${key}/${region}`,
                shareUrl: `${window.location.origin}/${key}/${region}/${uid}`,
                computeBounds,
            }
        } else {
            return {
                title: isLoading ? name : name && `No ${name} report is currently available`,
                computeBounds,
            }
        }
    }
)

export function getHotZones(state) {
    return getEntitiesForSchema(state, Schemas.HotZone)
}

function createDateRange(report) {
    return {
        start: report.dateOfIssue,
        end: endOfDay(report.validUntil),
    }
}

export const getHotZoneReportDateRanges = createSelector(
    (state, props) => report => report.region === props.params.name,
    getParsedHotZoneReports,
    (filter, reports) => reports.filter(filter).map(createDateRange).toArray()
)

export default getHotZoneReport

export const getArchiveHotZoneReport = createSelector(
    getHotZone,
    getParsedHotZoneReports,
    (state, props) => {
        const {name} = props.params
        const date = parse(props.params.date, 'YYYY-MM-DD')

        return function find(report) {
            return report.region === name && isReportWithinRange(report, date)
        }
    },
    (zone, reports, finder) => {
        const props = {
            title: zone && zone.get('name')
        }

        if (reports.some(finder)) {
            Object.assign(props, {
                report: transform(reports.find(finder)),
            })
        }

        return props
    }
)
