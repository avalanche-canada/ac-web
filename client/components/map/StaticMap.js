import React, { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'
import { createStyleUrl } from 'services/mapbox/api'
import Marker from './Marker'
import debounce from 'lodash/debounce'

export default class StaticMap extends PureComponent {
    static propTypes = {
        tracked: PropTypes.bool,
        styleId: PropTypes.string,
        overlay: PropTypes.arrayOf(PropTypes.string),
        longitude: PropTypes.number,
        latitude: PropTypes.number,
        zoom: PropTypes.number,
        bearing: PropTypes.number,
        pitch: PropTypes.number,
        auto: PropTypes.bool,
        width: PropTypes.number,
        height: PropTypes.number,
        retina: PropTypes.bool,
    }
    static Managed({ children, center, ...props }) {
        return (
            <StaticMap
                {...props}
                longitude={center.lng}
                latitude={center.lat}
                overlay={createOverlay(children)}
            />
        )
    }
    state = {
        url: null,
        isLoading: false,
        isError: false,
    }
    setUrl = () => {
        const { tracked, ...props } = this.props

        if (tracked) {
            props.width = this.map.clientWidth
            // props.height = this.map.clientHeight
        }

        this.setState({
            url: createStyleUrl(props),
        })
    }
    handleResize = debounce(this.setUrl, 250)
    handleLoad = () => {
        this.setState({
            isError: false,
            isLoading: false,
        })
    }
    handleError = () => {
        this.setState({
            isError: true,
            isLoading: false,
        })
    }
    componentDidMount() {
        if (this.props.tracked) {
            window.addEventListener('resize', this.handleResize)
        }

        this.setUrl()
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }
    render() {
        return (
            <div ref={map => (this.map = map)}>
                <img
                    src={this.state.url}
                    onLoad={this.handleLoad}
                    onError={this.handleError}
                />
            </div>
        )
    }
}

// Utils
function createOverlay(children) {
    return Children.toArray(children)
        .filter(Boolean)
        .filter(({ type }) => type === Marker)
        .map(({ props }) => {
            const url = encodeURIComponent(props.element.src)
            const { lng, lat } = props.lngLat

            return `url-${url}(${lng},${lat})`
        })
}
