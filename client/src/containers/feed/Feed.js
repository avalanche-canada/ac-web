import {compose, defaultProps, mapProps, lifecycle, withProps, withHandlers, setPropTypes} from 'recompose'
import {connect} from 'react-redux'
import {loadForType} from 'actions/prismic'
import {withRouter} from 'react-router'
import Feed from 'components/page/feed'
import {replace} from 'utils/router'
import mapStateToProps from 'selectors/prismic/feed'

const {isArray} = Array

export default compose(
    withRouter,
    connect(mapStateToProps, {
        loadForType
    }),
    lifecycle({
        componentDidMount() {
            const {type, loadForType} = this.props

            loadForType(type, {
                pageSize: 250
            })
        }
    }),
    withProps(({location}) => {
        const {year, month, category, tags, timeline} = location.query

        return {
            year: year ? Number(year) : year,
            month,
            category,
            timeline,
            tags: isArray(tags) ? new Set(tags) : new Set([tags]),
        }
    }),
    withHandlers({
        onYearChange: props => year => {
            replace({
                query: {
                    year
                }
            }, props)
        },
        onMonthChange: props => month => {
            replace({
                query: {
                    month
                }
            }, props)
        },
        onTagChange: props => tags => {
            replace({
                query: {
                    tags: tags.size ? [...tags] : undefined
                }
            }, props)
        },
        onCategoryChange: props => category => {
            replace({
                query: {
                    category
                }
            }, props)
        },
        onTimelineChange: props => timeline => {
            replace({
                query: {
                    timeline
                }
            }, props)
        },
    }),
)(Feed)
