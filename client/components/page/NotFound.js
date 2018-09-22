import React from 'react'
import { Link } from '@reach/router'
import Error from './Error'
import Main from './Main'
import { ButtonSet } from 'components/button'
import styles from './Page.css'

export default function NotFound() {
    return (
        <Error>
            <Main>
                <h1>This is an avalanche size 404 error...</h1>
                <div>
                    <h2>The page you are looking for has not been found.</h2>
                    <ButtonSet>
                        <Link to="/" className={styles.Link}>
                            Forecasts
                        </Link>
                        <Link to="/training" className={styles.Link}>
                            Training
                        </Link>
                        <Link to="/news" className={styles.Link}>
                            Latest news
                        </Link>
                        <Link to="/events" className={styles.Link}>
                            Upcoming events
                        </Link>
                        <Link to="/blogs" className={styles.Link}>
                            Our blog
                        </Link>
                    </ButtonSet>
                </div>
            </Main>
        </Error>
    )
}
