import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Router, Link } from '@reach/router'
import memoize from 'lodash/memoize'
import throttle from 'lodash/throttle'
import { Page, Main, Content, Header, Headline, Aside } from 'components/page'
import Sidebar, {
    Item as SidebarItem,
    Header as SidebarHeader,
} from 'components/sidebar'
import { FragmentIdentifier } from 'router'
import { Loading } from 'components/text'
import { TagSet, Tag } from 'components/tag'
import { Muted } from 'components/text'
import { Search } from 'components/form'
import StaticComponent from 'components/StaticComponent'
import { Document, Documents, Pages } from 'prismic/containers'
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
                <Aside>
                    <Router primary={false}>
                        <GlossarySidebar path="/" />
                    </Router>
                </Aside>
            </Content>
        </Page>
    )
}

class GlossarySidebar extends StaticComponent {
    render() {
        return (
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

class DefinitionLayout extends StaticComponent {
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
                        <FragmentIdentifier hash={uid} title={title}>
                            {title}
                        </FragmentIdentifier>
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

class LetterTag extends StaticComponent {
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
    get term() {
        const params = new URLSearchParams(this.props.location.search)

        return params.has('q') ? params.get('q') : ''
    }
    shouldComponentUpdate({ location }) {
        return location.search !== this.props.location.search
    }
    handleSearchChange = throttle(term => {
        const params = new URLSearchParams()

        if (term) {
            params.set('q', term)
        }

        this.props.navigate(`?${params.toString()}`)
    }, 250)
    createSections = memoize(pages => {
        const documents = pages.reduce(
            (documents, page) => [...documents, ...(page?.documents || [])],
            []
        )
        const allDefinitions = new Map(
            documents.map(document => [
                document.uid,
                createDefinition(document),
            ])
        )

        return LETTERS.reduce((sections, letter) => {
            const definitions = this.props[letter.toLowerCase()]
                .filter(hasDefinition)
                .map(({ definition }) =>
                    allDefinitions.get(definition.value.document.uid)
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
    })
    renderContent = pages => {
        let sections = []
        const loading = pages.some(page => page.loading)
        const { term } = this

        if (loading === false) {
            sections = this.createSections(pages)

            if (term) {
                sections = filterSections(term, sections)
            }
        }

        return (
            <Fragment>
                {loading ? (
                    <Loading>Loading definitions...</Loading>
                ) : sections.length === 0 ? (
                    <Muted>No definition matches your criteria.</Muted>
                ) : null}
                <TagSet>
                    {sections.map(({ letter }) => (
                        <LetterTag key={letter} letter={letter} />
                    ))}
                </TagSet>
                {sections.map(renderSection)}
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
                    value={this.term}
                    placeholder="Search for a definition"
                />
                <Pages {...glossary.definitions()} total={2}>
                    {this.renderContent}
                </Pages>
            </Fragment>
        )
    }
}

class Section extends Component {
    static propTypes = {
        letter: PropTypes.string.isRequired,
        definitions: PropTypes.array.isRequired,
    }
    render() {
        const { letter, definitions } = this.props

        if (definitions.length === 0) {
            return null
        }

        return (
            <section key={letter} className={styles.Section}>
                <h1>
                    <FragmentIdentifier hash={letter.toLowerCase()}>
                        {letter}
                    </FragmentIdentifier>
                </h1>
                {definitions.map(definition => (
                    <DefinitionLayout key={definition.uid} {...definition} />
                ))}
            </section>
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
function renderSection(props) {
    return <Section key={props.letter} {...props} />
}
function createDefinition(definition) {
    const { uid, data, tags } = definition

    return {
        ...definition,
        searchable:
            uid +
            data.title +
            data.related
                .filter(hasDefinition)
                .reduce(
                    (previous, current) =>
                        previous +
                        current.definition.value.document.data.definition.title
                            .value,
                    ''
                ) +
            data.content
                .filter(isText)
                .reduce(
                    (previous, current) =>
                        previous +
                        current.nonRepeat.content.reduce(
                            (previous, current) => previous + current.text,
                            previous
                        ),
                    ''
                ) +
            data.content
                .filter(isImage)
                .filter(({ nonRepeat }) => Boolean(nonRepeat.caption))
                .reduce(
                    (previous, current) =>
                        previous +
                        current.nonRepeat.caption.reduce(
                            (previous, current) => previous + current.text,
                            previous
                        ),
                    ''
                ) +
            tags.join(''),
    }
}
const filterSections = memoize((term, sections) => {
    const regexp = new RegExp(term, 'gi')
    function predicate(definition) {
        return regexp.test(definition.searchable)
    }

    return sections.reduce((sections, section) => {
        if (section.definitions.some(predicate)) {
            sections.push({
                ...section,
                definitions: section.definitions.filter(predicate),
            })
        }

        return sections
    }, [])
})
