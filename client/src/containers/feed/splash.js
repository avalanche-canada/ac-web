import React from 'react'
import {compose, defaultProps, mapProps, lifecycle, withProps, withHandlers, setPropTypes, withState} from 'recompose'
import {connect} from 'react-redux'
import {loadForType} from 'actions/prismic'
import {Splash} from 'components/page/sections'
import {InnerHTML} from 'components/misc'
import mapStateToProps from 'selectors/prismic/splash'

function FeedSplash({
    header,
    featured,
    list = [],
}) {
    return (
        <Splash>
            <InnerHTML>
                {header}
            </InnerHTML>
            {featured && <Entry {...featured} />}
            {list.map(entry => <Entry {...entry} />)}
        </Splash>
    )
}

export default compose(
    connect(mapStateToProps, {
        loadForType
    }),
    withState('documents', 'setDocuments', []),
    lifecycle({
        componentDidMount() {
            const {type, loadForType, setDocuments} = this.props
            const options = {
                pageSize: 5,
                orderings: [
                    `my.${type}.date desc`,
                ],
            }

            loadForType(type, options).then(({results}) => setDocuments(results))
        }
    }),
)(FeedSplash)
