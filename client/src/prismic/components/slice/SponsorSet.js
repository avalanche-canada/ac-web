import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {ItemSet, Item} from 'components/sponsor'
import {getDocumentsOfType} from 'reducers/prismic'
import {Sponsor} from 'prismic/types'

function parse(document) {
    const sponsor = Sponsor.fromDocument(document)

    return {
        ...sponsor,
        src : sponsor.image229,
    }
}
const getSponsors = createSelector(
    state => getDocumentsOfType(state, 'sponsor'),
    (state, props) => props.content.map(slice => slice.sponsor.id),
    function computeSponsors(documents, ids) {
        if (documents.isEmpty()) {
            return {}
        }

        return {
            sponsors: ids.map(id => documents.get(id)).filter(Boolean).map(parse)
        }
    }
)

function SponsorSet({sponsors = []}) {
    return (
        <ItemSet>
            {sponsors.map(sponsor => (
                <Item key={sponsor.uid} {...sponsor} />
            ))}
        </ItemSet>
    )
}

export default connect(getSponsors)(SponsorSet)
