import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Router, Link, Redirect, Location } from '@reach/router'
import { Document } from 'prismic/containers'
import { tutorial } from 'prismic/params'
import * as Page from 'components/page'
import Alert from 'components/highlight'
import Tree, { Node } from 'components/tree'
import { SliceZone } from 'prismic/components/base'
import * as LocaleContext from 'contexts/locale'
import SliceComponents from 'prismic/components/slice/rework'
import { Loading } from 'components/text'
import Pager, { Previous, Next } from 'components/pager'
import { Window } from 'components/Dimensions'
import Shim from 'components/Shim'
import Drawer, {
    Close,
    Body,
    Navbar,
    Header,
    Container,
} from 'components/page/drawer'
import { Menu } from 'components/icons'
import { Warning } from 'components/text'
import ATESExercise from './ATESExercise'
import RouteFindingExercise from './RouteFindingExercise'
import Quiz from './Quiz'
import Question from './Question'
import Button, { SUBTILE } from 'components/button'
import dictionnaries from './locales'
import { FR, EN } from 'constants/locale'

// TODO: Use Context to propagate the tutorial document
// TODO: Brings LocaleContext.Provider out of this layout...should be bring in the index file

export default class Layout extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
    }
    state = {
        locale: getLocaleFromProps(this.props),
        dictionnaries,
    }
    componentDidUpdate(nextProps) {
        if (nextProps['*'] !== this.props['*']) {
            this.setState({
                locale: getLocaleFromProps(this.props),
            })
        }
    }
    renderContent = ({ document }) => {
        const { path, uri } = this.props
        const isExact = path === uri
        const title = document?.data?.title[0]?.text

        return (
            <Fragment>
                <Sidebar
                    location={this.props.location}
                    items={document?.data?.items}
                    title={title}
                />
                <Content>
                    <h1>
                        {title ? (
                            isExact ? (
                                title
                            ) : (
                                <Link to={uri}>{title}</Link>
                            )
                        ) : (
                            <Loading />
                        )}
                    </h1>
                </Content>
            </Fragment>
        )
    }
    render() {
        const { locale } = this.state

        return (
            <Fragment>
                {locale === FR && (
                    <Alert style={ALERT_STYLE}>
                        Quelques sections de notre tutoriel ne sont pas à jour.
                        Revenez regulièrement pour consulter les améliorations
                        que nous y apportons.
                        <br />
                        Some sections of the French tutorial are outdated. We
                        are currently working on improvements so stay tuned for
                        updates!
                    </Alert>
                )}
                <Page.Page>
                    <Page.Content>
                        <LocaleContext.Provider value={this.state}>
                            <Document {...tutorial.home()} locale={locale}>
                                {this.renderContent}
                            </Document>
                        </LocaleContext.Provider>
                    </Page.Content>
                </Page.Page>
            </Fragment>
        )
    }
}
class Sidebar extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
        location: PropTypes.object.isRequired,
    }
    static defaultProps = {
        items: [],
    }
    state = {
        open: false,
    }
    componentWillReceiveProps({ location }) {
        if (location !== this.props.location) {
            this.closeDrawer()
        }
    }
    toggleDrawer = () => this.setState(toggleDrawer)
    closeDrawer = () => this.setState({ open: false })
    get tree() {
        const { path } = this.props

        return (
            <Tree>
                {this.props.items
                    .reduce(reduceTreeNode, [])
                    .map(node => renderTreeNode(node, path))}
            </Tree>
        )
    }
    render() {
        const { title } = this.props

        return (
            <Window>
                {({ width }) =>
                    width > 860 ? (
                        <Page.Aside style={ASIDE_STYLE}>
                            <Shim vertical right>
                                {this.tree}
                            </Shim>
                        </Page.Aside>
                    ) : (
                        <Fragment>
                            <Button
                                kind={SUBTILE}
                                onClick={this.toggleDrawer}
                                style={BUTTON_STYLE}>
                                <Menu />
                            </Button>
                            <Drawer
                                open={this.state.open}
                                width={0.75 * width}
                                backdrop
                                onCloseClick={this.closeDrawer}>
                                <Container>
                                    <Navbar>
                                        <Close onClick={this.closeDrawer} />
                                    </Navbar>
                                    <Header
                                        subject={title}
                                        style={HEADER_STYLE}
                                    />
                                    <Body>{this.tree}</Body>
                                </Container>
                            </Drawer>
                        </Fragment>
                    )
                }
            </Window>
        )
    }
}

