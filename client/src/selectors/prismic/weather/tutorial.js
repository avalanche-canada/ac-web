import {createSelector} from 'reselect'
import {getDocumentForUid, getIsFetching} from 'reducers/prismic'
import {WeatherForecastTutorial} from 'prismic/types'

const {fromDocument} = WeatherForecastTutorial

function getDocument(state, {uid}) {
    return getDocumentForUid(state, 'weather-forecast-tutorial', uid)
}

export default createSelector(
    getIsFetching,
    getDocument,
    (isFetching, document) => {
        if (isFetching || !document) {
            return {
                isLoading: true,
            }
        }

        return {
            isLoading: false,
            body: document ? fromDocument(document).tutorial : null,
        }
    }
)
