import {createSelector} from 'reselect'
import {MountainInformationNetworkSubmission} from 'api/schemas'
import {getEntityForSchema} from 'reducers/api/entities'
import {getResultsSet} from 'reducers/api/getters'
import {RESULT} from 'reducers/api/results'

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

    return getResultsSet(state, MountainInformationNetworkSubmission, params) || RESULT

}

export default createSelector(
    (state, props) => getId(props),
    getSubmission,
    getSubmissionResultsSet,
    (id, submission, result) => {
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
        }

        if (submission) {
            const {title, user, datetime, obtype, obs} = submission.toJSON()

            return {
                ...props,
                title,
                metadata: {
                    submittedOn: datetime,
                    submittedBy: user,
                },
                props: {
                    observations: obs,
                    active: obtype,
                },
            }
        } else {
            return props
        }
    }
)
