import React, { Children, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { Credit } from 'components/markup'
import Dimensions from 'components/Dimensions'
import WebLink from './WebLink'
import styles from './Image.css'

const MAGIC_MAX_WIDTH_TO_SHOW_COMPACT_CREDIT = 200

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
    }
    state = {
        isLoading: true,
    }
    constructor(props) {
        super(props)

        this.classNames = classnames.bind(styles)
    }
    handleLoad = () => {
        this.setState({
            isLoading: false,
        })
    }
    componentDidMount() {
        this.image.addEventListener('load', this.handleLoad)
    }
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad)
    }
    componentWillReceiveProps({ url }) {
        this.setState({
            isLoading: url !== this.props.url,
        })
    }
    imageRef = image => {
        this.image = image
    }
    figureRef = figure => {
        this.figure = figure
    }
    renderCredit = ({ width }) => {
        const compact = width < MAGIC_MAX_WIDTH_TO_SHOW_COMPACT_CREDIT
        const { copyright, credit } = this.props

        return <Credit compact={compact}>{credit || copyright}</Credit>
    }
    render() {
        const { url, alt, copyright, credit, linkTo, label } = this.props
        const { isLoading } = this.state
        const classNames = this.classNames(label, {
            Figure: !isLoading,
            'Figure--Loading': isLoading,
        })
        const image = (
            <img
                ref={this.imageRef}
                src={url}
                alt={alt}
                className={styles.Image}
            />
        )

        return (
            <figure ref={this.figureRef} className={classNames}>
                {typeof linkTo === 'object' ? (
                    <WebLink {...linkTo}>{image}</WebLink>
                ) : (
                    image
                )}
                {(copyright || credit) && (
                    <footer>
                        <Dimensions>{this.renderCredit}</Dimensions>
                    </footer>
                )}
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
