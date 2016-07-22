import {createSelector} from 'reselect'
import {getDocumentsOfType, getIsFetching} from 'reducers/prismic'
import {NewWeatherForecast} from 'prismic/types'

function getDocument(state, {params: {date}}) {
    const type = 'new-weather-forecast'
    const documents = getDocumentsOfType(state, type)

    function predicate(document) {
        return date === document.data[`${type}.date`].value
    }

    return documents.find(predicate)
}


export default createSelector(
    getIsFetching,
    getDocument,
    (isFetching, document) => {
        if (isFetching && !document) {
            return {
                isLoading: true,
            }
        }

        if (!document) {
            return {
                isLoading: false,
            }
        }

        return {
            isLoading: false,
            forecast: NewWeatherForecast.fromDocument(document),
        }
    }
)
