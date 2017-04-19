import {VictoryTheme} from 'victory'

const axisStroke = VictoryTheme.material.axis.style.grid.stroke

Object.assign(VictoryTheme.material.axis.style.grid, {
    stroke(t) {
        return t ? axisStroke: 'transparent'
    }
})

export default VictoryTheme.material
