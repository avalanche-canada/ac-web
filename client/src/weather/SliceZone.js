import React, { PropTypes } from 'react'
import Loop from './Loop'
import Meteogram from './Meteogram'
import { Html } from '../prismic'

const STATIC_LOOPS = new Set([
    'AC_GDPS_EPA_clouds-th-500hts',
    'AC_RDPS_BC_weather-systems',
    'AC_GDPS_EPA_pacific-systems'
])

function htmlSerializer({url, type}, content) {
    if (type === 'hyperlink') {
        return `<a href="${url}" target="_blank">${content}</a>`
    }
}

SliceZone.propTypes = {
    zone: PropTypes.object.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function SliceZone({ zone, date }) {
    const slices = zone.value

    if (!slices) {
        return null
    }

    return (
        <div>
            {slices.map(slice => {
                const { sliceType } = slice

                if (STATIC_LOOPS.has(sliceType)) {
                    const [loop] = slice.value.toArray()
                    const run = Number(loop.getText('run').replace('Z', ''))

                    return <Loop type={sliceType} {...{date, run}} />
                }


                switch (sliceType) {
                    case 'text':
                        return <Html document={slice.value} htmlSerializer={htmlSerializer} />
                    case 'loop': {
                        const [loop] = slice.value.toArray()
                        const [type, run] = loop.getText('type').split('@')
                        const props = {
                            type,
                            date: loop.getDate('date'),
                            run: Number(run.replace('Z', ''))
                        }

                        return <Loop {...props} />
                    }
                    case 'point-meteogram':
                    case 'group-meteogram':
                        const [meteogram] = slice.value.toArray()
                        const [model, run] = meteogram.getText('type').split('@')
                        const [type] = slice.sliceType.split('-')
                        const props = {
                            model,
                            run: Number(run.replace('Z', '')),
                            type,
                            location: meteogram.getText('location')
                        }

                        return <Meteogram {...props} />
                    default:
                        return null
                }
            })}
        </div>
    )
}
