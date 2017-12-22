import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Gallery from './Gallery'
import * as cloudinary from 'services/cloudinary'

export default class CloudinaryGallery extends PureComponent {
    static propTypes = {
        tag: PropTypes.string.isRequired,
    }
    state = {
        cursor: null,
        items: [],
    }
    constructor(props) {
        super(props)

        this.mapResource = cloudinary.mapToSizeFactory()
    }
    componentDidMount() {
        const { tag } = this.props
        const options = {
            next_cursor: this.state.cursor,
        }

        cloudinary.getByTag(tag, options).then(this.handleSuccessResponse)
    }
    handleSuccessResponse = data => {
        this.setState({
            cursor: data.next_cursor,
            items: data.resources.map(this.mapResource),
        })
    }
    render() {
        return <Gallery {...this.state} />
    }
}
