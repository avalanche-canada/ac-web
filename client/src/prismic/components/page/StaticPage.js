import React, {PropTypes} from 'react'
import {createSelector} from 'reselect'
import {connect} from 'react-redux'
import {Page, Header, Headline, Main, Banner} from 'components/page'
import Slice from '../slice'
import {getDocument} from 'reducers/prismic'
import {Sponsor} from 'prismic/types'

const getSponsor = createSelector(
    (state, {sponsorId}) => getDocument(state, sponsorId),
    function computeSponsor(document) {
        return {
            sponsor: document ? Sponsor.fromDocument(document).toObject() : null
        }
    }
)

StaticPage.propTypes = {
    title: PropTypes.string,
    headline: PropTypes.string,
    sponsorId: PropTypes.string,
    content: PropTypes.arrayOf(PropTypes.object),
}

function StaticPage({title, headline, sponsor = null, content = []}) {
    return (
        <Page>
            <Header title={title} sponsor={sponsor} />
            <Main>
                {headline &&
                    <Headline>
                        {headline}
                    </Headline>
                }
                {content.map(slice => <Slice {...slice} />)}
            </Main>
        </Page>
    )
}

export default connect(getSponsor)(StaticPage)
