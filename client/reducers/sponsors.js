import typeToReducer from 'type-to-reducer'
import { GET_SPONSORS } from '~/actions/sponsors'
import { LocalStorage } from '~/services/storage'
import format from 'date-fns/format'

export default typeToReducer(
    {
        [GET_SPONSORS]: {
            FULFILLED(state, { payload: { data } }) {
                const storage = LocalStorage.create()
                const date = format(new Date(), 'YYYY-MM-DD')
                const sponsors = {
                    ...data.default,
                    ...(data[date] || {}),
                }

                storage.set('sponsors', sponsors)

                return sponsors
            },
        },
    },
    LocalStorage.create().get('sponsors', {})
)
