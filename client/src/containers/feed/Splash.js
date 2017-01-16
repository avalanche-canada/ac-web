import React from 'react'
import {compose, defaultProps, mapProps, lifecycle, withProps, withHandlers, setPropTypes, withState} from 'recompose'
import {connect} from 'react-redux'
import {loadForType} from 'actions/prismic'
import {Splash} from 'components/page/sections'
import {InnerHTML} from 'components/misc'
import mapStateToProps from 'selectors/prismic/splash'
import {Entry, EntrySet} from 'components/feed'
import {Predicates} from 'prismic'
import {formatAsDay} from 'utils/date'

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
                predicates: [],
                orderings: [
                    `my.${type}.date desc`,
                ],
            }

            if (tags.length > 0) {
                options.predicates.push(Predicates.at('document.tags', tags))
            }

            if (type === 'event') {
                options.predicates.push(
                    Predicates.dateAfter('my.event.start_date', formatAsDay(new Date()))
                )
                options.orderings = ['my.event.start_date']
            }

            loadForType(type, options).then(({results}) => {
                setDocuments(results)
            })
        }
    }),
)(FeedSplash)
