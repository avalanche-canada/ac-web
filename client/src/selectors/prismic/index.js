import {createSelector, createStructuredSelector} from 'reselect'
import {getType, getStatusFactory, getStatus, getDocument} from 'selectors/prismic/utils'

export const getPost = createStructuredSelector({
    post: getDocument,
    status: getStatusFactory(createSelector(
        getType,
        getDocument,
        (type, post) => ({
            isLoading: `Loading the ${type} post...`,
            isLoaded: post ? null : `No ${type} found.`
        })
    )),
})

export const getToyotaTruckReport = createStructuredSelector({
    report: getDocument,
    status: getStatusFactory({
        isError: 'An error happened while loading our latest Toyota truck report.',
        isLoading: 'Loading latest our Toyota truck report...',
    }),
})
