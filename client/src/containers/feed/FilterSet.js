import {compose, withProps, withHandlers} from 'recompose'
import {withRouter} from 'react-router'
import {FilterSet} from 'components/feed'
import {replace} from 'utils/router'
import {feed} from 'containers/connectors'

function toSet(tags) {
    if (Array.isArray(tags)) {
        return new Set(tags)

    }

    if (typeof tags === 'string') {
        return new Set([tags])
    }

    return new Set()
}

export default compose(
    feed(),
    withRouter,
    withProps(({location}) => {
        const {year, month, category, tags, timeline} = location.query

        return {
            year: year ? Number(year) : year,
            month,
            category,
            timeline,
            tags: toSet(tags),
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
)(FilterSet)
