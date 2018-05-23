import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { Page, Main, Content, Header, Headline, Aside } from 'components/page'
import Sidebar, {
    Item as SidebarItem,
    Header as SidebarHeader,
} from 'components/sidebar'
import { Status } from 'components/misc'
import { TagSet, Tag } from 'components/tag'
import { Muted } from 'components/text'
import { Search } from 'components/form'
import { scrollIntoView } from 'utils/dom'
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
                        <h2>{document.data.title}</h2>
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

function Related({ items = [] }) {
    items = items.filter(({ definition }) => Boolean(definition))

    if (items.length === 0) {
        return null
    }

    return (
        <div>
            <Muted>See also: </Muted>
            <ul>
                {items.map(({ definition }) => {
                    const { uid, data } = definition.value.document

                    return (
                        <li key={uid}>
                            <a href={`/glossary/terms/${uid}`}>
                                {data.definition.title.value}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

function Letter({ letter }) {
    return (
        <Tag key={letter}>
            <a href={`#${letter}`} onClick={anchorClickHandler(letter)}>
                <b>{letter}</b>
            </a>
        </Tag>
    )
}

function anchorClickHandler(name) {
    return event => {
        event.stopPropagation()
        setTimeout(() => {
            scrollIntoView(`a[name="${name}"]`)
        }, 50)
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
                    <a
                        href={`#${letter}`}
                        name={letter}
                        onClick={anchorClickHandler(letter)}>
                        {letter}
                    </a>
                </h1>
                {definitions
                    .map(definition => definition.definition.value.document.uid)
                    .map(this.renderDefinition)}
            </section>
        )
    }
    renderLetter(letter) {
        const { length } = this.getDefintions(letter)

        return length === 0 ? null : <Letter key={letter} letter={letter} />
    }
    renderDefinition(uid) {
        return <Definition uid={uid} />
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
                <TagSet>{LETTERS.map(this.renderLetter, this)}</TagSet>
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
