import { compose, withState, withHandlers, mapProps } from 'recompose'

function propsMapper({ isLoaded, hasError, ...rest }) {
    return {
        ...rest,
        isLoaded,
        hasError,
        isLoading: hasError === false && isLoaded === false
    }
}

export default compose(
    withState('isLoaded', 'setIsLoaded', false),
    withState('hasError', 'setHasError', false),
    mapProps(propsMapper),
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
