import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SIMPLE, CHALLENGING, COMPLEX } from 'constants/forecast/ates'
import {
    LOW,
    MODERATE,
    CONSIDERABLE,
    HIGH,
    EXTREME,
} from 'constants/forecast/rating'

// Components
export class Chart extends PureComponent {
    static propTypes = {
        terrain: PropTypes.oneOf([SIMPLE, CHALLENGING, COMPLEX]).isRequired,
        danger: PropTypes.oneOf([LOW, MODERATE, CONSIDERABLE, HIGH, EXTREME])
            .isRequired,
    }
    get indicator() {
        const { terrain, danger } = this.props
        const x = X_COORDINATES.get(terrain)
        const y = Y_COORDINATES.get(danger)

        return <circle cx={x} cy={y} r="7" stroke="#FFFFFF" strokeWidth="2" />
    }
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="22 0 271 200">
                {/* <path fill="#00aeef" d="M82.1 182h210v12.9h-210z" />
                <text
                    x="187.8"
                    y="191.2"
                    fill="#fff"
                    font-size="10"
                    text-anchor="middle">
                    <tspan>Avalanche terrain rating</tspan>
                </text> */}
                <path
                    fill="#fcee23"
                    d="M82.2 26.6c0 .6 46.7 19.4 86.2 39 39.5 19.4 123.7 30 123.7 30v54.6s1 14.4-11.3 14.4h-58.6s-8.3-49-43-69-97-50.8-97-50.8V26.6z"
                />
                <path
                    fill="#ec2227"
                    d="M82.2 30v-8.9c0-13.5 1-16 13.8-16h180.8c16.7 0 15.3 4.8 15.3 18.6v72.5s-80.7-8.3-124.3-27C127.2 51.7 82.2 30 82.2 30z"
                />
                <path
                    fill="#12b24b"
                    d="M82.2 48.2v100.4c0 13.3 1.8 16 20.3 16l140.5-.2c-5-21.6-8.5-30.5-19.8-43.3-16.6-18.8-28.3-28-65-45.5-12.6-6-76-35.5-76-35.5v8.1z"
                />
                <path
                    fill="#f15b25"
                    d="M82.2 28.6s45 21.8 85.6 39.3c43.6 18.8 124.3 27 124.3 27v1.3s-80.7-8.3-124.3-27C127.2 51.7 82.2 30 82.2 30v-1.4z"
                />
                <path
                    fill="#f58220"
                    d="M82.2 29.8s45 21.8 85.6 39.3c43.6 18.8 124.3 27 124.3 27v1.4s-80.7-8.3-124.3-27a2501.2 2501.2 0 0 1-85.6-39.3v-1.4z"
                />
                <path
                    fill="#faa71b"
                    d="M82.2 31.2s45 21.8 85.6 39.3c43.6 18.8 124.3 27 124.3 27V99s-80.7-8.3-124.3-27c-40.6-17.6-85.6-39.3-85.6-39.3v-1.4z"
                />
                <path
                    fill="#ffcc04"
                    d="M82.2 32.3s45 21.8 85.6 39.3c43.6 18.8 124.3 27 124.3 27v1.4s-80.7-8.3-124.3-27a2501.2 2501.2 0 0 1-85.6-39.3v-1.4z"
                />
                <path
                    fill="#51b848"
                    d="M82.2 44.2s62 28.2 74.6 34.1c36.8 17.2 48.4 25.8 65.1 44.3 11.5 12.6 14.8 20.6 19.8 42h1.5c-5-21.3-8.5-30-19.8-42.6-16.6-18.4-28.3-27.5-65-44.7L82.1 42.5v1.7z"
                />
                <path
                    fill="#8fc640"
                    d="M82.2 42.5s62.5 28.6 75.3 34.6c37.1 17.4 48.8 26.1 65.7 45 11.6 12.7 15 20.8 20 42.4h1.4c-5-21.5-8.6-30.4-19.9-43-16.7-18.7-28.5-27.9-65.6-45.3L82.4 41l-.2 1.6z"
                />
                <path
                    fill="#bed731"
                    d="M82.2 41.2l76 35c37.3 17.6 49.1 26.4 66.1 45.4 11.7 13 15 21.2 20.1 43h1.5c-5-21.9-8.7-30.8-20-43.6-17-18.9-28.9-28.2-66.3-45.8L82.2 39.5v1.7z"
                />
                <path
                    fill="#ede80a"
                    d="M82.2 39.5s63.6 29.3 76.5 35.5c37.7 18 49.6 26.8 66.8 46 11.8 13.1 15.2 21.5 20.2 43.5h1.5c-5-22-8.7-31-20.3-44-17-19.2-29-28.7-66.7-46.5l-78-36.2v1.7z"
                />
                <path
                    fill="none"
                    stroke="#fff"
                    stroke-dasharray="2,1,2,1,2,1"
                    d="M82.2 145h209.5"
                    opacity=".6"
                />
                <text
                    x="118.7"
                    y="178.2"
                    fill="#00aeef"
                    font-size="10"
                    text-anchor="middle">
                    Simple
                </text>
                <text
                    x="188.5"
                    y="178.2"
                    fill="#00aeef"
                    font-size="10"
                    text-anchor="middle">
                    Challenging
                </text>
                <text
                    x="257.6"
                    y="178.2"
                    fill="#00aeef"
                    font-size="10"
                    text-anchor="middle">
                    Complex
                </text>
                <text
                    x="58.4"
                    y="147.9"
                    fill="#245eac"
                    font-size="10"
                    text-anchor="left">
                    Low
                </text>
                <text
                    x="36.2"
                    y="119.8"
                    fill="#245eac"
                    font-size="10"
                    text-anchor="left">
                    Moderate
                </text>
                <text
                    x="21.9"
                    y="87.8"
                    fill="#245eac"
                    font-size="10"
                    text-anchor="left">
                    Considerable
                </text>
                <text
                    x="56.2"
                    y="55.2"
                    fill="#245eac"
                    font-size="10"
                    text-anchor="left">
                    High
                </text>
                <text
                    x="40.6"
                    y="24"
                    fill="#245eac"
                    font-size="10"
                    text-anchor="left">
                    Extreme
                </text>
                {/* <path fill="#245eac" d="M7.9 164V5.5h12.9V164z" />
                <text
                    x="-84.4"
                    y="16.5"
                    font-size="10"
                    text-anchor="middle"
                    transform="rotate(-90)">
                    <tspan fill="#fff">Danger rating</tspan>
                </text> */}
                <path
                    fill="none"
                    stroke="#fff"
                    stroke-dasharray="2,1,2,1,2,1"
                    d="M82.2 116.8H292m-209.7-32H292M82.2 53H292M82.2 21.1H292m-34.2-16v159.5M188.3 5.1v159.5M118.7 5.1v159.5"
                    opacity=".6"
                />
                {this.indicator}
            </svg>
        )
    }
}

// Constants
const X_COORDINATES = new Map([
    [SIMPLE, 119],
    [CHALLENGING, 188],
    [COMPLEX, 258],
])
const Y_COORDINATES = new Map([
    [LOW, 145],
    [MODERATE, 117],
    [CONSIDERABLE, 85],
    [HIGH, 53],
    [EXTREME, 21],
])
