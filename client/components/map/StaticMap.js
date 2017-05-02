import React, { PureComponent, Children } from 'react'
import { mapProps } from 'recompose'
import PropTypes from 'prop-types'
import { createStyleUrl } from '~/services/mapbox/api'
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
    state = {
        url: null,
        isLoading: false,
        isError: false,
    }
    setUrl() {
        const { tracked, ...props } = this.props

        if (tracked) {
            props.width = this.refs.map.clientWidth
            // props.height = this.refs.map.clientHeight
        }

        this.setState({
            url: createStyleUrl(props),
        })
    }
    handleResize = debounce(() => {
        this.setUrl()
    }, 250)
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
            <div ref="map">
                <img
                    src={this.state.url}
                    onLoad={this.handleLoad}
                    onError={this.handleError}
                />
            </div>
        )
    }
}

// TODO: Need to find a better way to create overlay.
function createOverlay({ props: { element, lngLat } }) {
    const url = encodeURIComponent(element.src)

    return `url-${url}(${lngLat.lng},${lngLat.lat})`
}

function propsMapper({ children, center, ...props }) {
    return {
        ...props,
        longitude: center.lng,
        latitude: center.lat,
        overlay: Children.toArray(children).map(createOverlay),
    }
}

export const ManagedStaticMap = mapProps(propsMapper)(StaticMap)
