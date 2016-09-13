import React, {PropTypes} from 'react'
import {createSelector} from 'reselect'
import {connect} from 'react-redux'
import {Page, Content, Header, Headline, Main, Banner} from 'components/page'
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
    banner: PropTypes.object,
}

function StaticPage({
    type,
    uid,
    title,
    headline,
    sponsor,
    content = [],
    banner,
}) {
    return (
        <div>
            {banner && <Banner {...banner} />}
            <Page className={`${type}-${uid}`}>
                <Header title={title} sponsor={sponsor} />
                <Content>
                    <Main>
                        {headline && <Headline>{headline}</Headline>}
                        {content.map(slice => <Slice {...slice} />)}
                    </Main>
                </Content>
            </Page>
        </div>
    )
}

export default connect(getSponsor)(StaticPage)
