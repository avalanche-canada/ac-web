import React from 'react'
import {Link} from 'react-router'
import moment from 'moment'
import {Phone, Mailto, DateElement, Helper, P} from 'components/misc'
import {HeaderCellOrders} from 'components/table'
import {List, Term, Definition} from 'components/description'
import Url from 'url'

const {ASC, DESC, NONE} = HeaderCellOrders

export const dateRanges = {
    name: 'dates',
    title: 'Dates',
    property({dateStart, dateEnd}) {
        if (moment(dateStart).isSame(dateEnd, 'd')) {
            return <DateElement value={dateStart} />
        }

        return (
            <div>
                <DateElement value={dateStart} /> <em>to</em> <DateElement value={dateEnd} />
            </div>
        )
    },
    sorting: NONE,
}

export const level = {
    name: 'level',
    title: 'Level',
    property: 'level',
}

export const description = {
    name: 'description',
    title: 'Description',
    property({description}) {
        return (
            <P capAt={300}>
                {description}
            </P>
        )
    },
}
export const courseProvider = {
    name: 'courseprovider',
    title: 'Provider',
    sorting: NONE,
    property({provider}) {
        return (
            <span>
                {provider.name}
            </span>
        )
    },
}

export const distance = {
    name: 'distance',
    title: 'Distance',
    property({distance}) {
        if (typeof distance === 'number') {
            return `${Math.ceil(distance)} km.`
        }

        return 'N/A'
    },
    sorting: NONE,
}

export const location = {
    name: 'location',
    title: 'Location',
    property: 'locDescription',
}

export const tags = {
    name: 'tags',
    title: 'Tags',
    property({tags}) {
        return tags.join(', ')
    },
}

export const provider = {
    name: 'provider',
    title: 'Provider Name',
    property: 'name',
    sorting: NONE,
}

const PathShortenerRegex = /\//
const TERM_STYLE = {
    flex: '0 1 35%'
}
export const contacts = {
    name: 'contacts',
    title: 'Contacts',
    property({email, phone, website}) {
        let {hostname, path} = Url.parse(website)

        path = typeof path === 'string' && path.replace(PathShortenerRegex, '') || null

        return (
            <List>
                {email && <Term style={TERM_STYLE}>Email</Term>}
                {email &&
                    <Definition>
                        <Mailto email={email} />
                    </Definition>
                }
                {phone && <Term style={TERM_STYLE}>Phone</Term>}
                {phone &&
                    <Definition>
                        <Phone phone={phone} />
                    </Definition>
                }
                {website && <Term style={TERM_STYLE}>Website</Term>}
                {website &&
                    <Definition>
                        <a href={website} title={website} target='_blank'>
                            {path ? `${hostname}/…` : hostname}
                        </a>
                    </Definition>
                }
            </List>
        )
    }
}

export const cost = {
    name: 'cost',
    title: 'Cost',
    property({cost: {cost, currency}}) {
        return `${cost} ${currency}`
    },
}
