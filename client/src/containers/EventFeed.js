import {compose, mapProps, withProps, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import mapStateToProps from 'selectors/prismic/events/feed'
import Feed from 'components/page/feed'
import {loadForType} from 'actions/prismic'
import {history} from 'router'

const pathname = '/events'

export default compose(
    connect(mapStateToProps, {loadForType}),
    withProps({
        title: 'Events'
    }),
    lifecycle({
        componentDidMount() {
            this.props.loadForType('event', {
                pageSize: 150
            })
        }
    }),
    mapProps(({location, ...rest}) => {
        const {query} = location
        const {year, month, category} = query

        return {
            ...rest,
            year: year ? Number(year) : year,
            month,
            category,
            onYearChange(year) {
                history.push({
                    pathname,
                    query: {
                        ...query,
                        year
                    }
                })
            },
            onMonthChange(month) {
                history.push({
                    pathname,
                    query: {
                        ...query,
                        month
                    }
                })
            },
            onCategoryChange(category) {
                history.push({
                    pathname,
                    query: {
                        ...query,
                        category
                    }
                })
            },
        }
    }),
)(Feed)
