import React, { Component, Fragment } from 'react'
import { ItemSet, Item } from 'components/sponsor'
import { Documents } from 'prismic/new-containers'
import { Loading } from 'components/misc'
import * as params from 'prismic/params'

export default class SponsorSet extends Component {
    get ids() {
        return this.props.value.map(({ sponsor }) => sponsor.value.document.id)
    }
    renderItem({ id, data: { image229, name, url } }) {
        return <Item key={id} title={name} src={image229} url={url} />
    }
    renderChildren = ({ loading, documents = [] }) => (
        <Fragment>
            <Loading show={loading} />
            <ItemSet>{documents.map(this.renderItem)}</ItemSet>
        </Fragment>
    )
    render() {
        return (
            <Documents {...params.ids(this.ids)}>
                {this.renderChildren}
            </Documents>
        )
    }
}
