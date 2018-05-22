import React, { Component, PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import debounce from 'lodash/debounce'
import { Page, Main, Content, Header, Headline, Aside } from 'components/page'
import Sidebar, {
    Item as SidebarItem,
    Header as SidebarHeader,
} from 'components/sidebar'
import { Status } from 'components/misc'
import { TagSet, Tag } from 'components/tag'
import { Muted } from 'components/text'
import { Close } from 'components/button'
import { Control } from 'components/form'
import { scrollIntoView } from 'utils/dom'
import { Document, DocumentsContainer } from 'prismic/containers'
import { StructuredText, SliceZone } from 'prismic/components/base'
import * as Predicates from 'vendor/prismic/predicates'
import { GLOSSARY, DEFINITION } from 'constants/prismic'

export default class Layout extends Component {
    renderGlossary() {
        return (
            <Page>
                <Header title="Glossary" />
                <Content>
                    <Main>
                        <p>Glossary content</p>
                        {/* <Glossary /> */}
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
                {document && <Glossary {...document.data} />}
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
function Section({ letter, definitions }) {
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
                .filter(({ definition }) => Boolean(definition))
                .map(({ definition }, index) => {
                    return <Term key={index} {...definition.value.document} />
                })}
        </section>
    )
}

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
                        <SliceZone
                            components={new Map()}
                            value={document.data.content}
                        />
                        {document.tags.length > 0 && (
                            <TagSet>
                                {document.tags.map((tag, index) => (
                                    <Tag key={index}>{tag}</Tag>
                                ))}
                            </TagSet>
                        )}
                        <Related items={document.data.related} />
                    </Fragment>
                )}
            </Fragment>
        )
    }
    render() {
        return (
            <Document parse type={DEFINITION} uid={this.props.uid}>
                {this.renderContent}
            </Document>
        )
    }
}

function Related({ items = [] }) {
    const terms = items.filter(({ definition }) => Boolean(definition))

    if (terms.length === 0) {
        return null
    }

    return (
        <div>
            <Muted>See also: </Muted>
            <ul>
                {terms.map(({ definition }) => {
                    const { uid, data } = definition.value.document

                    return (
                        <li key={uid}>
                            <a href={`#${uid}`}>
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
    renderDefinitions = (props = {}) => {
        const { ids } = props
        const sections = this.props.body
            .map(({ repeat, nonRepeat }) => ({
                letter: nonRepeat.letter,
                definitions: ids
                    ? repeat.filter(({ definition }) =>
                          ids.has(definition.value.document.id)
                      )
                    : repeat,
            }))
            .filter(({ definitions }) => definitions.length > 0)

        if (sections.length === 0) {
            return <Muted>No definitions match your criteria.</Muted>
        }

        return (
            <Fragment>
                <TagSet>
                    {sections.map(({ letter }) => (
                        <Letter key={letter} letter={letter} />
                    ))}
                </TagSet>
                {sections.map(({ letter, definitions }) => (
                    <Section
                        key={letter}
                        letter={letter}
                        definitions={definitions}
                    />
                ))}
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
                <Search onChange={this.handleSearchChange} value={search} />
                <DefinitionsContainer search={search}>
                    {this.renderDefinitions}
                </DefinitionsContainer>
            </Fragment>
        )
    }
}

class Search extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
    }
    state = {
        value: '',
    }
    setRef = input => (this.input = input)
    sendChange = debounce(() => {
        this.props.onChange(this.state.value)
    }, 350)
    handleReset = () => {
        this.setState({ value: '' }, () => {
            this.input.focus()
            this.props.onChange()
        })
    }
    handleChange = event => {
        const { value } = event.target

        this.setState({ value }, this.sendChange)
    }
    render() {
        const { value } = this.state

        return (
            <Control horizontal bordered>
                <input
                    ref={this.setRef}
                    name="search"
                    type="search"
                    placeholder="Search for a definition"
                    value={value}
                    onChange={this.handleChange}
                />
                {value && <Close onClick={this.handleReset} />}
            </Control>
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
const GLOSSARY_OPTIONS = {
    fetchLinks: 'definition.title,definition.content',
}
const DEFINTION_OPTIONS = {
    fetchLinks: 'definition.title',
}
