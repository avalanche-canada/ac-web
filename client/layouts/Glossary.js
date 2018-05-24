import React, { Component, PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Link } from 'react-router-dom'
import Fuse from 'fuse.js'
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
import * as Predicates from 'vendor/prismic/predicates'
import SliceComponents from 'prismic/components/slice/rework'
import { GLOSSARY, DEFINITION } from 'constants/prismic'

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
            <Fragment>
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
                        {tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
                    </TagSet>
                )}
                <SliceZone components={SliceComponents} value={data.content} />
                <Related items={data.related} />
            </Fragment>
        )
    }
}

class Related extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
    }
    renderItem({ definition }) {
        const { uid, data } = definition.value.document
        const title = data.definition.title.value

        return (
            <li key={uid}>
                <Switch>
                    {/* To handle URL schema */}
                    <Route
                        path="/glossary/terms"
                        render={({ match }) => (
                            <Link to={`${match.path}/${uid}`}>{title}</Link>
                        )}
                    />
                    <Route
                        render={({ match }) => (
                            <Link to={`${match.path}#${uid}`}>{title}</Link>
                        )}
                    />
                </Switch>
            </li>
        )
    }
    render() {
        const items = this.props.items.filter(hasDefinition)

        return items.length === 0 ? null : (
            <div>
                <Muted>See also: </Muted>
                <ul>{items.map(this.renderItem)}</ul>
                <Route>{this.renderList}</Route>
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
                <a href={`#${letter}`}>
                    <b>{letter}</b>
                </a>
            </Tag>
        )
    }
}

class GlossaryContent extends Component {
    state = {
        search: '',
    }
    handleSearchChange = (search = '') => {
        this.setState({ search })
    }
    renderSection({ letter, definitions }) {
        return (
            <section key={letter}>
                <h1>
                    <a href={`#${letter}`} name={letter}>
                        {letter}
                    </a>
                </h1>
                {definitions.map(definition => (
                    <DefinitionLayout key={definition.uid} {...definition} />
                ))}
            </section>
        )
    }
    renderContent = ({ documents, status }) => {
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
        const { search } = this.state

        return (
            <Fragment>
                <Headline>
                    <StructuredText value={this.props.headline} />
                </Headline>
                <Search
                    onChange={this.handleSearchChange}
                    value={search}
                    placeholder="Search for a definition"
                />
                <DefinitionsContainer search={search}>
                    {this.renderContent}
                </DefinitionsContainer>
            </Fragment>
        )
    }
}

class DefinitionsContainer extends Component {
    static propTypes = {
        search: PropTypes.string,
        children: PropTypes.func.isRequired,
    }
    get params() {
        return {
            predicates: [Predicates.type(DEFINITION)],
            options: FETCH_DEFINITION_TITLE_OPTIONS,
            pageSize: 100,
        }
    }
    children = ({ documents, status }) => {
        const { search } = this.props

        if (status.isLoaded) {
            documents = documents.map(parse)
            this.fuse = new Fuse(documents, {
                keys: [
                    'tags',
                    'data.title',
                    'data.content.nonRepeat.content.text',
                    'data.content.nonRepeat.caption.text',
                ],
            })
        }

        if (this.fuse && search) {
            documents = this.fuse.search(search)
        }

        return this.props.children({
            status,
            documents: new Map(
                documents.map(document => [document.uid, document])
            ),
        })
    }
    render() {
        return (
            <DocumentsContainer params={this.params}>
                {this.children}
            </DocumentsContainer>
        )
    }
}

// Constants
const LETTERS = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
const FETCH_DEFINITION_TITLE_OPTIONS = {
    fetchLinks: 'definition.title',
}

// Utils
function hasDefinition({ definition }) {
    return Boolean(definition)
}
