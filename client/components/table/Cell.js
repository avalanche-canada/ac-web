import { DOM } from 'react'
import { Element, onlyUpdateForKey } from '~/compose'
import styles from './Table.css'

export default onlyUpdateForKey('children')(
    Element({
        name: 'Cell',
        component: DOM.td,
        styles,
    })
)
