import React, { Component, PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Router, Link } from '@reach/router'
import memoize from 'lodash/memoize'
import { Page, Main, Content, Header, Headline, Aside } from 'components/page'
import Sidebar, {
    Item as SidebarItem,
    Header as SidebarHeader,
} from 'components/sidebar'
import { Loading } from 'components/text'
import { TagSet, Tag } from 'components/tag'
import { Muted } from 'components/text'
import { Search } from 'components/form'
import StaticComponent from 'components/StaticComponent'
import { Document, Documents } from 'prismic/containers'
import { glossary } from 'prismic/params'
import { StructuredText, SliceZone } from 'prismic/components/base'
import SliceComponents from 'prismic/components/slice/rework'
import styles from './Glossary.css'

export default function Layout() {
    return (
        <Page>
            <Header title="Glossary" />
            <Content>
                <Main>
                    <Router>
                        <Definition path="terms/:uid" />
                        <Glossary default />
                    </Router>
                </Main>
                <Router>
                    <GlossaryAside path="/" />
                </Router>
            </Content>
        </Page>
    )
}

class GlossaryAside extends StaticComponent {
    render() {
        return (
            <Aside>
                <Sidebar>
                    <SidebarHeader>Related links</SidebarHeader>
                    <SidebarItem>
                        <a
                            href="http://www.alpine-rescue.org/xCMS5/WebObjects/nexus5.woa/wa/icar?menuid=1088"
                            target="ICAR">
                            ICAR Glossary
                        </a>
                    </SidebarItem>
                    <SidebarItem>
                        <a
                            href="http://avalanche.ca/fxresources/AvalancheLexiqueLexicon.pdf"
                            target="LexiqueLexicon">
                            Lexique Avalanche - Avalanche Lexicon
                        </a>
                    </SidebarItem>
                </Sidebar>
            </Aside>
        )
    }
}

class Glossary extends Component {
    renderContent = ({ document, loading }) => {
        return (
            <Fragment>
                <Loading show={loading} />
                {document && (
                    <GlossaryContent {...this.props} {...document.data} />
                )}
            </Fragment>
        )
    }
    render() {
        return (
            <Document {...glossary.glossary()}>{this.renderContent}</Document>
        )
    }
}

// Utils
class Definition extends Component {
    static propTypes = {
        uid: PropTypes.string.isRequired,
    }
    renderContent = ({ loading, document }) => {
        return (
            <Fragment>
                <Loading show={loading} />
                {document && <DefinitionLayout linkToExternal {...document} />}
            </Fragment>
        )
    }
    render() {
        return (
            <Document {...glossary.definition(this.props.uid)}>
                {this.renderContent}
            </Document>
        )
    }
}

class DefinitionLayout extends PureComponent {
    static propTypes = {
        linkToExternal: PropTypes.bool,
        uid: PropTypes.string.isRequired,
        tags: PropTypes.array.isRequired,
        data: PropTypes.object.isRequired,
    }
    render() {
        const { uid, tags, data, linkToExternal } = this.props
        const { title } = data

        return (
            <article className={styles.Definition}>
                <h2>
                    {linkToExternal ? (
                        title
                    ) : (
                        <a href={`#${uid}`} name={uid}>
                            {title}
                        </a>
                    )}
                </h2>
                {tags.length > 0 && (
                    <TagSet>
                        {tags.map((tag, index) => (
                            <Tag key={index}>{tag}</Tag>
                        ))}
                    </TagSet>
                )}
                <SliceZone
                    components={SliceComponents}
                    value={data.content.filter(isImage)}
                    fullscreen
                />
                <SliceZone
                    components={SliceComponents}
                    value={data.content.filter(isNotImage)}
                />
                <Related linkToExternal={linkToExternal} items={data.related} />
            </article>
        )
    }
}

class Related extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
        linkToExternal: PropTypes.bool,
    }
    renderItem({ definition }) {
        if (definition.value.isBroken) {
            return null
        }

        const { linkToExternal } = this.props
        const { uid, data } = definition.value.document
        const title = data.definition.title.value

        return (
            <li key={uid}>
                {linkToExternal ? (
                    <Link to={`../${uid}`} title={title}>
                        {title}
                    </Link>
                ) : (
                    <a href={`#${uid}`} title={title}>
                        {title}
                    </a>
                )}
            </li>
        )
    }
    render() {
        const items = this.props.items.filter(hasDefinition)

        return items.length === 0 ? null : (
            <div>
                <Muted>See also: </Muted>
                <ul>{items.map(this.renderItem, this)}</ul>
            </div>
        )
    }
}

