import React, { Component, PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Link, withRouter } from 'react-router-dom'
import memoize from 'lodash/memoize'
import { parse } from 'prismic'
import { Page, Main, Content, Header, Headline, Aside } from 'components/page'
import Sidebar, {
    Item as SidebarItem,
    Header as SidebarHeader,
} from 'components/sidebar'
import { Status } from 'components/misc'
import { TagSet, Tag } from 'components/tag'
import { Muted } from 'components/text'
import { Search } from 'components/form'
import { Document, DocumentsContainer } from 'prismic/containers'
import { StructuredText, SliceZone } from 'prismic/components/base'
import * as Predicates from 'prismic/predicates'
import SliceComponents from 'prismic/components/slice/rework'
import { GLOSSARY, DEFINITION } from 'constants/prismic'
import * as utils from 'utils/search'
import styles from './Glossary.css'

export default class Layout extends Component {
    renderGlossary() {
        return (
            <Page>
                <Header title="Glossary" />
                <Content>
                    <Main>
                        <Glossary />
                    </Main>
                    <Aside>
                        <Sidebar>
                            <SidebarHeader>Related links</SidebarHeader>
                            <SidebarItem>
                                <a
                                    target="_blank"
                                    href="http://www.alpine-rescue.org/xCMS5/WebObjects/nexus5.woa/wa/icar?menuid=1088">
                                    ICAR Glossary
                                </a>
                            </SidebarItem>
                            <SidebarItem>
                                <a
                                    target="_blank"
                                    href="http://avalanche.ca/fxresources/AvalancheLexiqueLexicon.pdf">
                                    Lexique Avalanche - Avalanche Lexicon
                                </a>
                            </SidebarItem>
                        </Sidebar>
                    </Aside>
                </Content>
            </Page>
        )
    }
    renderDefinition({ match }) {
        return (
            <Page>
                <Header title="Glossary" />
                <Content>
                    <Main>
                        <Definition uid={match.params.uid} />
                    </Main>
                </Content>
            </Page>
        )
    }
    render() {
        return (
            <Switch>
                <Route exact path="/glossary" render={this.renderGlossary} />
                <Route
                    path="/glossary/terms/:uid"
                    render={this.renderDefinition}
                />
            </Switch>
        )
    }
}

class Glossary extends Component {
    renderContent = ({ document, status }) => {
        return (
            <Fragment>
                <Status {...status} />
                {document && <GlossaryContent {...document.data} />}
            </Fragment>
        )
    }
    render() {
        return (
            <Document
                parse
                type={GLOSSARY}
                uid="glossary"
                options={FETCH_DEFINITION_TITLE_OPTIONS}>
                {this.renderContent}
            </Document>
        )
    }
}

// Utils
class Definition extends Component {
    static propTypes = {
        uid: PropTypes.string.isRequired,
    }
    renderContent = ({ status, document }) => {
        return (
            <Fragment>
                <Status {...status} />
                {document && <DefinitionLayout {...document} />}
            </Fragment>
        )
    }
    render() {
        return (
            <Document
                parse
                type={DEFINITION}
                uid={this.props.uid}
                options={FETCH_DEFINITION_TITLE_OPTIONS}>
                {this.renderContent}
            </Document>
        )
    }
}

class DefinitionLayout extends PureComponent {
    render() {
        const { uid, tags, data } = this.props

        return (
            <article className={styles.Definition}>
                <h2>
                    <Switch>
                        <Route exact path="/glossary">
                            <a href={`#${uid}`}>{data.title}</a>
                        </Route>
                        <Route render={() => data.title} />
                    </Switch>
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
                <Related items={data.related} />
            </article>
        )
    }
}

class DefinitionLink extends Component {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
    }
    render() {
        const { uid, children, ...props } = this.props

        return (
            <Switch>
                <Route
                    path="/glossary/terms"
                    render={({ match }) => (
                        <Link to={`${match.path}/${uid}`} {...props}>
                            {children}
                        </Link>
                    )}
                />
                <Route
                    render={() => (
                        <Link to={`/glossary/#${uid}`} {...props}>
                            {children}
                        </Link>
                    )}
                />
            </Switch>
        )
    }
}

class Related extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
    }
    renderItem({ definition }) {
        if (definition.value.isBroken) {
            return null
        }

        const { uid, data } = definition.value.document
        const title = data.definition.title.value

        return (
            <li key={uid}>
                <DefinitionLink uid={uid} title={title}>
                    {title}
                </DefinitionLink>
            </li>
        )
    }
    render() {
        const items = this.props.items.filter(hasDefinition)

        return items.length === 0 ? null : (
            <div>
                <Muted>See also: </Muted>
                <ul>{items.map(this.renderItem)}</ul>
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

@withRouter
class GlossaryContent extends Component {
    static propTypes = {
        headline: PropTypes.arrayOf(PropTypes.object).isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    }
    state = {
        filterText: utils.parse(this.props.location.search).q || '',
    }
    componentDidMount() {
        this.unlisten = this.props.history.listen(this.handleHistoryChange)
    }
    componentWillUnmount() {
        this.unlisten()
    }
    handleHistoryChange = ({ search }) => {
        if (search === '') {
            this.resetFilterText()
        }
    }
    resetFilterText() {
        if (this.state.filterText === '') {
            return
        }

        this.handleFilterTextChange('')
    }
    handleFilterTextChange = filterText => {
        this.setState({ filterText }, () => {
            const q = filterText ? utils.stringify({ q: filterText }) : ''
            const path = this.props.location.pathname + q

            this.props.history.push(path, { q })
        })
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
    filter = memoize((term, documents) => {
        const definitions = filter(documents, term)

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
    renderContent = ({ documents, status }) => {
        const filtered = this.filter(this.state.filterText, documents)

        if (documents.length === 0) {
            this.filter.cache.clear()
        }
        const sections = this.createSections(filtered)

        return (
            <Fragment>
                <Status {...status} />
                {status.isLoaded &&
                    sections.length === 0 && (
                        <Muted>No definition matches your criteria.</Muted>
                    )}
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
                    onChange={this.handleFilterTextChange}
                    value={this.state.filterText}
                    placeholder="Search for a definition"
                />
                <DefinitionsContainer>
                    {this.renderContent}
                </DefinitionsContainer>
            </Fragment>
        )
    }
}

class DefinitionsContainer extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    get params() {
        return {
            predicates: [Predicates.type(DEFINITION)],
            options: FETCH_DEFINITION_TITLE_OPTIONS,
        }
    }
    parse = memoize(documents => documents.map(parse))
    render() {
        return (
            <DocumentsContainer params={this.params}>
                {props =>
                    this.props.children({
                        ...props,
                        documents: this.parse(props.documents),
                    })
                }
            </DocumentsContainer>
        )
    }
}

// Constants
const LETTERS = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
const FETCH_DEFINITION_TITLE_OPTIONS = {
    fetchLinks: 'definition.title',
    pageSize: 1000,
}

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
