import React, { Component, memo } from 'react'
import PropTypes from 'prop-types'
import { select, event } from 'd3-selection'
import { drag } from 'd3-drag'
import { line } from 'd3-shape'
import { polygonCentroid, polygonContains } from 'd3-polygon'
import { Translate } from 'contexts/locale'
import { Media, Caption } from 'components/media'
import { Credit } from 'components/markup'
import { StructuredText } from 'prismic/components/base'
import Button from 'components/button'
import Shim from 'components/Shim'
import { memo as react } from 'utils/react'
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
        coordinates: [],
        drawing: false,
    }
    constructor(props) {
        super(props)

        this.zones = props.repeat.map(({ coordinates, ...rest }) => {
            coordinates = coordinates
                .split(' ')
                .map(coords => coords.split(',').map(Number))

            return Object.assign(rest, {
                coordinates,
                centroid: polygonCentroid(coordinates),
            })
        })
    }
    get dimensions() {
        return this.props.nonRepeat.image.main.dimensions
    }
    handleResetClick = () => {
        this.reset()
    }
    reset(props = {}) {
        this.setState({
            coordinates: [],
            touched: new Set(),
            drawing: false,
            ...props,
        })
    }
    initializeDrawing = g => {
        this.svg = select(g)

        this.svg.call(
            drag()
                .container(() => g)
                .on('start', () => {
                    const { x, y } = event

                    this.reset({ drawing: true })
                    this.svg.style('cursor', 'crosshair')

                    this.setState({
                        coordinates: [[x, y]],
                    })
                })
                .on('drag', () => {
                    const { width, height } = this.dimensions
                    const { coordinates } = this.state
                    const { x, y } = event
                    const [x0, y0] = coordinates[coordinates.length - 1]
                    const x1 = Math.max(0, Math.min(width, x))
                    const y1 = Math.max(0, Math.min(height, y))
                    const dx = x1 - x0
                    const dy = y1 - y0

                    if (dx * dx + dy * dy < 50) {
                        return
                    }

                    const point = [x1, y1]

                    this.setState(state => {
                        const touched = new Set(state.touched)

                        this.zones.forEach(({ coordinates }, index) => {
                            if (polygonContains(coordinates, point)) {
                                touched.add(index)
                            }
                        })

                        return {
                            coordinates: [...state.coordinates, point],
                            touched,
                        }
                    })
                })
                .on('end', () => {
                    this.setState({ drawing: false })
                    this.svg.style('cursor', 'default')
                })
        )
    }
    renderDangerZone = ({ coordinates }, index) => {
        const touched = this.state.touched.has(index)

        return (
            <DangerZone
                key={index}
                touched={touched}
                coordinates={coordinates}
            />
        )
    }
    renderDangerZoneLabel = (index, i) => {
        const { centroid } = this.zones[index]
        const [x, y] = centroid

        return (
            <Label key={index} x={x} y={y}>
                {i + 1}
            </Label>
        )
    }
    render() {
        const { from, to, image, credit } = this.props.nonRepeat
        const [{ text: heading }] = this.props.nonRepeat.heading
        const { url } = image.main
        const { width, height } = this.dimensions
        const { touched, coordinates, drawing } = this.state
        const { zones } = this

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
                            <Route coordinates={coordinates} />
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
                    ) : drawing === false && coordinates.length > 0 ? (
                        <Caption>
                            <div className={styles.GoodJob}>
                                <Translate>
                                    Good job! You can try to find other routes.
                                </Translate>
                            </div>
                            <Shim top>
                                <Button onClick={this.handleResetClick}>
                                    <Translate>Find another route</Translate>
                                </Button>
                            </Shim>
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

function Route({ coordinates }) {
    return (
        <path
            fill="none"
            d={createLine(coordinates)}
            stroke={COLORS.PRIMARY}
            strokeWidth={3}
            pointerEvents="none"
            strokeLinejoin="none"
            strokeLinecap="none"
        />
    )
}

DangerZone.propTypes = {
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    touched: PropTypes.bool,
}

const DangerZone = memo(function DangerZone({ coordinates, touched }) {
    const fill = touched ? COLORS.DANGER : 'transparent'

    return <path d={createLine(coordinates)} fill={fill} opacity="0.5" />
})

Label.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    children: PropTypes.element.isRequired,
}

const Label = react.static(function Label({ x, y, children }) {
    return (
        <text x={x} y={y} fill={COLORS.WHITE} dx={-5} dy={5}>
            {children}
        </text>
    )
})

const createLine = line()
