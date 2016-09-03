import {compose, defaultProps, mapProps, lifecycle, withProps, withHandlers, setPropTypes} from 'recompose'
import {connect} from 'react-redux'
import {loadForType} from 'actions/prismic'
import {withRouter} from 'react-router'
import Feed from 'components/page/feed'

const {isArray} = Array
function replaceQuery(query, {router, location}) {
    router.replace({
        ...location,
        query: {
            ...location.query,
            ...query,
        }
    })
}

export default function feed(mapStateToProps, title, type, pageSize = 250) {
    return compose(
        withRouter,
        connect(mapStateToProps, {loadForType}),
        defaultProps({
            title
        }),
        lifecycle({
            componentDidMount() {
                this.props.loadForType(type, {
                    pageSize
                })
            }
        }),
        withProps(({location}) => {
            const {year, month, category, tags} = location.query

            return {
                year: year ? Number(year) : year,
                month,
                category,
                tags: isArray(tags) ? new Set(tags) : new Set([tags]),
            }
        }),
        withHandlers({
            onYearChange: props => year => {
                replaceQuery({
                    year
                }, props)
            },
            onMonthChange: props => month => {
                replaceQuery({
                    month
                }, props)
            },
            onTagChange: props => tags => {
                replaceQuery({
                    tags: tags.size ? [...tags] : undefined
                }, props)
            },
            onCategoryChange: props => category => {
                replaceQuery({
                    category
                }, props)
            },
        }),
    )(Feed)
}
