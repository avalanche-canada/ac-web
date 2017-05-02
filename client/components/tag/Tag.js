import { DOM } from 'react'
import { Element } from '~/compose'
import styles from './Tag.css'

export default Element({
    name: 'Tag',
    styleName: 'Item',
    styles,
    component: DOM.li,
})
