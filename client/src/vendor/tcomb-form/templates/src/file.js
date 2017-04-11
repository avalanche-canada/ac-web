import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose, setPropTypes, withState, withPropsOnChange} from 'recompose'
import textbox from './textbox'
import ImageGallery from 'react-image-gallery'
import {Loading, Muted, Error} from 'components/misc'
import {pluralize} from '/utils/string'

function read(file, index) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Object.assign(new FileReader(), {
                onload(event) {
                    return resolve(event.target.result)
                },
                onerror(event) {
                    return reject(`Error reading ${file.name}: ${event.target.result}`)
                },
            }).readAsDataURL(file)
        }, index * 10)
    })
}
function toItem(image) {
    return {
        original: image
    }
}

const SLIDER_STYLE = {
    marginTop: '1em'
}

const STATE = {
    images: null,
    hasError: false,
}

class Slider extends Component {
    static propTypes = {
        files: PropTypes.instanceOf(FileList).isRequired,
    }
    state = STATE
    componentDidMount() {
        const {files} = this.props

        if (files instanceof FileList) {
            this.setImages(files)
        }
    }
    componentWillReceiveProps({files}) {
        if (files !== this.props.files && files instanceof FileList) {
            this.setImages(files)
        }
    }
    setImages(files) {
        this.setState(STATE, () => {
            Promise.all(Array.from(files).map(read))
                .then(images => ({images}), () => ({hasError: true}))
                .then(state => this.setState(state))
        })
    }
    render() {
        const {images, hasError} = this.state

        if (hasError) {
            return (
                <Error>Can not load your images, please start again.</Error>
            )
        }

        if (!images) {
            const {length} = this.props.files

            return (
                <Loading>Loading {pluralize('photo', length, true)}...</Loading>
            )
        }

        const items = images.map(image => ({
            original: image
        }))

        return (
            <div style={SLIDER_STYLE}>
                <Muted>
                    {pluralize('photo', images.length, true)} will be sent along with your report.
                </Muted>
                <ImageGallery items={items}
                    showBullets={items.length > 1}
                    showPlayButton={items.length > 1}
                    showThumbnails={false} />
            </div>
        )
    }
}

export default textbox.clone({
    renderHelp(locals) {
        const {value} = locals

        return value ? <Slider files={value} /> : textbox.renderHelp(locals)
    }
})
