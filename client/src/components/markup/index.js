import React from 'react'

export function BasicMarkup({text}) {
    var txt = text.replace(/\r/g, '').split(/\n/);
    return <div> {txt.map(t => [t, <br/>])} </div>
}
