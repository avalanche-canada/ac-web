import {compose, lifecycle, mapProps} from 'recompose'
import {connect} from 'react-redux'
import {getDocumentForBookmarkFactory} from 'reducers/prismic'
import {loadForBookmark} from 'actions/prismic'
import {Simple} from 'pages'

export default function generic({
    bookmark,
    title = null,
    message = `Loading...`
}) {
    function genericDocumentMapper({document}) {
        if (!document) {
            return {
                title: title || message,
                message,
            }
        }

        return {
            title: document.getText('generic.title'),
            children: document.getStructuredText('generic.body').asHtml(),
        }
    }

    return compose(
        connect(getDocumentForBookmarkFactory(bookmark), {loadForBookmark}),
        lifecycle({
            componentDidMount() {
                this.props.loadForBookmark(bookmark)
            }
        }),
        mapProps(genericDocumentMapper),
    )(Simple)
}
