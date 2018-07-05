import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import * as Containers from 'prismic/containers'
import * as Page from 'components/page'
import Tree, { Node } from 'components/tree'
import * as LocaleContext from 'contexts/locale'
import { SliceZone, StructuredText } from 'prismic/components/base'
import SliceComponents from 'prismic/components/slice/rework'
import { Status } from 'components/misc'
import Pager, { Previous, Next } from 'components/pager'
import { Window } from 'components/Dimensions'
import Shim from 'components/Shim'
import Drawer, { Close, Body, Navbar } from 'components/page/drawer'
import { Menu } from 'components/icons'
import Button, { SUBTILE } from 'components/button'
import { FR, EN } from 'constants/locale'

const { Translate } = LocaleContext

export default class Layout extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
    }
    state = {
        locale: getLocaleFromMatch(this.props.match),
        dictionnaries: new Map([
            [EN, new Map()],
            [
                FR,
                new Map([
                    ['Start with', 'Débuter avec'],
                    ['Next', 'Suivant'],
                    ['Previous', 'Précédent'],
                    ['Back to', 'De retour au'],
                    ['The subjects', 'Les sujets'],
                    ['Loading...', 'Chargement du tutoriel...'],
                ]),
            ],
        ]),
    }
    componentsWillReceiveProps({ match }) {
        if (match.path !== this.props.match.path) {
            this.setState({
                locale: getLocaleFromMatch(match),
            })
        }
    }
    renderContent({ status, document }) {
        return (
            <Fragment>
                <Status {...status} />
                {document && (
                    <Fragment>
                        <Sidebar items={document.data.items} />
                        <Content />
                    </Fragment>
                )}
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
    state = {
        open: false,
    }
    toggleDrawer = () => this.setState(toggleDrawer)
    closeDrawer = () => this.setState({ open: false })
    render() {
        const nodes = this.props.items
            .reduce(reduceTreeNode, [])
            .map(node => renderTreeNode(node))

        return (
            <Window>
                {({ width }) => {
                    return width > 860 ? (
                        <Page.Aside style={ASIDE_STYLE}>
                            <Shim vertical right>
                                <Tree>{nodes}</Tree>
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
                                <Navbar style={NAVBAR_STYLE}>
                                    <h3>
                                        <Translate>The subjects</Translate>
                                    </h3>
                                    <Close onClick={this.closeDrawer} />
                                </Navbar>
                                <Body>
                                    <Tree>{nodes}</Tree>
                                </Body>
                            </Drawer>
                        </Fragment>
                    )
                }}
            </Window>
        )
    }
}

function Content({ match }) {
    return (
        <Page.Main style={CONTENT_STYLE}>
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
                <StructuredText value={document.data.title} />
                <SliceZone
                    components={SliceComponents}
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
            <LocaleContext.Consumer>
                {({ locale }) => (
                    <Containers.Tutorial locale={locale}>
                        {this.renderContent}
                    </Containers.Tutorial>
                )}
            </LocaleContext.Consumer>
        )
    }
}

class Tutorial extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
    }
    get uid() {
        const [uid] = this.props.match.params.uids.split('/').reverse()

        return uid
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

        return (
            <Pager>
                <Previous
                    to={previous ? buildNodeLink(previous, items) : match.url}
                    subtitle={
                        previous ? (
                            <Translate>Previous</Translate>
                        ) : (
                            <Translate>Back to</Translate>
                        )
                    }>
                    {previous ? previous.title : title[0].text}
                </Previous>
                {next && (
                    <Next
                        subtitle={<Translate>Next</Translate>}
                        to={buildNodeLink(next, items)}>
                        {next.title}
                    </Next>
                )}
            </Pager>
        )
    }
    renderContent = ({ status, document }) => {
        return (
            <Fragment>
                <Status {...status} />
                {document ? (
                    <Fragment>
                        <StructuredText value={document.data.title} />
                        <SliceZone
                            components={SliceComponents}
                            value={document.data.content}
                        />
                        <LocaleContext.Locale>
                            {locale => (
                                <Containers.Tutorial locale={locale}>
                                    {this.renderPager}
                                </Containers.Tutorial>
                            )}
                        </LocaleContext.Locale>
                    </Fragment>
                ) : null}
            </Fragment>
        )
    }
    render() {
        return (
            <Containers.TutorialArticle uid={this.uid}>
                {this.renderContent}
            </Containers.TutorialArticle>
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
        // TODO: Consider root
        <Node key={uid} link={`/tutorial/${splat}`} label={title} title={title}>
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
function buildNodeLink(node, items) {
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

    // TODO: Consider root
    return `/tutorial/${uids.join('/')}`
}
function toggleDrawer({ open }) {
    return {
        open: !open,
    }
}
function getLocaleFromMatch({ path }) {
    return path === '/tutoriel' ? FR : EN
}

// Styles
const NAVBAR_STYLE = {
    justifyContent: 'space-between',
}
const ASIDE_STYLE = {
    width: 350,
    flex: 'none',
}
const CONTENT_STYLE = {
    flex: 1,
}