class LetterTag extends PureComponent {
    static propTypes = {
        letter: PropTypes.string.isRequired,
    }
    render() {
        const { letter } = this.props

        return (
            <Tag key={letter}>
                <a href={`#${letter.toLowerCase()}`}>
                    <b>{letter.toUpperCase()}</b>
                </a>
            </Tag>
        )
    }
}

class GlossaryContent extends Component {
    static propTypes = {
        headline: PropTypes.arrayOf(PropTypes.object).isRequired,
        location: PropTypes.object.isRequired,
        navigate: PropTypes.func.isRequired,
    }
    get q() {
        const params = new URLSearchParams(this.props.location.search)

        return params.has('q') ? params.get('q') : ''
    }
    handleSearchChange = q => {
        this.props.navigate(q ? `?q=${q}` : '')
    }
    renderSection({ letter, definitions }) {
        return (
            <section key={letter} className={styles.Section}>
                <h1>
                    <a
                        href={`#${letter.toLowerCase()}`}
                        name={letter.toLowerCase()}>
                        {letter}
                    </a>
                </h1>
                {definitions.map(definition => (
                    <DefinitionLayout key={definition.uid} {...definition} />
                ))}
            </section>
        )
    }
    filter = memoize(documents => {
        const definitions = filter(documents, this.q)

        return new Map(definitions.map(document => [document.uid, document]))
    })
    createSections = memoize(documents => {
        const sections = LETTERS.reduce((sections, letter) => {
            const definitions = this.props[letter.toLowerCase()]
                .filter(hasDefinition)
                .map(({ definition }) =>
                    documents.get(definition.value.document.uid)
                )
                .filter(Boolean)

            if (definitions.length > 0) {
                sections.push({
                    letter,
                    definitions,
                })
            }

            return sections
        }, [])

        return sections
    })
    renderContent = ({ documents = [], loading }) => {
        const filtered = this.filter(documents)

        if (documents.length === 0) {
            this.filter.cache.clear()
        }
        const sections = this.createSections(filtered)

        return (
            <Fragment>
                {loading ? (
                    <Loading>Loading definitions...</Loading>
                ) : documents && sections.length === 0 ? (
                    <Muted>No definition matches your criteria.</Muted>
                ) : null}
                <TagSet>
                    {sections.map(({ letter }) => (
                        <LetterTag key={letter} letter={letter} />
                    ))}
                </TagSet>
                {sections.map(this.renderSection)}
            </Fragment>
        )
    }
    render() {
        return (
            <Fragment>
                <Headline>
                    <StructuredText value={this.props.headline} />
                </Headline>
                <Search
                    onChange={this.handleSearchChange}
                    value={this.q}
                    placeholder="Search for a definition"
                />
                <Documents {...glossary.definitions()}>
                    {this.renderContent}
                </Documents>
            </Fragment>
        )
    }
}

// Constants
const LETTERS = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')

// Utils
function hasDefinition({ definition }) {
    return Boolean(definition)
}
function isText({ type }) {
    return type === 'text'
}
function isImage({ type }) {
    return type === 'image'
}
function isNotImage({ type }) {
    return type !== 'image'
}
function filter(definitions, term) {
    if (!term) {
        return definitions
    }

    const regexp = new RegExp(term, 'gi')

    return definitions.filter(
        doc =>
            regexp.test(doc.data.title) ||
            doc.data.related
                .filter(hasDefinition)
                .some(doc =>
                    regexp.test(
                        doc.definition.value.document.data.definition.title
                            .value
                    )
                ) ||
            doc.data.content
                .filter(isText)
                .some(({ nonRepeat }) =>
                    nonRepeat.content.some(({ text }) => regexp.test(text))
                ) ||
            doc.data.content
                .filter(isImage)
                .filter(({ nonRepeat }) => Boolean(nonRepeat.caption))
                .some(({ nonRepeat }) =>
                    nonRepeat.caption.some(({ text }) => regexp.test(text))
                ) ||
            doc.tags.some(regexp.test, regexp)
    )
}
