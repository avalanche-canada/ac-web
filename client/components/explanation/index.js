import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './Explanation.css'

export class Section extends Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
        style: PropTypes.object,
    }
    render() {
        return (
            <section style={this.props.style} className={styles.Section}>
                {this.props.children}
            </section>
        )
    }
}

export class Header extends PureComponent {
    static propTypes = {
        children: PropTypes.string.isRequired,
        style: PropTypes.object,
    }
    render() {
        return (
            <h3 style={this.props.style} className={styles.Header}>
                {this.props.children}
            </h3>
        )
    }
}

export class Content extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        style: PropTypes.object,
    }
    render() {
        return (
            <div style={this.props} className={styles.Content}>
                {this.props.children}
            </div>
        )
    }
}

export class Compound extends Component {
    static propTypes = {
        header: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
    }
    render() {
        const { header, children } = this.props

        return (
            <Section>
                <Header>{header}</Header>
                <Content>{children}</Content>
            </Section>
        )
    }
}
