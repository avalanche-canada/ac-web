import typeToReducer from 'type-to-reducer'
import { GET_SPONSORS } from 'actions/sponsors'
import { LocalStorage } from 'services/storage'
import formatDate from 'date-fns/format'

const storage = LocalStorage.create()

export default typeToReducer(
    {
        [GET_SPONSORS]: {
            FULFILLED(state, { payload }) {
                const date = formatDate(new Date(), 'YYYY-MM-DD')
                const sponsors = {}

                Object.assign(sponsors, payload.default, payload[date])

                storage.set('sponsors', sponsors)

                return sponsors
            },
        },
    },
    storage.get('sponsors', {})
)
