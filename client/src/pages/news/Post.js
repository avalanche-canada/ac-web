import React, { PropTypes } from 'react'
import {Page, Main} from 'components/page'
import {Metadata, Entry} from 'components/metadata'
import {DateElement, InnerHtml} from 'components/misc'

NewsPost.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    location: PropTypes.string,
}

export default function NewsPost({title, date, location, headline, children}) {
    return (
        <Page>
            <Header title={title} />
            <Metadata>
                <Entry term='Date'>
                    <DateElement value={date} />
                </Entry>
                <Entry term='Location'>
                    {location}
                </Entry>
            </Metadata>
            <InnerHtml>
                {headline}
            </InnerHtml>
            {children}
        </Page>
    )
}
