import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import * as Containers from 'prismic/containers'
import * as Page from 'components/page'
import Tree, { Node } from 'components/tree'
import { SliceZone, StructuredText } from 'prismic/components/base'
import * as LocaleContext from 'contexts/locale'
import SliceComponents from 'prismic/components/slice/rework'
import { Status } from 'components/misc'
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
    renderContent = ({ status, document }) => {
        return (
            <Fragment>
                <Status {...status}>
                    {document && (
                        <Fragment>
                            <Sidebar
                                location={this.props.location}
                                items={document.data.items}
                                title={document.data.title[0].text}
                            />
                            <Content match={this.props.match}>
                                <StructuredText value={document.data.title} />
                            </Content>
                        </Fragment>
                    )}
                </Status>
            </Fragment>
        )
    }
    render() {
        return (
            <Page.Page>
                <Page.Content>
                    <LocaleContext.Provider value={this.state}>
                        <Containers.Tutorial locale={this.state.locale}>
                            {this.renderContent}
                        </Containers.Tutorial>
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
                            <Shim top>
                                <Button
                                    kind={SUBTILE}
                                    onClick={this.toggleDrawer}>
                                    <Menu />
                                </Button>
                            </Shim>
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
function Content({ children, match }) {
    return (
        <Page.Main style={CONTENT_STYLE}>
            {children}
            <Switch>
                <Route exact path={match.path} component={Home} />
                <Route path={`${match.path}/:uids+`} component={Tutorial} />
            </Switch>
        </Page.Main>
    )
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
                    <Containers.Tutorial locale={locale}>
                        {this.renderContent}
                    </Containers.Tutorial>
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
                            : match.url
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
                <StructuredText value={data.title} />
                <SliceZone
                    components={TutorialSliceComponents}
                    value={data.content}
                />
                <LocaleContext.Locale>
                    {locale => (
                        <Containers.Tutorial locale={locale}>
                            {this.renderPager}
                        </Containers.Tutorial>
                    )}
                </LocaleContext.Locale>
            </Fragment>
        )
    }
    renderContent = ({ status, document }) => {
        return (
            <Fragment>
                <Status {...status}>
                    {document ? (
                        this.renderTutorial(document)
                    ) : (
                        <NoDocument uid={this.uid} />
                    )}
                </Status>
            </Fragment>
        )
    }
    render() {
        return (
            <LocaleContext.Locale>
                {locale => (
                    <Containers.TutorialArticle uid={this.uid} locale={locale}>
                        {this.renderContent}
                    </Containers.TutorialArticle>
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
                    <Containers.Tutorial locale={locale}>
                        {props => this.renderContent(props, locale)}
                    </Containers.Tutorial>
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
            nodes[nodes.length - 1].children.push(node)
            break
        default:
            pushNode(node, deep - 1, nodes[nodes.length - 1].children)
    }
    return nodes
}
function buildNodeLink(node, items, root) {
    let level = Number(node.level) - 1
    const index = items.indexOf(node)
    const uids = [getUIDFromMenuItem(node)]
    const previousItems = items.slice(0, index).reverse()

    while (level > 0) {
        for (node of previousItems) {
            if (node.level == level) {
                level = level - 1
                uids.unshift(getUIDFromMenuItem(node))
            }
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

// Components
const { Translate } = LocaleContext
const TutorialSliceComponents = new Map([
    ...SliceComponents,
    ['atesExercise', ATESExercise],
    ['routeFindingExercise', RouteFindingExercise],
    ['quiz', Quiz],
    ['question', Question],
])
