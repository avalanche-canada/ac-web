import React from 'react'
import {Element} from 'compose'
import styles from './Markup.css'

export function BasicMarkup({text}) {
    var txt = text.replace(/\r/g, '').split(/\n/);
    return <div> {txt.map(t => [t, <br/>])} </div>
}

export const Credit = Element({
    name: 'Credit',
    styles,
})
