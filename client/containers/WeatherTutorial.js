import Tutorial from 'components/page/weather/Tutorial'
import { compose, withProps } from 'recompose'
import { weatherTutorial } from 'containers/connectors'
import { parse } from 'prismic'

export default compose(
    weatherTutorial,
    withProps(({ tutorial }) => {
        return {
            tutorial: tutorial ? parse(tutorial).data : null,
        }
    })
)(Tutorial)
