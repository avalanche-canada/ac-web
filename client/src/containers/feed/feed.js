import {compose, defaultProps, mapProps, lifecycle, withProps, withHandlers, setPropTypes} from 'recompose'
import {connect} from 'react-redux'
import {loadForType} from 'actions/prismic'
import {withRouter} from 'react-router'
import Feed from 'components/page/feed'
import {replaceQuery} from 'utils/router'
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
