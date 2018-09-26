import React, { Children, PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { Credit } from 'components/markup'
import WebLink from './WebLink'
import styles from './Image.css'

export default class Image extends PureComponent {
    static propTypes = {
        url: PropTypes.string.isRequired,
        alt: PropTypes.string,
        credit: PropTypes.string,
        copyright: PropTypes.string,
        dimensions: PropTypes.shape({
            height: PropTypes.number.isRequired,
            width: PropTypes.number.isRequired,
        }),
        label: PropTypes.string,
        linkTo: PropTypes.object,
        children: PropTypes.element,
    }
    state = {
        isLoading: true,
    }
    classNames = classnames.bind(styles)
    image = createRef()
    handleLoad = () => {
        this.setState({
            isLoading: false,
        })
    }
    componentDidMount() {
        this.image.current.addEventListener('load', this.handleLoad)
    }
    componentWillUnmount() {
        this.image.current.removeEventListener('load', this.handleLoad)
    }
    componentDidUpdate({ url }) {
        if (url !== this.props.url) {
            this.setState({
                isLoading: true,
            })
        }
    }
    render() {
        const {
            url,
            alt,
            copyright,
            credit,
            linkTo,
            label,
            children,
        } = this.props
        const { isLoading } = this.state
        const classNames = this.classNames(label, {
            Figure: !isLoading,
            'Figure--Loading': isLoading,
        })
        const image = (
            <img
                ref={this.image}
                src={url}
                alt={alt}
                className={styles.Image}
            />
        )

        return (
            <figure className={classNames}>
                {typeof linkTo === 'object' ? (
                    <WebLink {...linkTo}>{image}</WebLink>
                ) : (
                    image
                )}
                {(copyright || credit) && (
                    <Credit>{credit || copyright}</Credit>
                )}
                {children}
            </figure>
        )
    }
}

OpenInNewTab.propTypes = {
    children: PropTypes.node.isRequired,
}

export function OpenInNewTab({ children }) {
    const child = Children.only(children)
    const { url, alt } = child.props

    return (
        <a href={url} title={alt} target={alt}>
            {child}
        </a>
    )
}
