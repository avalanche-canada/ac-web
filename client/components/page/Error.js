import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Page from './Page'
import Content from './Content'
import Credit from '../markup/Credit'
import styles from './Page.css'

export default class Error extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
    }
    render() {
        return (
            <Page className={styles.Error}>
                <Content>
                    {this.props.children}
                    <Credit>Kroschel Films</Credit>
                </Content>
            </Page>
        )
    }
}
