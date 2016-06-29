import {compose, mapProps, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import {getNewsFeedProps} from 'reducers/prismic/news'
import {loadForType} from 'actions/prismic'
import {NewsFeed} from 'pages'
import {history} from 'router'

const pathname = '/news'

export default compose(
    connect(getNewsFeedProps, {loadForType}),
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
)(NewsFeed)
