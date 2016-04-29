import React, { PropTypes } from 'react'
import Loop from './Loop'
import Meteogram from './Meteogram'
import { Html } from '../prismic'
import { Date as DateElement } from '../components/misc'
import moment from 'moment'

const STATIC_LOOPS = new Set([
    'AC_GDPS_EPA_clouds-th-500hts',
    'AC_RDPS_BC_weather-systems',
    'AC_GDPS_EPA_pacific-systems'
])

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
                        return <Html document={slice} />
                    case 'day-1':
                    case 'day-2': {
                        const day = Number(sliceType.match(/(\d+)/)[0])
                        const d = moment(date).add(day + 1, 'd').toDate()

                        return (
                            <section>
                                <header>
                                    <h4>
                                        <DateElement value={d} />
                                    </h4>
                                </header>
                                <Html document={slice} />
                            </section>
                        )
                    }
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
