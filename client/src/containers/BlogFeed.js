import {compose, mapProps, withProps, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import mapStateToProps from 'selectors/prismic/blogs/feed'
import Feed from 'components/page/feed'
import {loadForType} from 'actions/prismic'
import {history} from 'router'

const pathname = '/blogs'

export default compose(
    connect(mapStateToProps, {loadForType}),
    withProps({
        title: 'Blogs'
    }),
    lifecycle({
        componentDidMount() {
            this.props.loadForType('blog', {
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
            onTagChange(tags) {
                history.push({
                    pathname,
                    query: {
                        ...query,
                        tags
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
