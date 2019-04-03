import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useCounter, useBoolean, useEventListener } from 'utils/react/hooks'
import { Image, Delay, Ratio, OpenInNewTab } from 'components/misc'
import { Fullscreen as Icon } from 'components/icons'
import Fullscreen from 'components/Fullscreen'
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
    startAt: PropTypes.number,
}

export default function Loop({
    urls = [],
    titles = [],
    interval = 1000,
    dwell = 2000,
    startAt,
}) {
    const [target, setTarget] = useState(null)
    const [loading, load, unload] = useBoolean(false)
    const [playing, play, pause, toggle] = useBoolean(false)
    const max = urls.length - 1
    const [cursor, next, previous, first, last] = useCounter(
        typeof startAt === 'number' ? Math.min(startAt, max) : 0,
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
        <Fullscreen target={target}>
            {({ toggle }) => (
                <div ref={setTarget} className={styles.Container}>
                    {title && <div className={styles.Title}>{title}</div>}
                    <div className={styles.Toolbar}>
                        <ButtonSet {...toolbar} />
                        <div className={styles.Info}>
                            {loading && (
                                <Delay elapse={interval + 50}>
                                    <span>Loading</span>
                                </Delay>
                            )}
                            {cursor + 1} of {max + 1}
                        </div>
                        <Button onClick={toggle}>
                            <Icon color={WHITE} />
                        </Button>
                    </div>
                    <Ratio y={956} x={1124}>
                        {(ref, { width, height }) => (
                            <div ref={ref}>
                                <OpenInNewTab>
                                    <Image
                                        src={url}
                                        width={width}
                                        height={height}
                                        onError={unload}
                                        onLoad={unload}
                                        style={{
                                            backroundColor: '#eee',
                                        }}
                                    />
                                </OpenInNewTab>
                            </div>
                        )}
                    </Ratio>
                </div>
            )}
        </Fullscreen>
    )
}
