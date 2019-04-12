import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
    useCounter,
    useBoolean,
    useEventListener,
    useTimeout,
    useFullscreen,
} from 'utils/react/hooks'
import { Image, OpenInNewTab } from 'components/misc'
import { Fullscreen as Icon } from 'components/icons'
import ButtonSet from './ButtonSet'
import Button from 'components/button'
import keycodes from 'constants/keycodes'
import { WHITE } from 'constants/colors'
import styles from './Loop.css'

Loop.propTypes = {
    urls: PropTypes.arrayOf(PropTypes.string).isRequired,
    titles: PropTypes.arrayOf(PropTypes.string),
    interval: PropTypes.number,
    dwell: PropTypes.number,
    startsAt: PropTypes.number,
}

export default function Loop({
    urls = [],
    titles = [],
    interval = 1000,
    dwell = 2000,
    startsAt,
}) {
    const [fullscreen, , , toggleFullscreen] = useFullscreen()
    const max = urls.length - 1
    const [loading, load, unload] = useBoolean(false)
    const [playing, play, pause, toggle] = useBoolean(false)
    const [cursor, next, previous, first, last] = useCounter(
        typeof startsAt === 'number' ? Math.min(startsAt, max) : 0,
        0,
        max,
        true
    )
    const title = titles[cursor]
    const url = urls[cursor]
    const toolbar = {
        isPlaying: playing,
        onNext,
        onPrevious,
        onFirst() {
            pause()
            first()
        },
        onLast() {
            pause()
            last()
        },
        onPlay() {
            play()
        },
        onPause() {
            pause()
        },
    }

    function onNext() {
        pause()
        next()
    }
    function onPrevious() {
        pause()
        previous()
    }

    useEffect(() => {
        if (!playing) {
            return
        }

        const timeout = max === cursor ? interval + dwell : interval
        const timer = setTimeout(() => {
            next()
        }, timeout)

        return () => {
            clearTimeout(timer)
        }
    }, [playing, cursor])

    useEffect(load, [url])

    function handleKeyDown(event) {
        switch (event.keyCode) {
            case keycodes.left:
                event.preventDefault()
                onPrevious()
                break
            case keycodes.right:
                event.preventDefault()
                onNext()
                break
            case keycodes.space:
            case keycodes.enter:
                event.preventDefault()
                toggle()
                break
        }
    }

    useEventListener('keydown', handleKeyDown)

    return (
        <div ref={fullscreen} className={styles.Container}>
            {title && <div className={styles.Title}>{title}</div>}
            <div className={styles.Toolbar}>
                <ButtonSet {...toolbar} />
                <div className={styles.Info}>
                    {loading && (
                        <Delay elapse={interval + 150}>
                            <span>Loading</span>
                        </Delay>
                    )}
                    {cursor + 1} of {max + 1}
                </div>
                <Button onClick={toggleFullscreen}>
                    <Icon color={WHITE} />
                </Button>
            </div>
            <OpenInNewTab>
                <Image
                    src={url}
                    onError={unload}
                    onLoad={unload}
                    style={IMAGE_STYLE}
                />
            </OpenInNewTab>
        </div>
    )
}

// Utils & constants
// FIXME I was not able to make it working when "useTimeout" was used inside the parent component
function Delay({ children = null, elapse = 0 }) {
    return useTimeout(elapse) ? children : null
}
const IMAGE_STYLE = {
    backroundColor: '#eee',
    margin: '0 auto',
}
