import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Page, Content } from 'components/page'
import Tree, { Node } from 'components/tree'
import { TutorialPage, FrenchTutorial } from 'prismic/containers'
import { SliceZone, StructuredText } from 'prismic/components/base'
import SliceComponents from 'prismic/components/slice/rework'
import { Status } from 'components/misc'
import Pager, { Previous, Next } from 'components/pager'
import styles from '../tutorial/Tutorial.css'

export default class Layout extends Component {
    renderContent({ status, document }) {
        return (
            <Fragment>
                <Status {...status} messages={MESSAGES} />
                {document && (
                    <Fragment>
                        <div className={styles.Sidebar}>
                            <TutorialTree items={document.data.items} />
                        </div>
                        <div className={styles.Content}>
                            <Switch>
                                <Route
                                    exact
                                    path="/tutoriel"
                                    component={Home}
                                />
                                <Route
                                    path="/tutoriel/:uids+"
                                    component={Tutoriel}
                                />
                            </Switch>
                        </div>
                    </Fragment>
                )}
            </Fragment>
        )
    }
    render() {
        return (
            <Page>
                <Content>
                    <FrenchTutorial>{this.renderContent}</FrenchTutorial>
                </Content>
            </Page>
        )
    }
}

class TutorialTree extends Component {
    render() {
        const { items } = this.props

        return (
            <Tree>
                {items
                    .reduce(reduceTreeNode, [])
                    .map(node => renderTreeNode(node))}
            </Tree>
        )
    }
}

class Home extends Component {
    renderContent({ document }) {
        if (!document) {
            return null
        }

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
                        to={`/tutoriel/${getUID(first)}`}
                        subtitle="Commencer avec">
                        {first.title}
                    </Next>
                </Pager>
            </Fragment>
        )
    }
    render() {
        return (
            <FrenchTutorial>
                {props => this.renderContent(props)}
            </FrenchTutorial>
        )
    }
}

class Tutoriel extends Component {
    get uid() {
        const [uid] = this.props.match.params.uids.split('/').reverse()

        return uid
    }
    renderPager = ({ document }) => {
        if (!document) {
            return null
        }

        const { items, title } = document.data
        const { uid } = this
        const item = items.find(item => getUID(item) === uid)
        const index = items.indexOf(item)
        const previous = items[index - 1]
        const next = items[index + 1]

        return (
            <Pager>
                <Previous
                    to={previous ? buildNodeLink(previous, items) : '/tutoriel'}
                    subtitle={previous ? 'Précédent' : 'De retour au'}>
                    {previous ? previous.title : title[0].text}
                </Previous>
                {next && (
                    <Next subtitle="Suivant" to={buildNodeLink(next, items)}>
                        {next.title}
                    </Next>
                )}
            </Pager>
        )
    }
    renderContent({ status, document }) {
        return (
            <Fragment>
                <Status {...status} messages={MESSAGES} />
                {document ? (
                    <Fragment>
                        <StructuredText value={document.data.title} />
                        <SliceZone
                            components={SliceComponents}
                            value={document.data.content}
                        />
                        <FrenchTutorial>{this.renderPager}</FrenchTutorial>
                    </Fragment>
                ) : null}
            </Fragment>
        )
    }
    render() {
        return (
            <TutorialPage uid={this.uid}>
                {props => this.renderContent(props)}
            </TutorialPage>
        )
    }
}

// Constants
const MESSAGES = {
    isLoading: 'Chargment du tutoriel...',
}

// Utils
function getUID({ link }) {
    return link.value.document.uid
}
function renderTreeNode({ title, link, children }, splat) {
    const { uid } = link.value.document
    const uids = [splat, uid].filter(Boolean)

    splat = uids.join('/')

    return (
        <Node key={uid} link={`/tutoriel/${splat}`} label={title}>
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
    const uids = [getUID(node)]
    const previousItems = items.slice(0, index).reverse()

    while (level > 0) {
        for (node of previousItems) {
            if (node.level == level) {
                level = level - 1
                uids.unshift(getUID(node))
            }
        }
    }

    return `/tutoriel/${uids.join('/')}`
}
