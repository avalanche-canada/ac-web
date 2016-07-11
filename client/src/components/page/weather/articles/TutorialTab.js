import React, {PropTypes, cloneElement, createElement} from 'react'
import {compose, createEagerElement, setPropTypes, setDisplayName, withProps, mapProps, defaultProps} from 'recompose'
import {Tab, Panel} from 'components/tab'
import {resolve} from 'react-resolver'
import {Api, Html} from 'prismic'

function fetch({uid}) {
    if (!uid) {
        return Promise.resolve(null)
    }

    return Api.QueryDocumentByUid(uid)
}

export default compose(
    setDisplayName('TutorialTab'),
    setPropTypes({
        uid: PropTypes.string.isRequired,
    }),
    defaultProps({
        title: 'Tutorial',
        children: 'There is no tutorial yet here...',
    }),
    mapProps(({tutorial, ...props}) => {
        console.info('tutorial', tutorial)
        return {
            ...props,
            panel: (
                <Panel>
                    <Html document={tutorial} />
                </Panel>
            )
        }
    }),
    resolve('tutorial', fetch),
)(Tab)
