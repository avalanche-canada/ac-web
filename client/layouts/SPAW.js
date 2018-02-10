import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'
import Highlight, { DANGER } from 'components/highlight'
import { Link, StructuredText } from 'prismic/components/base'
import { SPAW as Container } from 'prismic/containers'
import { SessionStorage } from 'services/storage'
import styles from './SPAW.css'

export default class SPAW extends PureComponent {
    constructor(props) {
        super(props)

        this.storage = SessionStorage.create()
        this.state = {
            hidden: this.storage.get('highlight-hidden-status'),
        }
    }
    handleDismiss = () => {
        this.setState({ hidden: true }, () => {
            this.storage.set('highlight-hidden-status', true)
        })
    }
    children = ({ document }) => {
        if (!document || this.state.hidden) {
            return null
        }

        const highlight = (
            <Highlight
                style={DANGER}
                onDismiss={this.handleDismiss}
                dismissable>
                <StructuredText value={document.description} />
            </Highlight>
        )

        return document.link ? (
            <Link className={styles.Container} {...document.link}>
                {highlight}
            </Link>
        ) : (
            <div className={styles.Container}>{highlight}</div>
        )
    }
    render() {
        return <Container>{this.children}</Container>
    }
}

export class Region extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    children = ({ document }) =>
        document && document[camelCase(this.props.name)] === 'Yes'
            ? this.props.children({ document })
            : null
    render() {
        return <Container>{this.children}</Container>
    }
}
