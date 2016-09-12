import {compose, defaultProps, mapProps, lifecycle, withProps, withHandlers, setPropTypes, withState} from 'recompose'
import {connect} from 'react-redux'
import {loadForType} from 'actions/prismic'
import {Splash} from 'components/page/sections'

const {isArray} = Array

export default function splash(mapStateToProps, type) {
    return compose(
        connect(mapStateToProps, {loadForType}),
        withState('documents', 'setDocuments', []),
        lifecycle({
            componentDidMount() {
                const {loadForType, setDocuments} = this.props
                const options = {
                    pageSize: 5,
                    orderings: [
                        `my.${type}.date desc`,
                    ],
                }

                loadForType(type, options).then(({results}) => setDocuments(results))
            }
        }),
    )(Splash)
}
