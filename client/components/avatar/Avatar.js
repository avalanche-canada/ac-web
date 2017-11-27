import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Avatar.css'
import { initials } from 'utils/string'
import { Loading } from 'react-powerplug'

export default class Avatar extends PureComponent {
    static PropTypes = {
        name: PropTypes.string.isRequired,
        url: PropTypes.string,
        size: PropTypes.number,
    }
    static defaultProps = {
        size: 60,
    }
    constructor(props) {
        super(props)

        this.classnames = classnames.bind(styles)
    }
    get style() {
        const { size } = this.props

        return {
            height: size,
            width: size,
            fontSize: size < 50 ? '0.75em' : '1em',
        }
    }
    renderer = ({ isLoading, setLoading }) => {
        const { url, name } = this.props
        const classNames = this.classnames({
            Initials: isLoading,
            Avatar: !isLoading,
        })

        return (
            <div
                className={classNames}
                data-initials={initials(name)}
                style={this.style}>
                {url && (
                    <img
                        src={url}
                        alt={initials(name)}
                        title={name}
                        onLoad={() => setLoading(false)}
                        onError={() => setLoading(false)}
                    />
                )}
            </div>
        )
    }
    render() {
        const loading = Boolean(this.props.url)

        return <Loading initial={loading}>{this.renderer}</Loading>
    }
}
