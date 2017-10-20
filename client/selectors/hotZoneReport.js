import { createSelector } from 'reselect'
import * as Schemas from 'api/schemas'
import { getEntityForSchema, getEntitiesForSchema } from 'getters/entities'
import { getDocumentsOfType } from 'getters/prismic'
import { computeFitBounds } from 'selectors/map/bounds'
import { parse } from 'prismic'
import { isHotZoneReportValid, isReportWithinRange } from 'prismic/utils'
import endOfDay from 'date-fns/end_of_day'
import parseDate from 'date-fns/parse'
import upperFirst from 'lodash/upperFirst'

// TODO: Move most of these parsing function to module prismic/parsers

function getHotZone(state, { name }) {
    return getEntityForSchema(state, Schemas.HotZone, name)
}

function getHotZoneReportDocuments(state) {
    return getDocumentsOfType(state, 'hotzone-report')
}

const getParsedHotZoneReports = createSelector(
    getHotZoneReportDocuments,
    documents => documents.map(document => transform(parse(document)))
)

const ASPECTS = {
    E: false,
    W: false,
    SE: false,
    SW: false,
    S: false,
    NW: false,
    N: false,
    NE: false,
}

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

function parseAspects(report, prefix) {
    const keyRegExp = new RegExp(`${prefix}(E|W|Se|Sw|S|Nw|N|Ne)$`)
    function reducer(aspects, key) {
        const aspectKey = key.replace(keyRegExp, (match, key) =>
            key.toUpperCase()
        )

        aspects[aspectKey] = yesNoValues.get(report[key])

        return aspects
    }

    return Object.keys(report).filter(::keyRegExp.test).reduce(reducer, {})
}

function createHotzoneImage(image) {
    return {
        ...image.hotzoneImage,
        caption: image.caption,
    }
}

function parseTerrainFeatures(data, key, suffices) {
    function hasNotSuffix(suffix) {
        return !data.hasOwnProperty(key + upperFirst(suffix))
    }

    if (suffices.every(hasNotSuffix)) {
        return null
    }

    return suffices.reduce((features, suffix) => {
        features[suffix] = yesNoValues.get(data[key + upperFirst(suffix)])

        return features
    }, {})
}

function parseTerrainAvoidance(data, key, suffices) {
    const aspects = parseAspects(data, key)

    if (
        Object.keys(aspects).length === 0 &&
        !data.hasOwnProperty(`${key}TravelAdvice`)
    ) {
        return null
    }

    return {
        aspect: {
            ...ASPECTS,
            ...aspects,
        },
        terrainFeatures: parseTerrainFeatures(data, key, suffices),
        travelAdvice: data[`${key}TravelAdvice`],
    }
}

function transform({ uid, data }) {
    return {
        uid,
        region: data.region,
        title: data.title,
        headline: data.headline,
        dateOfIssue: data.dateOfIssue,
        validUntil: data.validUntil,
        dateUpdated: data.dateUpdated,
        criticalFactors: {
            recentWindLoading: yesNoUnknownValues.get(
                data.criticalFactorsRecentWindLoading
            ),
            persistentAvalancheProblem: yesNoUnknownValues.get(
                data.criticalFactorsPersistentAvalancheProblem
            ),
            recentRainfall: yesNoUnknownValues.get(
                data.criticalFactorsRecentRainfall
            ),
            slabAvalanches: yesNoUnknownValues.get(
                data.criticalFactorsSlabAvalanches
            ),
            recentSnowfall: yesNoUnknownValues.get(
                data.criticalFactorsRecentSnowfall
            ),
            instability: yesNoUnknownValues.get(
                data.criticalFactorsInstability
            ),
            significantWarming: yesNoUnknownValues.get(
                data.criticalFactorsSignificantWarming
            ),
            questions: data.criticalFactorsQuestions,
            comments: data.criticalFactorsComments,
        },
        images: Array.isArray(data.hotzoneImages)
            ? data.hotzoneImages.map(createHotzoneImage)
            : [],
        goodTerrainChoices: data.goodTerrainChoices,
        terrainToWatch: data.terrainToWatch,
        terrainToAvoid: data.terrainToAvoid,
        goodTerrainChoicesComment: data.goodTerrainChoicesComment,
        terrainToWatchComment: data.terrainToWatchComment,
        terrainToAvoidComment: data.terrainToAvoidComment,
        terrainAdviceComment: data.terrainAdviceComment,
        treelineTerrainAvoidance: parseTerrainAvoidance(
            data,
            'treelineTerrainAvoidance',
            [
                'unsupported',
                'leeSlopes',
                'crossloadedSlopes',
                'convex',
                'shallowSnowpack',
                'variableDepthSnowpack',
            ]
        ),
        belowTreelineTerrainAvoidance: parseTerrainAvoidance(
            data,
            'belowTreelineTerrainAvoidance',
            [
                'creeks',
                'unsupported',
                'leeSlopes',
                'convex',
                'cutblocks',
                'runoutZones',
            ]
        ),
        alpineTerrainAvoidance: parseTerrainAvoidance(
            data,
            'alpineTerrainAvoidance',
            [
                'unsupported',
                'leeSlopes',
                'crossloadedSlopes',
                'convex',
                'shallowSnowpack',
                'variableDepthSnowpack',
            ]
        ),
    }
}

const getValidHotZoneReport = createSelector(
    (state, props) => props.name,
    (state, props) => props.uid,
    getParsedHotZoneReports,
    (name, uid, reports) => {
        const filter =
            typeof uid === 'string'
                ? report => report.uid === uid
                : report =>
                      report.region === name && isHotZoneReportValid(report)

        return reports
            .filter(filter)
            .sortBy(report => report.dateOfIssue)
            .last()
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
    (state, props) => props.name,
    (zone, report, computeBounds, isLoading, region) => {
        const name = zone && zone.get('name')
        const Schema = Schemas.HotZoneReport

        if (report) {
            const { region, uid } = report
            const { key } = Schema

            return {
                region,
                title: name,
                report,
                link: `/${key}/${region}`,
                shareUrl: `${window.location.origin}/${key}/${region}/${uid}`,
                computeBounds,
            }
        } else {
            return {
                region,
                title: isLoading
                    ? name
                    : name && `No ${name} report is currently available`,
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
    (state, props) => props.name,
    getParsedHotZoneReports,
    (name, reports) =>
        reports
            .filter(report => report.region === name)
            .map(createDateRange)
            .toArray()
)

export default getHotZoneReport

export const getArchiveHotZoneReport = createSelector(
    getHotZone,
    getParsedHotZoneReports,
    (state, props) => {
        const { name } = props
        const date = parseDate(props.date, 'YYYY-MM-DD')

        return function find(report) {
            return report.region === name && isReportWithinRange(report, date)
        }
    },
    (zone, reports, finder) => {
        const props = {
            title: zone && zone.get('name'),
        }

        if (reports.some(finder)) {
            Object.assign(props, {
                report: reports.find(finder),
            })
        }

        return props
    }
)
