import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ButtonSet } from 'components/button'
import { InnerHTML } from 'components/misc'
import { Credit } from 'components/markup'
import Page from './Page'
import Content from './Content'
import Main from './Main'
import styles from './Page.css'

export default class WorkInProgress extends PureComponent {
    static propTypes = {
        name: PropTypes.oneOf([PropTypes.string, PropTypes.func]).isRequired,
        oldUrl: PropTypes.oneOf([PropTypes.string, PropTypes.func]).isRequired,
        title: PropTypes.string,
        subtitle: PropTypes.string,
    }
    static defaultProps = {
        title: 'We are currently working on this page...',
        subtitle: 'For now, you can visit this page on our old website.',
    }
    get title() {
        const { title } = this.props

        if (typeof title === 'function') {
            return title(WorkInProgress.defaultProps.title)
        }

        return title
    }
    get subtitle() {
        const { subtitle } = this.props

        if (typeof subtitle === 'function') {
            return subtitle(WorkInProgress.defaultProps.subtitle)
        }

        return subtitle
    }
    render() {
        const { name, oldUrl } = this.props

        return (
            <Page className={styles.WorkInProgress}>
                <Content>
                    <Main>
                        <h1>
                            <InnerHTML>{this.title}</InnerHTML>
                        </h1>
                        <div>
                            <h2>
                                <InnerHTML>{this.subtitle}</InnerHTML>
                            </h2>
                            <ButtonSet>
                                <a
                                    href={oldUrl}
                                    target="_blank"
                                    className={styles.Link}>
                                    {name}
                                </a>
                            </ButtonSet>
                        </div>
                        <Credit>RavenEye Photography</Credit>
                    </Main>
                </Content>
            </Page>
        )
    }
}
