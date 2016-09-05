import {compose, defaultProps, mapProps, lifecycle, withProps, withHandlers, setPropTypes} from 'recompose'
import {connect} from 'react-redux'
import {loadForType} from 'actions/prismic'
import {Splash} from 'components/page/sections'

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

export default function splash(mapStateToProps, title, type) {
    return compose(
        connect(mapStateToProps, {loadForType}),
        defaultProps({
            title
        }),
        lifecycle({
            componentDidMount() {
                this.props.loadForType(type, {
                    pageSize: 3,
                })
            }
        }),
        withProps(({}) => {
            return {
                main: <div>Main</div>,
                second: <div>Second</div>,
            }
        })
    )(Splash)
}
