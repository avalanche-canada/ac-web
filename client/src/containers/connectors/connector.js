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
                console.debug('HI:', this.props.params, '->', params, this.props.isError, '->', isError)

                if(this.props.params.name !== params.name ||
                   this.props.params.date !== params.date) {
                    console.debug('Loading....')
                    load(params)
                }
            },
        }),
    )
}
