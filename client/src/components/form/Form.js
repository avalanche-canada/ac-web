import {DOM} from 'react'
import {Element} from '/compose'
import CSSModules from 'react-css-modules'
import styles from './Form.css'

export default Element({
    name: 'Form',
    component: DOM.form,
    styles,
})
