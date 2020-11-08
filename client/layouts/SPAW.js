import React, { Fragment } from 'react'
import { Link, Match, Redirect } from '@reach/router'
import { Danger, OneLiner } from 'components/alert'
import { StructuredText } from 'prismic/components/base'
import * as Pages from 'components/page'
import * as Sidebars from 'components/sidebar'
import * as Async from 'contexts/async'
import { Loading } from 'components/text'
import { Tag as BaseTag } from 'components/tag'
import { Page as PageLayout } from 'layouts/pages'
import { useVisibility } from 'hooks/session'
import { useSPAW } from 'prismic/hooks'
import * as url from 'utils/url'
import styles from './SPAW.css'
import { FormattedMessage, useIntl } from 'react-intl'

export default function Alert() {
    const [spaw] = useSPAW()
    const [visible, hide] = useVisibility('spaw')

    if (!spaw || !visible) {
        return null
    }

    return (
        <Match path="/spaw/*">
            {({ match }) => {
                if (match) {
                    return null
                }

                return (
                    <Link to={url.path('/spaw', spaw.uid)}>
                        <Danger onDismiss={hide}>
                            <OneLiner>
                                <StructuredText value={spaw.data.description} />
                            </OneLiner>
                        </Danger>
                    </Link>
                )
            }}
        </Match>
    )
}

export function Page(props) {
    const uid = props['*']
    const value = useSPAW()
    const [spaw] = value

    if (spaw && spaw.uid !== uid) {
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
                                <Tag>
                                    <FormattedMessage
                                        description="in-effect"
                                        defaultMessage="In effect"
                                    />
                                </Tag>
                            </Async.Found>
                            <FormattedMessage
                                id="special-public-avalanche-warning"
                                defaultMessage="Special Public Avalanche Warning"
                            />
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
                                <FormattedMessage
                                    description="Layout SPAW"
                                    defaultMessage="There is currently no Special Public Avalanche Warning in effect."
                                />
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
                                <Link to="/spaw/faq">
                                    <FormattedMessage
                                        description="Layout SPAW"
                                        defaultMessage="What is a SPAW?"
                                    />
                                </Link>
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

export function Tag({ children, as = 'strong', region, ...props }) {
    const intl = useIntl()
    const title = intl.formatMessage({
        id: 'special-public-avalanche-warning',
        defaultMessage: 'Special Public Avalanche Warning',
    })

    if (region) {
        return (
            <Region id={region}>
                <Tag as={as} {...props}>
                    {children}
                </Tag>
            </Region>
        )
    }

    return (
        <BaseTag as={as} className={styles.Tag} {...props}>
            {children || (
                <FormattedMessage
                    description="Layout SPAW"
                    defaultMessage="<abbr>SPAW</abbr> In effect"
                    values={{
                        abbr(chunks) {
                            return <abbr title={title}>{chunks}</abbr>
                        },
                    }}
                />
            )}
        </BaseTag>
    )
}

// Utils
function Region({ id, children }) {
    const [document] = useSPAW()

    return document?.data?.[id] === 'Yes' ? children : null
}
