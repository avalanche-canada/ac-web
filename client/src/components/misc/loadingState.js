import {compose, withState, withHandlers, mapProps} from 'recompose'

export default compose(
    withState('isLoaded', 'setIsLoaded', false),
    withState('hasError', 'setHasError', false),
    mapProps(({isLoaded, hasError, ...rest}) => ({
        ...rest,
        isLoaded,
        hasError,
        isLoading: hasError === false && isLoaded === false
    })),
    withHandlers({
        onLoad: props => event => {
            props.setIsLoaded(true)
        },
        onError: props => event => {
            props.setIsLoaded(true)
            props.setHasError(true)
        }
    }),
)
