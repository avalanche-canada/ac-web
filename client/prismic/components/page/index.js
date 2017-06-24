import { compose, componentFromProp, withProps } from 'recompose'
import { makeGetDocumentAndStatus } from '~/selectors/prismic/utils'
import { prismic } from '~/containers/connectors'
import StaticPage from './StaticPage'
import Generic from './Generic'

export Generic from './Generic'
export StaticPage from './StaticPage'

const Components = new Map([['static-page', StaticPage], ['generic', Generic]])

export const FallbackPage = compose(
    withProps(props => ({
        component: Components.get(props.params.type),
    })),
    prismic(makeGetDocumentAndStatus)
)(componentFromProp('component'))
