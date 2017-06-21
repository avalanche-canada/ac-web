import React from 'react'
import PropTypes from 'prop-types'
import Loop from '../Loop'
import Meteogram from '../Meteogram'
import { StructuredText } from '~/prismic/components/base'

SliceSet.propTypes = {
    slices: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default function SliceSet({ slices = [] }) {
    return (
        <div>
            {slices.map(({ slice_type: type, value }, index) => {
                switch (type) {
                    case 'text':
                        return <StructuredText key={index} {...value} />
                    case 'loop': {
                        const [loop] = value
                        const [type, run] = loop.type.split('@')
                        const props = {
                            ...loop,
                            type,
                            run: Number(run.replace('Z', '')),
                        }

                        return <Loop key={index} {...props} />
                    }
                    case 'point-meteogram':
                    case 'group-meteogram': {
                        const [meteogram] = value
                        const [model, run] = meteogram.type.split('@')
                        const props = {
                            model,
                            run: Number(run.replace('Z', '')),
                            type: type.split('-')[0],
                            location: meteogram.location,
                        }

                        return <Meteogram key={index} {...props} />
                    }
                    default:
                        return null
                }
            })}
        </div>
    )
}
