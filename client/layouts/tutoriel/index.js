import React, { Component, Fragment } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Page, Main, Content } from 'components/page'
import { Tree, TreeItem } from 'components/tree'
import { Tutoriel as Container, FrenchTutorial } from 'prismic/containers'
import { SliceZone } from 'prismic/components/base'
import Button from 'components/button'
import { Status } from 'components/misc'
import styles from '../tutorial/Tutorial.css'

const TUTORIAL_REGEX = new RegExp('^/tutoriel/')

export default class Layout extends Component {
    renderer = ({ status, document }) => (
        <Fragment>
            <Status {...status} messages={MESSAGES} />
            <div className={styles.Sidebar}>
                {document && (
                    <Route>
                        {({ location }) => (
                            <Tree>
                                {document.data.items.map(renderMenuItem)}
                            </Tree>
                        )}
                    </Route>
                )}
            </div>
            <div className={styles.Content}>
                <Switch>
                    <Route exact path="/tutoriel" component={Home} />
                    <Route component={Tutoriel} />
                </Switch>
            </div>
        </Fragment>
    )
    render() {
        return (
            <Page>
                <Content>
                    <Main>
                        <div className={styles.Page}>
                            <FrenchTutorial>{this.renderer}</FrenchTutorial>
                        </div>
                    </Main>
                </Content>
            </Page>
        )
    }
}

class Home extends Component {
    renderer = ({ document }) =>
        document ? <SliceZone value={document.data.content} /> : null
    render() {
        return (
            <Fragment>
                <FrenchTutorial>{this.renderer}</FrenchTutorial>
                <Link to="/tutoriel">Démarrer</Link>
            </Fragment>
        )
    }
}

function renderMenuItem({ level, title, link }) {
    const { uid } = link.value.document

    return (
        <TreeItem level={Number(level - 1)}>
            <Link to={`/tutoriel/${uid}`}>{title}</Link>
        </TreeItem>
    )
}

function Tutoriel({ location }) {
    const uid = location.pathname.replace(TUTORIAL_REGEX, '')

    return <Container uid={uid}>{renderTutoriel}</Container>
}

function renderTutoriel({ status, document }) {
    return (
        <Fragment>
            <Status {...status} />
            {document ? <Content {...document.data} /> : null}
        </Fragment>
    )
}

// Constants
const MESSAGES = {
    isLoading: 'Chargment du tutoriel...',
}
