import {compose, mapProps, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import {getNewsFeed} from 'reducers/prismic'
import {loadNews} from 'actions/prismic'
import {NewsFeed} from 'pages'
import {history} from 'router'

const pathname = '/news'

export default compose(
    connect(getNewsFeed, {loadNews}),
    lifecycle({
        componentDidMount() {
            this.props.loadNews()
        }
    }),
    mapProps(({location, ...rest}) => {
        const {query} = location

        return {
            ...rest,
            ...query,
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
            onTagChange(tag) {
                history.push({
                    pathname,
                    query: {
                        ...query,
                        tag
                    }
                })
            },
        }
    }),
)(NewsFeed)
