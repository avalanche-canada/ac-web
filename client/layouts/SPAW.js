import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, Match, Redirect } from '@reach/router'
import { Danger, OneLiner } from 'components/alert'
import { StructuredText } from 'prismic/components/base'
import * as Pages from 'components/page'
import * as Sidebars from 'components/sidebar'
import * as Async from 'contexts/async'
import { Loading } from 'components/text'
import { Tag } from 'components/tag'
import { Page as PageLayout } from 'layouts/pages'
import { useVisibility } from 'hooks/session'
import { useSPAW } from 'prismic/hooks'
import * as url from 'utils/url'
import styles from './SPAW.css'

export default function SPAW() {
    const [document] = useSPAW()
    const [visible, hide] = useVisibility('spaw')

    if (!document || !visible) {
        return null
    }

    return (
        <Match path="/spaw/*">
            {({ match }) =>
                match ? null : <Alert onDismiss={hide} linkable></Alert>
            }
        </Match>
    )
}

Region.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
        .isRequired,
}

export function Region({ name, children }) {
    const [document] = useSPAW()

    return document?.data?.[name] === 'Yes'
        ? typeof children === 'function'
            ? children({ document })
            : children
        : null
}

Alert.propTypes = {
    children: PropTypes.node,
    linkable: PropTypes.bool,
}

export function Alert({ children, linkable, ...rest }) {
    const [spaw] = useSPAW()

    if (spaw && !children) {
        children = <StructuredText value={spaw.data.description} />
    }

    const alert = (
        <Danger {...rest}>
            <OneLiner>{children}</OneLiner>
        </Danger>
    )

    if (!linkable) {
        return alert
    }

    const to = url.path('/spaw', spaw?.uid)

    return <Link to={to}>{alert}</Link>
}

export function Page(props) {
    const uid = props['*']
    const value = useSPAW()
    const [spaw] = value

    if (!uid && spaw) {
        const to = '/spaw/' + spaw.uid

        return <Redirect to={to} />
    }

    return (
        <PageLayout>
            <Async.Provider value={value}>
                <Pages.Header
                    title={
                        <Fragment>
                            <Async.Found>
                                <Tag as="span" className={styles.Tag}>
                                    In effect
                                </Tag>
                            </Async.Found>
                            Special Public Avalanche Warning
                        </Fragment>
                    }
                />
                <Pages.Content>
                    <Pages.Main>
                        <Pages.Headline>
                            <Async.Pending>
                                <Loading />
                            </Async.Pending>
                            <Async.Empty>
                                There is currently no Special Public Avalanche
                                Warning in effect.
                            </Async.Empty>
                            <Async.Found>
                                {spaw => (
                                    <StructuredText
                                        value={spaw.data.description}
                                    />
                                )}
                            </Async.Found>
                        </Pages.Headline>
                        <Async.Found>
                            {spaw => (
                                <StructuredText value={spaw.data.content} />
                            )}
                        </Async.Found>
                    </Pages.Main>
                    <Pages.Aside>
                        <Sidebars.Sidebar>
                            {/* <Sidebars.Item>
                                    <Link to="/spaw/faq">What is a SPAW?</Link>
                                </Sidebars.Item> */}
                            <Sidebars.Contact />
                            <Async.Found>
                                <Sidebars.Share />
                            </Async.Found>
                        </Sidebars.Sidebar>
                    </Pages.Aside>
                </Pages.Content>
            </Async.Provider>
        </PageLayout>
    )
}
