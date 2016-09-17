import {compose, lifecycle, setPropTypes, withState, withProps} from 'recompose'
import {connect} from 'react-redux'

export default function connector(mapStateToProps, load, loadAll) {
    return compose(
        connect(mapStateToProps, {
            load,
            loadAll,
        }),
        withState('isError', 'setIsError', false),
        withProps(({load, loadAll, setIsError}) => ({
            load(params) {
                setIsError(false)
                load(params).catch(err => setIsError(true))
            },
            loadAll() {
                setIsError(false)
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
                const {name, date} = this.props.params

                if (name !== params.name || date !== params.date) {
                    load(params)
                }
            },
        }),
    )
}
