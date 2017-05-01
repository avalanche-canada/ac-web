import React from 'react'
import Link from 'react-router/lib/Link'
import CSSModules from 'react-css-modules'
import Error from './Error'
import Main from './Main'
import {ButtonSet} from '~/components/button'
import styles from './Page.css'

function NotFound() {
    return (
        <Error>
            <Main>
                <h1>This is an avalanche size 404 error...</h1>
                <div>
                    <h2>The page you are looking for has not been found.</h2>
                    <ButtonSet>
                        <Link to='/' styleName='Link'>
                            Forecasts
                        </Link>
                        <Link to='/training' styleName='Link'>
                            Training
                        </Link>
                        <Link to='/news' styleName='Link'>
                            Latest news
                        </Link>
                        <Link to='/events' styleName='Link'>
                            Upcoming events
                        </Link>
                        <Link to='/blogs' styleName='Link'>
                            Our blog
                        </Link>
                    </ButtonSet>
                </div>
            </Main>
        </Error>
    )
}

export default CSSModules(NotFound, styles)
