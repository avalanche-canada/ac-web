import {compose, defaultProps, mapProps, lifecycle, withProps} from 'recompose'
import {connect} from 'react-redux'
import mapStateToProps from 'selectors/prismic/news/feed'
import {loadForType} from 'actions/prismic'
import Feed from 'components/page/feed'
import {history} from 'router'

const pathname = '/news'

export default compose(
    connect(mapStateToProps, {loadForType}),
    withProps({
        title: 'Recent News'
    }),
    lifecycle({
        componentDidMount() {
            this.props.loadForType('news', {
                pageSize: 100
            })
        }
    }),
    mapProps(({location, ...rest}) => {
        const {query} = location
        const {year, month, tags} = query

        return {
            ...rest,
            year: year ? Number(year) : year,
            month,
            tags,
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
            onTagChange(tags) {
                history.push({
                    pathname,
                    query: {
                        ...query,
                        tags
                    }
                })
            },
        }
    }),
)(Feed)
