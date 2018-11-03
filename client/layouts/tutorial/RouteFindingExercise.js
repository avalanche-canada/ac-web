import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { select, event } from 'd3-selection'
import { drag } from 'd3-drag'
import { line } from 'd3-shape'
import { polygonCentroid } from 'd3-polygon'
import { Translate } from 'contexts/locale'
import { Media, Caption } from 'components/media'
import { Credit } from 'components/markup'
import { StructuredText } from 'prismic/components/base'
import Button from 'components/button'
import * as COLORS from 'constants/colors'
import styles from './RouteFindingExercise.css'

// TODO: Using a state machine would simplify implementation

export default class RouteFindingExercise extends Component {
    static propTypes = {
        nonRepeat: PropTypes.shape({
            heading: PropTypes.array.isRequired,
            from: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
            image: PropTypes.object.isRequired,
            credit: PropTypes.string.isRequired,
        }).isRequired,
        repeat: PropTypes.arrayOf(
            PropTypes.shape({
                description: PropTypes.array.isRequired,
                coordinates: PropTypes.string.isRequired,
            })
        ).isRequired,
    }
    state = {
        touched: new Set(),
        drawing: false,
    }
    get width() {
        return this.props.nonRepeat.image.main.dimensions.width
    }
    get height() {
        return this.props.nonRepeat.image.main.dimensions.height
    }
    handleMouseOver = index => {
        if (!this.state.drawing) {
            return
        }

        this.setState(({ touched }) => ({
            touched: new Set(touched.add(index)),
        }))
    }
    handleResetClick = () => {
        this.reset()
    }
    reset(callback) {
        this.route.attr('d', null)

        this.setState(
            {
                touched: new Set(),
                drawing: false,
            },
            callback
        )
    }
    createRoute = path => {
        this.route = select(path)
    }
    draw() {
        const { width, height } = this
        const l = line()
        let { x: x0, y: y0 } = event
        const { subject } = event

        this.route.datum(subject)

        event.on('drag', () => {
            const x1 = Math.max(0, Math.min(width, event.x))
            const y1 = Math.max(0, Math.min(height, event.y))
            const dx = x1 - x0
            const dy = y1 - y0

            if (dx * dx + dy * dy > 150) {
                subject.push([x1, y1])
                x0 = x1
                y0 = y1
            } else {
                subject[subject.length - 1] = [x1, y1]
            }

            this.route.attr('d', l)
        })

        event.on('end', this.endDrawing)
    }
    startDrawing = () => {
        this.reset(() => {
            this.setState({ drawing: true }, () => {
                this.svg.style('cursor', 'crosshair')
                this.draw()
            })
        })
    }
    endDrawing = () => {
        this.setState({ drawing: false }, () => {
            this.svg.style('cursor', 'default')
        })
    }
    initializeDrawing = g => {
        this.svg = select(g)

        this.svg.call(
            drag()
                .container(() => g)
                .subject(() => {
                    const { x, y } = event
                    const p = [x, y]

                    return [p, p]
                })
                .on('start', this.startDrawing)
        )
    }
    renderDangerZone = ({ coordinates }, index) => {
        return (
            <DangerZone
                key={index}
                index={index}
                touched={this.state.touched.has(index)}
                coordinates={coordinates}
                onMouseOver={this.handleMouseOver}
            />
        )
    }
    renderDangerZoneLabel = (index, i) => {
        const { coordinates } = this.props.repeat[index]

        return (
            <DangerZone.Label key={index} coordinates={coordinates}>
                {i + 1}
            </DangerZone.Label>
        )
    }
    render() {
        const { from, to, image, credit } = this.props.nonRepeat
        const [{ text: heading }] = this.props.nonRepeat.heading
        const { url } = image.main
        const { width, height } = this
        const { touched } = this.state
        const zones = this.props.repeat

        return (
            <section>
                <h2>{heading}</h2>
                <Media className={styles.Media}>
                    <div className={styles.Media}>
                        <svg
                            ref={this.initializeDrawing}
                            viewBox={`0 0 ${width} ${height}`}>
                            <image
                                width={width}
                                height={height}
                                xlinkHref={url}
                            />
                            <g>{zones.map(this.renderDangerZone)}</g>
                            <EndPoint coordinates={from} start />
                            <EndPoint coordinates={to} />
                            <path
                                ref={this.createRoute}
                                fill="none"
                                stroke={COLORS.PRIMARY}
                                strokeWidth={3}
                                pointerEvents="none"
                                strokeLinejoin="none"
                                strokeLinecap="none"
                            />
                            <g>
                                {Array.from(touched).map(
                                    this.renderDangerZoneLabel
                                )}
                            </g>
                        </svg>
                        <Credit compact>{credit}</Credit>
                    </div>
                    {touched.size > 0 ? (
                        <Caption>
                            <div className={styles.NotSoGoodJob}>
                                <Translate>
                                    Watch out, you are crossing some danger
                                    zones.
                                </Translate>
                            </div>
                            <ol>
                                {Array.from(touched).map(index => {
                                    const { description } = zones[index]

                                    return (
                                        <li key={index}>
                                            <StructuredText
                                                value={description}
                                            />
                                        </li>
                                    )
                                })}
                            </ol>
                            <Button onClick={this.handleResetClick}>
                                <Translate>Start again</Translate>
                            </Button>
                        </Caption>
                    ) : this.route && this.route.attr('d') ? (
                        <Caption>
                            <div className={styles.GoodJob}>
                                <Translate>
                                    Good job! You can try to find other routes.
                                </Translate>
                            </div>
                        </Caption>
                    ) : null}
                </Media>
            </section>
        )
    }
}

// Utils
EndPoint.propTypes = {
    coordinates: PropTypes.string.isRequired,
    start: PropTypes.bool,
}
function EndPoint({ coordinates, start }) {
    const [cx, cy] = coordinates.split(',').map(Number)
    const fill = start ? COLORS.SUCCESS : COLORS.DANGER
    const cursor = start ? 'crosshair' : null

    return <circle cx={cx} cy={cy} r={10} fill={fill} cursor={cursor} />
}

class DangerZone extends Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        coordinates: PropTypes.string.isRequired,
        onMouseOver: PropTypes.func.isRequired,
        touched: PropTypes.bool,
    }
    static Label({ coordinates, children }) {
        const [cx, cy] = polygonCentroid(
            coordinates.split(' ').map(coords => coords.split(',').map(Number))
        )

        return (
            <text x={cx} y={cy} fill={COLORS.WHITE} dx={-5} dy={5}>
                {children}
            </text>
        )
    }
    get d() {
        const [[x0, y0], ...coords] = this.props.coordinates
            .split(' ')
            .map(coords => coords.split(','))

        return `M${x0} ${y0} ${coords.map(([x, y]) => `L${x} ${y}`).join(' ')}`
    }
    get fill() {
        return this.props.touched ? COLORS.DANGER : 'transparent'
    }
    handleMouseOver = () => {
        const { index, onMouseOver } = this.props

        onMouseOver(index)
    }
    render() {
        return (
            <path
                d={this.d}
                fill={this.fill}
                opacity="0.5"
                onMouseOver={this.handleMouseOver}
            />
        )
    }
}
