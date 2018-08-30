import React, { Component, PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Link, withRouter } from 'react-router-dom'
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
import { Document, Documents } from 'prismic/new-containers'
import { glossary } from 'prismic/params'
import { StructuredText, SliceZone } from 'prismic/components/base'
import SliceComponents from 'prismic/components/slice/rework'
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
    renderContent = ({ document, loading }) => {
        return (
            <Fragment>
                <Loading show={loading} />
                {document && <GlossaryContent {...document.data} />}
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
                {document && <DefinitionLayout {...document.data} />}
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
    renderContent = ({ documents = [], loading }) => {
        const filtered = this.filter(this.state.filterText, documents)

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
                    onChange={this.handleFilterTextChange}
                    value={this.state.filterText}
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
