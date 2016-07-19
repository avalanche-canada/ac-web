import {createSelector} from 'reselect'
import {getDocumentsOfType} from 'reducers/prismic'
import {NewWeatherForecast} from 'prismic/types'

function getDocument(state, {params: {date}}) {
    const type = 'new-weather-forecast'
    const documents = getDocumentsOfType(state, type)

    function find(document) {
            return date === document.data[`${type}.date`].value
    }

    return documents.find(find)
}


export default createSelector(
    getDocument,
    document => {
        if (!document) {
            return {
                isLoading: true,
            }
        }

        return {
            isLoading: false,
            forecast: NewWeatherForecast.fromDocument(document),
        }
    }
)
