import { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import styles from 'styles/typography.css'

export default class Home extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
    }
    static defaultProps = {
        children: 'Back to home',
        to: '/',
    }
    render() {
        return createElement(Link, {
            ...this.props,
            className: classnames(styles.Back, this.props.className),
        })
    }
}
