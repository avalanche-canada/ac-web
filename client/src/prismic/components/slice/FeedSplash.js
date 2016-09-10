import React, {PropTypes} from 'react'
import {compose, mapProps, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import {Splash} from 'components/page/sections'
import {InnerHTML} from 'components/misc'
import {loadForType} from 'actions/prismic'
import {Predicates} from 'prismic'
import {Entry} from 'components/page/feed'

function FeedSplash({
    content,
    featured,
    list = [],
}) {
    return (
        <Splash {...props} >
            <InnerHTML>
                {content}
            </InnerHTML>
            <div styleName='Featured'>
                {featured}
            </div>
            <div styleName='List'>
                {list.map(entry => <Entry {...entry} />)}
            </div>
        </Splash>
    )
}

function mapStateToProps(state, props) {
    return {
        
    }
}

export default compose(
    connect(mapStateToProps, {
        loadForType
    }),
    lifecycle({
        componentDidMount() {
            const {loadForType, type} = this.props

            loadForType(type, {
                pageSize: 4,
                orders: [

                ],
                predicates: [
                    Predicates.at(),
                    Predicates.at(),
                ]
            })
        }
    }),
    // mapProps(),
    // content: [{content, type, ...props}],
    // label,

)(FeedSplash)