class Content extends Component {
    redirect = ({ location }) => {
        const params = new URLSearchParams(location.search)

        return params.has('uid') ? (
            <LocaleContext.Locale>
                {locale => (
                    <Document {...tutorial.home()} locale={locale}>
                        {({ document }) => {
                            if (!document) {
                                return null
                            }

                            const uid = params.get('uid')
                            const { items } = document.data
                            function findByUID(item) {
                                return item.link.value.document.uid == uid
                            }

                            if (!items.some(findByUID)) {
                                return null
                            }

                            const index = items.findIndex(findByUID)
                            const paths = []
                            let level = Number(items[index].level)
                            function finder(item) {
                                return item.level == level
                            }
                            const usefullItems = items
                                .slice(0, index + 1)
                                .reverse()

                            do {
                                const item = usefullItems.find(finder)
                                const { uid } = item.link.value.document

                                paths.push(uid)

                                level = level - 1
                            } while (level > 0)

                            paths.push(location.pathname)

                            return <Redirect to={paths.reverse().join('/')} />
                        }}
                    </Document>
                )}
            </LocaleContext.Locale>
        ) : null
    }
    render() {
        const { children } = this.props

        return (
            <Page.Main style={CONTENT_STYLE}>
                {children}
                <Router>
                    <Home path="/" />
                    <Tutorial path="/*" />
                </Router>
                <Location>{this.redirect}</Location>
            </Page.Main>
        )
    }
}

class Home extends Component {
    renderContent = ({ document }) => {
        if (!document) {
            return null
        }

        const [first] = document.data.items

        return (
            <Fragment>
                <SliceZone
                    components={TutorialSliceComponents}
                    value={document.data.content}
                />
                <Pager>
                    <Next
                        to={`${getUIDFromMenuItem(first)}`}
                        subtitle={<Translate>Start with</Translate>}>
                        {first.title}
                    </Next>
                </Pager>
            </Fragment>
        )
    }
    render() {
        return (
            <LocaleContext.Locale>
                {locale => (
                    <Document {...tutorial.home()} locale={locale}>
                        {this.renderContent}
                    </Document>
                )}
            </LocaleContext.Locale>
        )
    }
}
class Tutorial extends Component {
    static propTypes = {
        ['*']: PropTypes.string.isRequired,
        uri: PropTypes.string.isRequired,
    }
    get uid() {
        const parts = this.props['*'].split('/')

        return parts[parts.length - 1]
    }
    renderPager = ({ document }) => {
        if (!document) {
            return null
        }

        const { items, title } = document.data
        const { uid } = this
        const item = items.find(item => getUIDFromMenuItem(item) === uid)
        const index = items.indexOf(item)
        const previous = items[index - 1]
        const next = items[index + 1]
        const previousSubtitle = previous ? 'Previous' : 'Back to'
        const { uri } = this.props

        return (
            <Pager>
                <Previous
                    to={previous ? buildNodeLink(previous, items, uri) : uri}
                    subtitle={<Translate>{previousSubtitle}</Translate>}>
                    {previous ? previous.title : title[0].text}
                </Previous>
                {next && (
                    <Next
                        to={buildNodeLink(next, items, uri)}
                        subtitle={<Translate>Next</Translate>}>
                        {next.title}
                    </Next>
                )}
            </Pager>
        )
    }
    renderTutorial({ data }) {
        return (
            <Fragment>
                <h2>{data.title[0].text}</h2>
                <SliceZone
                    components={TutorialSliceComponents}
                    value={data.content}
                />
                <LocaleContext.Locale>
                    {locale => (
                        <Document {...tutorial.home()} locale={locale}>
                            {this.renderPager}
                        </Document>
                    )}
                </LocaleContext.Locale>
            </Fragment>
        )
    }
    renderContent = ({ pending, fulfilled, document }) => {
        if (pending) {
            return (
                <h2>
                    <Loading />
                </h2>
            )
        }

        if (fulfilled) {
            return document ? (
                this.renderTutorial(document)
            ) : (
                <NoDocument uid={this.uid} uri={this.props.uri} />
            )
        }

        return null
    }
    render() {
        return (
            <LocaleContext.Locale>
                {locale => (
                    <Document {...tutorial.article(this.uid)} locale={locale}>
                        {this.renderContent}
                    </Document>
                )}
            </LocaleContext.Locale>
        )
    }
}
class NoDocument extends Component {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        uri: PropTypes.string.isRequired,
    }
    getTitle(document) {
        return document ? document.data.title[0].text : null
    }
    getItemTitle(document) {
        const { uid } = this.props

        if (!document) {
            return uid
        }

        const item = document.data.items.find(
            item => item.link.value.document.uid === uid
        )

        return item ? item.title : uid
    }
    renderContent = ({ document }) => {
        return (
            <Fragment>
                <Warning>
                    <Translate>There is no document for</Translate>{' '}
                    {this.getItemTitle(document)}.
                </Warning>
                <Pager>
                    <Next
                        to={this.props.uri}
                        subtitle={<Translate>Visit the</Translate>}>
                        {this.getTitle(document)}
                    </Next>
                </Pager>
            </Fragment>
        )
    }
    render() {
        return (
            <LocaleContext.Locale>
                {locale => (
                    <Document {...tutorial.home()} locale={locale}>
                        {this.renderContent}
                    </Document>
                )}
            </LocaleContext.Locale>
        )
    }
}

