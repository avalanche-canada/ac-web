import React from 'react'
import PropTypes from 'prop-types'
import Page from './Page'
import Content from './Content'
import Credit from '../markup/Credit'
import styles from './Page.css'

Error.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Error({ children }) {
    return (
        <Page className={styles.Error}>
            <Content>
                {children}
                <Credit>Kroschel Films</Credit>
            </Content>
        </Page>
    )
}
