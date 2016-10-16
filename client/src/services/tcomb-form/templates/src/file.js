import React, {PropTypes, Component} from 'react'
import {compose, setPropTypes, withState, withPropsOnChange} from 'recompose'
import textbox from './textbox'
import ImageGallery from 'react-image-gallery'
import {Loading, Muted, Error} from 'components/misc'

function read(file) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Object.assign(new FileReader(), {
                onload: event => resolve(event.target.result),
                onerror: event => reject(`Error reading ${file.name}: ${event.target.result}`),
            }).readAsDataURL(file)
        }, 50)
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

class Slider extends Component {
    static propTypes = {
        files: PropTypes.instanceOf(FileList).isRequired,
    }
    state = {
        images: null,
        hasError: false,
    }
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
        this.setState({images: null, hasError: false}, () => {
            const promises = Array.from(files).map(read)

            Promise.all(promises).then(images => {
                this.setState({images})
            }, () => {
                this.setState({hasError: true})
            })
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
            return (
                <Loading>Loading your {this.props.files.length} images...</Loading>
            )
        }

        return (
            <div style={SLIDER_STYLE}>
                <Muted>{images.length} photo will be uploaded.</Muted>
                <ImageGallery items={images.map(toItem)} showBullets showThumbnails={false} />
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
