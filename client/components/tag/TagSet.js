import { DOM } from 'react'
import { Element } from '~/compose'
import styles from './Tag.css'

export default Element({
    name: 'TagSet',
    styleName: 'Set',
    styles,
    component: DOM.ul,
})
