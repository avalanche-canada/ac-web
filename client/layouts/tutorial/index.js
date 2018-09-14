import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { Document } from 'prismic/containers'
import { tutorial } from 'prismic/params'
import * as Page from 'components/page'
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

export default class Layout extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    }
    state = {
        locale: getLocaleFromMatch(this.props.match),
        dictionnaries,
    }
    componentWillReceiveProps({ match }) {
        if (match.path !== this.props.match.path) {
            this.setState({
                locale: getLocaleFromMatch(match),
            })
        }
    }
    renderContent = ({ loading, document }) => {
        const { match } = this.props

        return loading ? (
            <Loading />
        ) : document ? (
            <Fragment>
                <Sidebar
                    location={this.props.location}
                    items={document.data.items}
                    title={document.data.title[0].text}
                />
                <Content match={match}>
                    <h1>
                        {match.isExact ? (
                            document.data.title[0].text
                        ) : (
                            <Link to={match.path}>
                                {document.data.title[0].text}
                            </Link>
                        )}
                    </h1>
                </Content>
            </Fragment>
        ) : null
    }
    render() {
        return (
            <Page.Page>
                <Page.Content>
                    <LocaleContext.Provider value={this.state}>
                        <Document
                            {...tutorial.home()}
                            locale={this.state.locale}>
                            {this.renderContent}
                        </Document>
                    </LocaleContext.Provider>
                </Page.Content>
            </Page.Page>
        )
    }
}
class Sidebar extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
        location: PropTypes.object.isRequired,
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
        return (
            <Route>
                {({ match }) => (
                    <Tree>
                        {this.props.items
                            .reduce(reduceTreeNode, [])
                            .map(node => renderTreeNode(node, match.url))}
                    </Tree>
                )}
            </Route>
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
    redirect = ({ location, match }) => {
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

                            paths.push(match.path)

                            return <Redirect to={paths.reverse().join('/')} />
                        }}
                    </Document>
                )}
            </LocaleContext.Locale>
        ) : null
    }
    render() {
        const { children, match } = this.props

        return (
            <Page.Main style={CONTENT_STYLE}>
                {children}
                <Switch>
                    <Route exact path={match.path} component={Home} />
                    <Route path={`${match.path}/:uids+`} component={Tutorial} />
                </Switch>
                <Route exact path={match.path}>
                    {this.redirect}
                </Route>
            </Page.Main>
        )
    }
}

class Home extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
    }
    renderContent = ({ document }) => {
        if (!document) {
            return null
        }

        const { match } = this.props
        const [first] = document.data.items

        return (
            <Fragment>
                <SliceZone
                    components={TutorialSliceComponents}
                    value={document.data.content}
                />
                <Pager>
                    <Next
                        to={`${match.url}/${getUIDFromMenuItem(first)}`}
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
        match: PropTypes.object.isRequired,
    }
    get uid() {
        const parts = this.props.match.params.uids.split('/')

        return parts[parts.length - 1]
    }
    renderPager = ({ document }) => {
        if (!document) {
            return null
        }

        const { match } = this.props
        const { items, title } = document.data
        const { uid } = this
        const item = items.find(item => getUIDFromMenuItem(item) === uid)
        const index = items.indexOf(item)
        const previous = items[index - 1]
        const next = items[index + 1]
        const previousSubtitle = previous ? 'Previous' : 'Back to'
        const [root] = match.path.split('/').filter(Boolean)

        return (
            <Pager>
                <Previous
                    to={
                        previous
                            ? buildNodeLink(previous, items, `/${root}`)
                            : `/${root}`
                    }
                    subtitle={<Translate>{previousSubtitle}</Translate>}>
                    {previous ? previous.title : title[0].text}
                </Previous>
                {next && (
                    <Next
                        to={buildNodeLink(next, items, `/${root}`)}
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
    renderContent = ({ loading, document }) => {
        return loading ? (
            <Loading />
        ) : document ? (
            this.renderTutorial(document)
        ) : (
            <NoDocument uid={this.uid} />
        )
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
    renderContent({ document }, locale) {
        return (
            <Fragment>
                <Warning>
                    <Translate>There is no document for</Translate>{' '}
                    {this.getItemTitle(document)}.
                </Warning>
                <Pager>
                    <Next
                        to={locale === FR ? '/tutoriel' : '/tutorial'}
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
                        {props => this.renderContent(props, locale)}
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
    const previousItems = nodes.slice(0, index).reverse()

    for (node of previousItems.slice(
        Math.max(0, previousItems.length - level - 1)
    )) {
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
function getLocaleFromMatch(match) {
    return match.path === '/tutoriel' ? FR : EN
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

// Components
const { Translate } = LocaleContext
const TutorialSliceComponents = new Map([
    ...SliceComponents,
    ['atesExercise', ATESExercise],
    ['routeFindingExercise', RouteFindingExercise],
    ['quiz', Quiz],
    ['question', Question],
])
