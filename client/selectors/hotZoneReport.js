import { createSelector } from 'reselect'
import * as Schemas from '~/api/schemas'
import { getEntityForSchema, getEntitiesForSchema } from '~/getters/entities'
import { getDocumentsOfType } from '~/getters/prismic'
import { computeFitBounds } from '~/selectors/map/bounds'
import { parse } from '~/prismic'
import { parseData } from '~/prismic/parsers'
import { isHotZoneReportValid, isReportWithinRange } from '~/prismic/utils'
import endOfDay from 'date-fns/end_of_day'
import parseDate from 'date-fns/parse'

function getHotZone(state, { params }) {
    return getEntityForSchema(state, Schemas.HotZone, params.name)
}

function getHotZoneReportDocuments(state) {
    return getDocumentsOfType(state, 'hotzone-report')
}

const getParsedHotZoneReports = createSelector(
    getHotZoneReportDocuments,
    documents => documents.map(document => parse(document)).map(transform)
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

function parseFeatures(features = []) {
    return features.map(features => parseData(features))
}

function mergeAspects(report, prefix) {
    const keyRegExp = new RegExp(`${prefix}(E|W|Se|Sw|S|Nw|N|Ne)$`)
    function reducer(aspects, key) {
        const aspectKey = key.replace(keyRegExp, (match, key) =>
            key.toUpperCase()
        )

        aspects[aspectKey] = yesNoValues.get(report[key])

        return aspects
    }

    return {
        ...ASPECTS,
        ...Object.keys(report).filter(::keyRegExp.test).reduce(reducer, {}),
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
        treelineTerrainAvoidance: {
            aspect: mergeAspects(data, 'treelineTerrainAvoidance'),
            terrainFeatures: {
                unsupported: yesNoValues.get(
                    data.treelineTerrainAvoidanceUnsupported
                ),
                leeSlopes: yesNoValues.get(
                    data.treelineTerrainAvoidanceLeeSlopes
                ),
                crossloadedSlopes: yesNoValues.get(
                    data.treelineTerrainAvoidanceCrossloadedSlopes
                ),
                convex: yesNoValues.get(data.treelineTerrainAvoidanceConvex),
                shallowSnowpack: yesNoValues.get(
                    data.treelineTerrainAvoidanceShallowSnowpack
                ),
                variableDepthSnowpack: yesNoValues.get(
                    data.treelineTerrainAvoidanceVariableDepthSnowpack
                ),
            },
            travelAdvice: data.treelineTerrainAvoidanceTravelAdvice,
        },
        belowTreelineTerrainAvoidance: {
            aspect: mergeAspects(data, 'belowTreelineTerrainAvoidance'),
            terrainFeatures: {
                creeks: yesNoValues.get(
                    data.belowTreelineTerrainAvoidanceCreeks
                ),
                unsupported: yesNoValues.get(
                    data.belowTreelineTerrainAvoidanceUnsupported
                ),
                leeSlopes: yesNoValues.get(
                    data.belowTreelineTerrainAvoidanceLeeSlopes
                ),
                convex: yesNoValues.get(
                    data.belowTreelineTerrainAvoidanceConvex
                ),
                cutblocks: yesNoValues.get(
                    data.belowTreelineTerrainAvoidanceCutblocks
                ),
                runoutZones: yesNoValues.get(
                    data.belowTreelineTerrainAvoidanceRunoutZones
                ),
            },
            travelAdvice: data.belowTreelineTerrainAvoidanceTravelAdvice,
        },
        alpineTerrainAvoidance: {
            aspect: mergeAspects(data, 'alpineTerrainAvoidance'),
            terrainFeatures: {
                unsupported: yesNoValues.get(
                    data.alpineTerrainAvoidanceUnsupported
                ),
                leeSlopes: yesNoValues.get(
                    data.alpineTerrainAvoidanceLeeSlopes
                ),
                crossloadedSlopes: yesNoValues.get(
                    data.alpineTerrainAvoidanceCrossloadedSlopes
                ),
                convex: yesNoValues.get(data.alpineTerrainAvoidanceConvex),
                shallowSnowpack: yesNoValues.get(
                    data.alpineTerrainAvoidanceShallowSnowpack
                ),
                variableDepthSnowpack: yesNoValues.get(
                    data.alpineTerrainAvoidanceVariableDepthSnowpack
                ),
            },
            travelAdvice: data.alpineTerrainAvoidanceTravelAdvice,
        },
        images: Array.isArray(data.hotzoneImages)
            ? data.hotzoneImages.map(image => ({...image.hotzoneImage, caption: image.caption})) : [],
        goodTerrainChoices: parseFeatures(data.goodTerrainChoices),
        terrainToWatch: parseFeatures(data.terrainToWatch),
        terrainToAvoid: parseFeatures(data.terrainToAvoid),
        goodTerrainChoicesComment: data.goodTerrainChoicesComment,
        terrainToWatchComment: data.terrainToWatchComment,
        terrainToAvoidComment: data.terrainToAvoidComment,
        terrainAdviceComment: data.terrainAdviceComment,
    }
}

const getValidHotZoneReport = createSelector(
    (state, props) => props.params.name,
    (state, props) => props.params.uid,
    getParsedHotZoneReports,
    (name, uid, reports) => {
        const filter = typeof uid === 'string'
            ? report => report.uid === uid
            : report => report.region === name && isHotZoneReportValid(report)

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
    (state, props) => props.params.name,
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
    (state, props) => props.params.name,
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
        const { name } = props.params
        const date = parseDate(props.params.date, 'YYYY-MM-DD')

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
