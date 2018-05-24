import React, { Component, PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Link } from 'react-router-dom'
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
                options={GLOSSARY_OPTIONS}>
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
                {document && (
                    <Fragment>
                        <h2>
                            <Switch>
                                <Route exact path="/glossary">
                                    <a href={`#${document.uid}`}>
                                        {document.data.title}
                                    </a>
                                </Route>
                                <Route render={() => document.data.title} />
                            </Switch>
                        </h2>
                        {document.tags.length > 0 && (
                            <TagSet>
                                {document.tags.map((tag, index) => (
                                    <Tag key={index}>{tag}</Tag>
                                ))}
                            </TagSet>
                        )}
                        <SliceZone
                            components={SliceComponents}
                            value={document.data.content}
                        />
                        <Related items={document.data.related} />
                    </Fragment>
                )}
            </Fragment>
        )
    }
    render() {
        return (
            <Document
                parse
                type={DEFINITION}
                uid={this.props.uid}
                options={DEFINTION_OPTIONS}>
                {this.renderContent}
            </Document>
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
    getDefintions(letter) {
        return this.props[letter.toLowerCase()].filter(hasDefinition)
    }
    renderSection(letter) {
        const definitions = this.getDefintions(letter)

        if (definitions.length === 0) {
            return null
        }

        return (
            <section key={letter}>
                <h1>
                    <a href={`#${letter}`} name={letter}>
                        {letter}
                    </a>
                </h1>
                {definitions
                    .map(definition => definition.definition.value.document.uid)
                    .map(this.renderDefinition)}
            </section>
        )
    }
    renderLetterTag(letter) {
        const { length } = this.getDefintions(letter)

        return length === 0 ? null : <LetterTag key={letter} letter={letter} />
    }
    renderDefinition(uid) {
        return <Definition key={uid} uid={uid} />
    }
    render() {
        return (
            <Fragment>
                <Headline>
                    <StructuredText value={this.props.headline} />
                </Headline>
                <Search
                    onChange={this.handleSearchChange}
                    value={this.state.search}
                    placeholder="Search for a definition"
                />
                <TagSet>{LETTERS.map(this.renderLetterTag, this)}</TagSet>
                {LETTERS.map(this.renderSection, this)}
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
        const { search } = this.props

        return search
            ? {
                  predicates: [
                      Predicates.fulltext('document', search),
                      Predicates.type(DEFINITION),
                  ],
                  options: DEFINTION_OPTIONS,
              }
            : null
    }
    children = ({ metadata, status }) =>
        this.props.children({
            ids: status.isLoaded ? new Set(metadata.ids.toArray()) : undefined,
        })
    render() {
        const { params } = this

        return params ? (
            <DocumentsContainer params={params}>
                {this.children}
            </DocumentsContainer>
        ) : (
            this.props.children()
        )
    }
}

// Constants
const LETTERS = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
const GLOSSARY_OPTIONS = {
    fetchLinks: 'definition.title',
}
const DEFINTION_OPTIONS = {
    fetchLinks: 'definition.title',
}

// Utils
function hasDefinition({ definition }) {
    return Boolean(definition)
}
