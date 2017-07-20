import React from 'react'
import { compose, mapProps, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import { ItemSet, Item } from '~/components/sponsor'
import { load } from '~/actions/prismic'
import { getDocumentsOfType } from '~/getters/prismic'
import { parse, Predicates } from '~/prismic'

function pluck({ sponsor }) {
    return sponsor.value.document.id
}

const getSponsors = createSelector(
    state => getDocumentsOfType(state, 'sponsor'),
    (state, { value }) => value.map(pluck),
    (docs, ids) => ids.map(id => docs.get(id)).filter(Boolean)
)

function createSponsor(sponsor, index) {
    const { logo, name, url } = parse(sponsor).data

    return <Item key={index} title={name} src={logo} url={url} />
}

export default compose(
    connect(
        createStructuredSelector({
            sponsors: getSponsors,
        }),
        { load }
    ),
    lifecycle({
        componentDidMount() {
            const ids = this.props.value.map(pluck)

            this.props.load({
                predicates: [Predicates.in('document.id', ids)],
                pageSize: ids.length,
            })
        },
    }),
    mapProps(props => {
        return {
            children: props.sponsors.map(createSponsor),
        }
    })
)(ItemSet)
