import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Url from 'url'
import {Input} from 'components/controls'
import Button from 'components/button'
import styles from './Subscribe.css'

Subscribe.propTypes = {
    url: PropTypes.string.isRequired,
}

function Subscribe({url}) {
    const {query} = Url.parse(url, true)

    return (
        <form action={url} method='post' target='_blank' styleName='Subscribe'>
            <Input type='email' name='EMAIL' placeholder='Email address' required styleName='Input' />
            <Button type='submit' styleName='Submit'>
                Subscribe
            </Button>
            {Object.keys(query).map(name => (
                <input name={name} key={name} type='hidden' value={query[name]} />
            ))}
        </form>
    )
}

export default CSSModules(Subscribe, styles)
