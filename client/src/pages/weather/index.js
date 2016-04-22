import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { Pagination, Left, Right, Center } from '../../components/pagination'
import { Date as DateElement, DateTime } from '../../components/misc'
import Page from '../Page'
import styles from './Weather.css'
import moment from 'moment'

Weather.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    headline: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    issuedAt: PropTypes.instanceOf(Date),
    forecast: PropTypes.object.isRequired,
    faq: PropTypes.object.isRequired,
}

function Weather({ date = new Date(), headline, createdBy, issuedAt, forecast }) {
    const yesterday = moment(date).add(-1, 'd').toDate()
    const tomorrow = moment(date).add(1, 'd').toDate()

    return (
        <Page title='Mountain Weather Forecast'>
            <Pagination>
                <Left>
                    <DateElement value={yesterday} />
                </Left>
                <Center>
                    <h3 styleName='Date'>
                        <DateElement value={date} />
                    </h3>
                </Center>
                <Right>
                    <DateElement value={tomorrow} />
                </Right>
            </Pagination>
            <h2 styleName='Headline'>
                {headline}
                <small>Created by: {createdBy}</small>
                {issuedAt && <small>Issued on: <DateTime value={issuedAt} /></small>}
            </h2>
        </Page>
    )
}

export default CSSModules(Weather, styles)
