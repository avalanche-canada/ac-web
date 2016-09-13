import {connect} from 'react-redux'
import {compose, lifecycle, setPropTypes, withState, withProps} from 'recompose'

export default function connector(mapStateToProps, load, loadAll) {
    return compose(
        connect(mapStateToProps, {
            load,
            loadAll,
        }),
        withState('isError', 'setIsError', false),
        withProps(({load, loadAll, setIsError}) => ({
            load(params) {
                load(params).catch(err => setIsError(true))
            },
            loadAll() {
                loadAll().catch(err => setIsError(true))
            },
        })),
        lifecycle({
            componentDidMount() {
                const {load, loadAll, params} = this.props

                load(params)
                loadAll()
            },
            componentWillReceiveProps({load, params, isError}) {
                if (isError) {
                    return
                }

                load(params)
            },
        }),
    )
}
