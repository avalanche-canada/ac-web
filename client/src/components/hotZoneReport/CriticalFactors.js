import React, {PropTypes, PureComponent, createElement} from 'react'
import Content from 'components/mountainInformationNetwork/Content'
import {InnerHTML} from 'components/misc'
import {Term, Definition} from 'components/description'

const TERMS = new Map([
    ['persistentAvalancheProblem', 'Persistent avalanche problem'],
    ['slabAvalanches', 'Slab avalanches in the last 48 hours'],
    ['instability', 'Signs of instability'],
    ['recentSnowfall', 'Recent snowfall > 30cm'],
    ['recentRainfall', 'Recent rainfall'],
    ['recentWindLoading', 'Recent wind loading'],
    ['significantWarming', 'Significant warming'],
])
const VALUES = new Map([
    [true, 'Yes'],
    [false, 'No'],
    [null, 'Unknown'],
    [undefined, 'Unknown'],
])
const AVOID = {
    fontWeight: 700,
    color: '#E6252F',
}

const truthPropType = PropTypes.oneOf([true, false, null])

export default class CriticalFactors extends PureComponent {
    static propTypes = {
        persistentAvalancheProblem: truthPropType,
        slabAvalanches: truthPropType,
        instability: truthPropType,
        recentSnowfall: truthPropType,
        recentRainfall: truthPropType,
        recentWindLoading: truthPropType,
        significantWarming: truthPropType,
        comments: PropTypes.string,
    }
    render() {
        const {comments, ...values} = this.props

        return createElement(Content, {
            comments: comments && <InnerHTML>{comments}</InnerHTML>,
            descriptions: Object.keys(values).reduce((children, key) => {
                const value = values[key]
                const style = value ? AVOID : null
                children.push(
                    <Term style={style}>
                        {TERMS.get(key)}
                    </Term>
                )
                children.push(
                    <Definition style={style}>
                        {VALUES.get(value)}
                    </Definition>
                )

                return children
            }, [])
        })
    }
}
