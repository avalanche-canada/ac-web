import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'recompose'
import {neverUpdate} from '/compose'
import CSSModules from 'react-css-modules'
import Item from './Item'
import Link from '/components/navbar/Link'
import styles from './Drawer.css'

ItemSet.propTypes = {
    items: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    to: PropTypes.string,
}

function ItemSet({items, label, to}) {
    return (
        <div styleName='ItemSet--Container'>
            <ul styleName='ItemSet'>
                <Item>
                    {to ?
                        <Link to={to} title={label}>
                            {label}
                        </Link> :
                        label}
                </Item>
                {items.map(({to, label, headline, children = [], onClick}, index) => {
                    const link = {
                        to,
                        title: headline || label,
                    }

                    if (children.length > 0) {
                        link.onClick = onClick
                    }

                    return (
                        <Item key={index}>
                            <Link {...link}>
                                {label}
                            </Link>
                        </Item>
                    )
                })}
            </ul>
        </div>
    )
}

export default compose(
    neverUpdate,
    CSSModules(styles),
)(ItemSet)
