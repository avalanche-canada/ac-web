import {DOM} from 'react'
import {Element} from 'compose'
import styles from './Image.css'

const name = 'Image'
const component = DOM.img

export default Element({name, styles, component})