// Utils
function getUIDFromMenuItem({ link }) {
    return link.value.document.uid
}
function renderTreeNode({ title, link, children }, splat) {
    const { uid } = link.value.document
    const uids = [splat, uid].filter(Boolean)

    splat = uids.join('/')

    return (
        <Node key={uid} link={splat} label={title} title={title}>
            {children.map(node => renderTreeNode(node, splat))}
        </Node>
    )
}
function reduceTreeNode(nodes, item) {
    const { level, ...node } = item

    node.children = []

    return pushNode(node, Number(level) - 1, nodes)
}
function pushNode(node, deep, nodes) {
    switch (deep) {
        case 0:
            nodes.push(node)
            break
        case 1:
            if (nodes[nodes.length - 1]) {
                nodes[nodes.length - 1].children.push(node)
            }
            break
        default:
            if (nodes[nodes.length - 1]) {
                pushNode(node, deep - 1, nodes[nodes.length - 1].children)
            }
    }
    return nodes
}
function buildNodeLink(node, nodes, root) {
    let level = Number(node.level) - 1
    const index = nodes.indexOf(node)
    const uids = [getUIDFromMenuItem(node)]
    const previousItems = nodes.slice(0, index)

    previousItems.reverse()

    for (node of previousItems) {
        if (node.level == level) {
            level = level - 1
            uids.unshift(getUIDFromMenuItem(node))
        }
    }

    return [root, ...uids].join('/')
}
function toggleDrawer({ open }) {
    return {
        open: !open,
    }
}
function getLocaleFromProps({ uri }) {
    return uri === '/tutoriel' ? FR : EN
}

// Styles
const HEADER_STYLE = {
    paddingBottom: '1em',
}
const ASIDE_STYLE = {
    width: 350,
    flex: 'none',
}
const CONTENT_STYLE = {
    flex: 1,
}
const BUTTON_STYLE = {
    float: 'left',
    padding: '1em',
    position: 'relative',
    top: '-0.75em',
}
const ALERT_STYLE = {
    justifyContent: 'center',
    padding: '1em',
}

// Components
const { Translate } = LocaleContext
const TutorialSliceComponents = new Map([
    ...SliceComponents,
    ['atesExercise', ATESExercise],
    ['routeFindingExercise', RouteFindingExercise],
    ['quiz', Quiz],
    ['question', Question],
])
