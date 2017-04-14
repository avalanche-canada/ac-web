import {Element} from '~/compose'
import {onlyUpdateForKey} from '~/compose'
import {DOM} from 'react'
import styles from './Table.css'

export default onlyUpdateForKey('children')(
    Element({
        name: 'Caption',
        component: DOM.caption,
        styles,
    })
)
