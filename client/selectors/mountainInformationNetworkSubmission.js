import {createSelector} from 'reselect'
import {MountainInformationNetworkSubmission as Schema} from '~/api/schemas'
import {getEntityForSchema} from '~/getters/entities'
import {getResultsSet} from '~/getters/api'
import {computeOffset} from '~/selectors/map/bounds'

// TODO: Try to remove the need for that function
export function getId({id, params}) {
    return id || params.id
}

function getSubmission(state, props) {
    const id = getId(props)

    return getEntityForSchema(state, Schema, id)
}

function getSubmissionResultsSet(state, props) {
    const id = getId(props)

    return getResultsSet(state, Schema, {id})
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
            id,
            isLoading: result.isFetching,
            isError: result.isError,
            isLoaded: result.isLoaded,
            link: `/mountain-information-network/submissions/${id}`,
            mapLink: `/map?panel=${Schema.key}/${id}`,
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
