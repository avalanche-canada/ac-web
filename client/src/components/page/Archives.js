import React from 'react'
import {Link} from 'react-router'
import {Page, Header, Headline, Main} from 'components/page'
import {DayPicker} from 'components/controls'
import {DateElement} from 'components/misc'
import {DropdownFromOptions as Dropdown} from 'components/controls'
import Button from 'components/button'
import {AsRow} from 'components/grid'
import {Primary, Large, Chevron} from 'components/button/Button.css'

export default function Archives({region, onRegionChange, date, link, onDateChange, regionOptions}) {
    return (
        <Page>
            <Header title='Forecast Archive' />
            <Main>
                <Headline>
                    <AsRow>
                        <span>I want to see the archived avalanche forecast for</span>
                        <Dropdown options={regionOptions} value={region} onChange={onRegionChange} placeholder='Select a region' />
                        <span>on</span>
                        <DayPicker date={date} onChange={onDateChange}>
                            <DateElement value={date} />
                        </DayPicker>
                        {link && <Link className={`${Primary} ${Large} ${Chevron}`} to={link}>Go</Link>}
                    </AsRow>
                </Headline>
            </Main>
        </Page>
    )
}
