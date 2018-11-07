import { unstable_createResource as createResource } from 'react-cache'
import { forecast } from 'api/requests/forecast'
import { transformForecast } from 'api/transformers'
import fetch from 'services/fetch'

export const Forecast = createResource((name, date) =>
    fetch(forecast(name, date)).then(transform)
)

function transform(data) {
    return data ? transformForecast(data) : data
}
