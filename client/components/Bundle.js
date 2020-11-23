import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Boundary as ErrorBoundary } from 'components/error'
import * as Text from 'components/text'
import * as Page from 'components/page'
import * as Layouts from 'layouts/pages'
import Button, { ButtonSet } from 'components/button'
import styles from 'layouts/pages/pages.module.css'
import { FormattedMessage } from 'react-intl'

Bundle.propTypes = {
    children: PropTypes.element.isRequired,
    fallback: PropTypes.element,
}

export default function Bundle({ children, fallback = <Text.Loading /> }) {
    return (
        <ErrorBoundary capture={false} fallback={<Error />}>
            <Suspense fallback={fallback}>{children}</Suspense>
        </ErrorBoundary>
    )
}

function Error({ error }) {
    if (error.name === 'ChunkLoadError' || error.message.startsWith('Loading CSS chunk')) {
        window.location.reload(true)

        return null
    }

    if (error instanceof SyntaxError) {
        return <ErrorPage message={error.message} />
    }

    throw error
}

// TODO Reuse existig page layouts!
function ErrorPage({ title, headline, message }) {
    function reload() {
        window.location.reload()
    }

    return (
        <Layouts.Error>
            <Page.Main>
                <h1>
                    {title || (
                        <FormattedMessage
                            description="Component Bundle: Error page"
                            defaultMessage="Uh oh! We never thought that would happen..."
                        />
                    )}
                </h1>
                <Page.Headline>
                    {headline || (
                        <FormattedMessage
                            description="Component Bundle: Error page"
                            defaultMessage="An error happened while loading this page."
                        />
                    )}
                    {message && <Text.Error>{message}</Text.Error>}
                </Page.Headline>
                <ButtonSet>
                    <Button onClick={reload} className={styles.Link}>
                        <FormattedMessage
                            description="Component Bundle: Error page"
                            defaultMessage="Reload this page"
                        />
                    </Button>
                </ButtonSet>
            </Page.Main>
        </Layouts.Error>
    )
}
