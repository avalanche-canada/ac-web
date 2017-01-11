import {createSelector} from 'reselect'
import {getDocumentsOfType, getIsFetching} from 'getters/prismic'
import Parser from 'prismic/parser'
import {formatAsDay} from 'utils/date'

function getDocument(state, {params: {date}}) {
    const documents = getDocumentsOfType(state, 'weather-forecast')

    if (!date) {
        date = formatAsDay(new Date())
    }

    function predicate(document) {
        return date === document.data['weather-forecast.date'].value
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
            forecast: Parser.parse(document),
        }
    }
)
