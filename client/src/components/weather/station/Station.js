import React, {PropTypes} from 'react'
import {compose} from 'recompose'
import CSSModules from 'react-css-modules'
import {Responsive, Table, Header, Row, Cell, HeaderCell, TBody, Caption} from 'components/table'
import styles from './Station.css'

Station.propTypes = {

}

function Station({columns, rows, caption}) {
    return (
        <div styleName='Container'>
            <Table>
                <Header>
                    <Row>
                    {columns.map(({title, name, property, ...header}, index) => (
                        <HeaderCell key={index}  {...header} >
                            {typeof title === 'function' ? title() : title}
                        </HeaderCell>
                    ))}
                    </Row>
                </Header>
                <TBody>
                    {rows.map(row => (
                        <Row key={row.id}>
                            {columns.map(({property, name}, index) => (
                            <Cell key={index}>
                                {typeof property === 'function' ? property(row) : row[property]}
                            </Cell>
                            ))}
                        </Row>
                    ))}
                </TBody>
                <Caption>{caption}</Caption>
            </Table>
        </div>
    )
}

export default compose(
    CSSModules(styles),
)(Station)
