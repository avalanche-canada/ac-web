import {createSelector} from 'reselect'
import {MountainInformationNetworkSubmission} from 'api/schemas'
import {getEntityForSchema} from 'getters/entities'
import {getResultsSet} from 'reducers/api/getters'
import {computeOffset} from 'selectors/map/bounds'

export function getId({location, params}) {
    if (location && location.query.panel) {
        return location.query.panel.split('/')[1]
    }

    return params.id
}

function getParams(props) {
    return {
        id: getId(props)
    }
}

function getSubmission(state, props) {
    const id = getId(props)

    return getEntityForSchema(state, MountainInformationNetworkSubmission, id)
}

function getSubmissionResultsSet(state, props) {
    const params = getParams(props)

    return getResultsSet(state, MountainInformationNetworkSubmission, params)

}

const getComputeFlyTo = createSelector(
    getSubmission,
    computeOffset,
    (submission, computeOffset) => () => ({
        center: submission.get('latlng').map(Number).reverse().toArray(),
        zoom: 13,
        offset: computeOffset(),
    })
)

export default createSelector(
    (state, props) => getId(props),
    getSubmission,
    getSubmissionResultsSet,
    getComputeFlyTo,
    (id, submission, result, computeFlyTo) => {
        const props = {
            isLoading: result.isFetching,
            isError: result.isError,
            isLoaded: result.isLoaded,
            link: `/mountain-information-network/submissions/${id}`,
            title: 'Loading...',
            messages: {
                error: 'An error occured while loading the Mountain Information Network submission.',
                loading: 'Loading Mountain Information Network submission...',
            },
            computeFlyTo,
        }

        if (submission) {
            const {title, user, datetime, obtype, obs, uploads, latlng} = submission.toJSON()

            return {
                ...props,
                title,
                metadata: {
                    submittedOn: datetime,
                    submittedBy: user,
                    latitude: Number(latlng[0]),
                    longitude: Number(latlng[1]),
                    submissionId: id,
                },
                props: {
                    observations: obs,
                    active: obtype,
                    uploads: uploads,
                },
            }
        } else {
            return props
        }
    }
)
