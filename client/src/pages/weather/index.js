import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { Pagination, Left, Right, Center } from '../../components/pagination'
import { Date as DateElement } from '../../components/misc'
import Page from '../Page'
import styles from './Weather.css'
import moment from 'moment'

Weather.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    headline: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    issuedAt: PropTypes.instanceOf(Date).isRequired,
}

function Weather({ date = new Date(), headline, createdBy, issuedAt }) {
    const before = moment(date).subtract(1, 'd').toDate()
    const after = moment(date).add(1, 'd').toDate()

    return (
        <Page title='Mountain  Weather  Forecast'>
            <Pagination>
                <Left>
                    <DateElement value={before} />
                </Left>
                <Center>
                    <h3 styleName='Date'>
                        <DateElement value={date} />
                    </h3>
                </Center>
                <Right>
                    <DateElement value={after} />
                </Right>
            </Pagination>
            <h2>{headline}</h2>
            Created by: <h3>{createdBy}</h3>
            Issued at: <h3>{issuedAt}</h3>
        </Page>
    )
}


export default CSSModules(Weather, styles)
