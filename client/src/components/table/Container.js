import React, { PropTypes, Children} from 'react'
import {compose} from 'recompose'
import Table from './Table'
import TBody from './TBody'

Container.propTypes = {
    children: PropTypes.node.isRequired,
}

function Container({ children }) {
    return (
        <div>
            <Table>
                {Children.map(children, child => {
                    if (child.type !== TBody) {
                        return child
                    }


                })}
            </Table>
        </div>
    )
}

export default compose(
    
)(Container)

// {rows.reduce((rows, row, index) => {
//     const key = String(index)
//
//     if (row.type === ExpandableRowSet) {
//         const expanded = expandedValues[index]
//         const [first, second] = Children.toArray(row.props.children)
//         function onExpandedToggle() {
//             expandedValues[index] = !expandedValues[index]
//             setExpandedValues(expandedValues)
//         }
//
//         rows.push(cloneElement(first, {onExpandedToggle, expanded, key: `${key}.parent`}))
//
//         if (expanded === true) {
//             const cell = Children.only(second.props.children)
//             const span = Children.count(first.props.children)
//
//             rows.push(cloneElement(second, null, cloneElement(cell, {span, key: `${key}.child`})))
//         }
//     } else {
//         rows.push(cloneElement(row, {key: `${key}.orpehlin`}))
//     }
//
//     return rows
// }, [])}


// {Children.map(children, (row, index) => {
//     const expanded = expandedValues[index]
//
//     if (expanded !== undefined) {
//         function onExpandedToggle() {
//             expandedValues[index] = !expanded
//             setExpandedValues(expandedValues)
//         }
//
//         return cloneElement(row, {onExpandedToggle, expanded})
//
//         if (expanded === true) {
//             const cell = Children.only(second.props.children)
//             const span = Children.count(first.props.children)
//
//             return cloneElement(second, null, cloneElement(cell, {span}))
//         }
//     }
// }, [])}
