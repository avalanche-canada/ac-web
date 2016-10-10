import React from 'react'
import {compose, defaultProps, mapProps, lifecycle, withProps, withHandlers, setPropTypes, withState} from 'recompose'
import {connect} from 'react-redux'
import {loadForType} from 'actions/prismic'
import {Splash} from 'components/page/sections'
import {InnerHTML} from 'components/misc'
import mapStateToProps from 'selectors/prismic/splash'
import {Entry, EntrySet} from 'components/page/feed'
import {Predicates} from 'prismic'

const {assign} = Object

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
            {featured &&
                <EntrySet>
                    <Entry {...featured} />
                </EntrySet>
            }
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
            const {type, tags = [], loadForType, setDocuments, documents} = this.props
            const options = {
                pageSize: 5,
                orderings: [
                    `my.${type}.date desc`,
                ],
            }

            if (tags.length > 0) {
                assign(options, {
                    predicates: [
                        Predicates.at('document.tags', tags)
                    ],
                })
            }

            loadForType(type, options).then(({results}) => {
                setDocuments(results)
            })
        }
    }),
)(FeedSplash)
