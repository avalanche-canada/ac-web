import React from 'react'
import {Link} from 'react-router'
import {Phone, Mailto, DateElement, Helper, P} from 'components/misc'
import {HeaderCellOrders} from 'components/table'

const {ASC, DESC, NONE} = HeaderCellOrders

export const dateRanges = {
        name: 'dates',
        title: 'Dates',
        property({dateStart, dateEnd}) {
            const start = new Date(dateStart)
            const end = new Date(dateEnd)

            return (
                <div>
                    <DateElement value={start} /> <em>to</em> <DateElement value={end} />
                </div>
            )
        },
        sorting: NONE,
    }

export const course = {
    name: 'name',
    title: 'Course',
    property: 'name',
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
    name: 'provider',
    title: 'Provider',
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
}

export const email = {
    name: 'email',
    title: 'Email',
    property({email}) {
        return (
            <Mailto email={email} />
        )
    },
}

export const phone = {
    name: 'phone',
    title: 'Phone',
    property({phone}) {
        return (
            <Phone phone={phone} />
        )
    }
}

const urlShortenerBegin = /^(http|https):\/\//i
const urlShortenerEnd = /\/$/

export const website = {
    name: 'website',
    title: 'Website',
    property({website}) {
        return (
            <a href={website} target='_blank'>
                {website.replace(urlShortenerBegin, '').replace(urlShortenerEnd, '')}
            </a>
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
