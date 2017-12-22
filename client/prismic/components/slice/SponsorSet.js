import React, { Component } from 'react'
import { ItemSet, Item } from 'components/sponsor'
import { DocumentsById } from 'prismic/containers'
import { Status } from 'components/misc'

export default class SponsorSet extends Component {
    get ids() {
        return this.props.value.map(({ sponsor }) => sponsor.value.document.id)
    }
    renderItem({ id, data: { logo, name, url } }) {
        return <Item key={id} title={name} src={logo} url={url} />
    }
    renderer = ({ status, documents }) => [
        <Status key="status" {...status} />,
        <ItemSet key="items">{documents.map(this.renderItem)}</ItemSet>,
    ]
    render() {
        return <DocumentsById ids={this.ids}>{this.renderer}</DocumentsById>
    }
}
