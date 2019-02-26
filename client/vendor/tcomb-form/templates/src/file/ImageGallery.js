import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Base from 'components/gallery'
import { Loading, Error } from 'components/text'
import { pluralize } from 'utils/string'
import Description from './Description'
import styles from './File.css'

const STATE = {
    images: null,
    hasError: false,
}

export default class ImageGallery extends Component {
    static propTypes = {
        files: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
        onRemove: PropTypes.func.isRequired,
    }
    state = STATE
    componentDidMount() {
        const { files } = this.props

        if (Array.isArray(files)) {
            this.setImages(files)
        }
    }
    componentDidUpdate(nextProps) {
        const { files } = this.props

        if (files !== nextProps.files && Array.isArray(files)) {
            this.setImages(files)
        }
    }
    setImages(files) {
        this.setState(STATE, () => {
            Promise.all(Array.from(files).map(read))
                .then(images => ({ images }), () => ({ hasError: true }))
                .then(state => this.setState(state))
        })
    }
    render() {
        const { images, hasError } = this.state

        if (hasError) {
            return <Error>Can not load your images, please start again.</Error>
        }

        const { files, onRemove } = this.props
        const { length } = files
        const photo = pluralize('photo', length, true)

        if (!images) {
            return (
                <Loading>
                    Loading {photo}
                    ...
                </Loading>
            )
        }

        const items = images.map(({ url }, index) => ({
            original: url,
            description: (
                <Description
                    index={index}
                    total={length}
                    onRemoveClick={onRemove.bind(null, index)}
                />
            ),
        }))

        return (
            <div className={styles.ImageGallery}>
                <Base
                    items={items}
                    showPlayButton={items.length > 1}
                    showNav={items.length > 1}
                    showThumbnails={false}
                />
            </div>
        )
    }
}

// Utils
function read(file, index) {
    console.warn(file)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Object.assign(new FileReader(), {
                onload(event) {
                    console.warn('it loads')
                    return resolve({
                        url: event.target.result,
                        name: file.name,
                    })
                },
                onerror(event) {
                    console.warn('it rejects')
                    return reject(
                        new Error(
                            `Error reading ${file.name}: ${event.target.result}`
                        )
                    )
                },
            }).readAsDataURL(file)
        }, index + 10)
    })
}
