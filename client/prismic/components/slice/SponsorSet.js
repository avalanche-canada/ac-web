import React from 'react'
import { compose, mapProps } from 'recompose'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import { ItemSet, Item } from '~/components/sponsor'
import { getDocumentsOfType } from '~/getters/prismic'
import { parseForMap } from '~/prismic'

function pluck({ sponsor }) {
    return sponsor.value.document.id
}

const getSponsors = createSelector(
    state => getDocumentsOfType(state, 'sponsor'),
    (state, props) => props.value.map(pluck),
    (docs, ids) => ids.map(id => docs.get(id)).filter(Boolean).map(parseForMap)
)

function createSponsor({ data: { logo, name, url } }, index) {
    return <Item key={index} title={name} src={logo} url={url} />
}

export default compose(
    connect(
        createStructuredSelector({
            sponsors: getSponsors,
        })
    ),
    mapProps(props => ({
        children: props.sponsors.map(createSponsor),
    }))
)(ItemSet)
