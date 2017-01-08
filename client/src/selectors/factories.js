import {createSelector} from 'reselect'
import {HeaderCellOrders} from 'components/table'

const {ASC, DESC, NONE} = HeaderCellOrders

export function createSorter(entitiesGetter, sortingGetter, sorters = Map()) {
    return createSelector(
        entitiesGetter,
        sortingGetter,
        (entities, [name, order]) => {
            if (!sorters.has(name)) {
                return entities
            }

            const sorter = sorters.get(name)

            switch (order) {
                case ASC:
                    return entities.sortBy(sorter)
                case DESC:
                    return entities.sortBy(sorter).reverse()
                default:
                    return entities
            }
        }
    )
}
