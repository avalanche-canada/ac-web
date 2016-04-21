import React, { PropTypes } from 'react'
import { Br } from '../components/misc'

Page.propTypes = {
    title: PropTypes.string.isRequired,
}

function Page({ title, children }) {
    return (
        <div>
            <header>
                <h1>{title}</h1>
                <Br />
            </header>
            <article>
                {children}
            </article>
            <aside>
                
            </aside>
        </div>
    )
}

export default Page
