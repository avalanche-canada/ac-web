import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    Content,
    Header,
    Headline,
    Main,
    Banner,
    Aside,
} from 'components/page'
import Sidebar from 'components/sidebar'
import { Loading } from 'components/text'
import { SliceZone } from 'prismic/components/base'
import { STATIC_PAGE } from 'constants/prismic'

export default class StaticPage extends Component {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        title: PropTypes.string,
        loading: PropTypes.bool,
        document: PropTypes.object,
    }
    get sidebar() {
        if (!this.props.document) {
            return null
        }

        let {
            sharing,
            following,
            contacting,
            sidebar = [],
            contact,
        } = this.props.document.data

        sharing = boolean(sharing)
        following = boolean(following)
        contacting = boolean(contacting)

        if (sharing || following || contacting || sidebar.length) {
            return {
                share: sharing,
                follow: following,
                contact: contacting
                    ? typeof contact === 'string'
                        ? contact.replace(/^mailto:/, '')
                        : true
                    : false,
                content: sidebar,
            }
        } else {
            return null
        }
    }
    render() {
        const { uid, title, loading, document = {} } = this.props
        const { data = {} } = document
        const { headline, content, banner } = data
        const className = `${STATIC_PAGE}-${uid}`
        const { sidebar } = this
        // classes are defined in prismic.css, kind of a hack to have full control
        // styling pages.

        return (
            <Page className={className}>
                {banner && <Banner {...banner.main} />}
                <Header title={data.title || title} />
                <Content>
                    <Loading show={loading}>
                        {title ? `Loading ${title} page...` : 'Loading page...'}
                    </Loading>
                    <Main>
                        {headline && <Headline>{headline}</Headline>}
                        {Array.isArray(content) && (
                            <SliceZone value={content} />
                        )}
                    </Main>
                    {sidebar && (
                        <Aside>
                            <Sidebar {...sidebar}>
                                <SliceZone value={sidebar.content} />
                            </Sidebar>
                        </Aside>
                    )}
                </Content>
            </Page>
        )
    }
}

// Constants & utils
const ToBoolean = new Map([
    ['Yes', true],
    ['No', false],
    [undefined, false],
    [null, false],
])
function boolean(string) {
    return ToBoolean.get(string)
}
