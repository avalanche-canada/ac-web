import React from 'react'
import {compose, defaultProps, mapProps, lifecycle, withProps, withHandlers, setPropTypes, withState} from 'recompose'
import {connect} from 'react-redux'
import {loadForType} from 'actions/prismic'
import {Splash} from 'components/page/sections'
import {InnerHTML} from 'components/misc'
import mapStateToProps from 'selectors/prismic/splash'
import {Entry, EntrySet} from 'components/page/feed'

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
            <EntrySet>
                {list.map(entry => <Entry condensed {...entry} />)}
            </EntrySet>
        </Splash>
    )
}

export default compose(
    withState('documents', 'setDocuments', []),
    connect(mapStateToProps, {
        loadForType
    }),
    lifecycle({
        componentDidMount() {
            const {type, loadForType, setDocuments, documents} = this.props
            const options = {
                pageSize: 5,
                orderings: [
                    `my.${type}.date desc`,
                ],
            }

            loadForType(type, options).then(({results}) => {
                setDocuments(results)
            })
        }
    }),
)(FeedSplash)
