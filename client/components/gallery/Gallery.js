import PropTypes from 'prop-types'
import {compose, lifecycle, withState, withHandlers, setPropTypes} from 'recompose'
import ImageGallery from 'react-image-gallery'
import * as cloudinary from '~/services/cloudinary'

const mapResource = cloudinary.mapToSizeFactory()

export default compose(
    setPropTypes({
        tag: PropTypes.string.isRequired,
    }),
    withState('cursor', 'setCursor', null),
    withState('items', 'setItems', []),
    withHandlers({
        onSuccessResponse: props => data => {
            const {setItems, setCursor} = props
            const {resources, next_cursor} = data

            setCursor(next_cursor)
            setItems(resources.map(mapResource))
        },
    }),
    lifecycle({
        componentDidMount() {
            const {tag, cursor, onSuccessResponse} = this.props
            const options = {
                next_cursor: cursor
            }

            cloudinary.getByTag(tag, options).then(onSuccessResponse)
        },
    }),
)(ImageGallery)
