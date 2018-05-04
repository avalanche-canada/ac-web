import React, { Component, Fragment } from 'react'
import { ItemSet, Item } from 'components/sponsor'
import { DocumentsById } from 'prismic/containers'
import { Status } from 'components/misc'

export default class SponsorSet extends Component {
    get ids() {
        return this.props.value.map(({ sponsor }) => sponsor.value.document.id)
    }
    renderItem({ id, data: { image229, name, url } }) {
        return <Item key={id} title={name} src={image229} url={url} />
    }
    renderer = ({ status, documents }) => (
        <Fragment>
            <Status {...status} />
            <ItemSet>{documents.map(this.renderItem)}</ItemSet>
        </Fragment>
    )
    render() {
        return <DocumentsById ids={this.ids}>{this.renderer}</DocumentsById>
    }
}
