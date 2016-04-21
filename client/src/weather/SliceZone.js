import React, { PropTypes } from 'react'
import Loop from './Loop'
import Image from './Image'
import Meteogram from './Meteogram'
import getForecast from './getForecast'

const STATIC_LOOPS = new Set([
    'AC_GDPS_EPA_clouds-th-500hts',
    'AC_RDPS_BC_weather-systems',
    'AC_GDPS_EPA_pacific-systems'
])

SliceZone.propTypes = {
    zone: PropTypes.object.isRequired
}

function SliceZone({ zone, forecast }) {
    const date = forecast.getDate('weather-forecast.date')
    const slices = zone.value

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
                    case 'text': {
                        const html = { __html: slice.asHtml() }

                        return <div dangerouslySetInnerHTML={html} />
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
                    case 'image': {
                        const [image] = slice.value.toArray()
                        const { url } = image.getImage('image')

                        return <Image src={url} openNewTab />
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


export default getForecast(SliceZone)
