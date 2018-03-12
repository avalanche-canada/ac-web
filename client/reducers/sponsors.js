import typeToReducer from 'type-to-reducer'
import { GET_SPONSORS } from 'actions/sponsors'
import { LocalStorage } from 'services/storage'
import formatDate from 'date-fns/format'

const storage = LocalStorage.create()
const SPONSORS = {
    lastUpdatedOn: 0,
    data: {},
}

export default typeToReducer(
    {
        [GET_SPONSORS]: {
            FULFILLED(state, { payload }) {
                const date = formatDate(new Date(), 'YYYY-MM-DD')
                const sponsors = {
                    lastUpdatedOn: Date.now(),
                    data: Object.assign({}, payload.default, payload[date]),
                }

                storage.set('sponsors', sponsors)

                return sponsors
            },
        },
    },
    storage.get('sponsors', SPONSORS)
)
