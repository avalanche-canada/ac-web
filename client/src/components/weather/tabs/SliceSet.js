import React, {PropTypes} from 'react'
import Loop from '../Loop'
import Meteogram from '../Meteogram'
import {InnerHTML} from 'components/misc'

SliceSet.propTypes = {
    slices: PropTypes.arrayOf(PropTypes.object).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function SliceSet({slices = [], date}) {
    return (
        <div>
            {slices.map(({type, content}, index) => {
                switch (type) {
                    case 'text':
                        return (
                            <InnerHTML key={index}>
                                {content}
                            </InnerHTML>
                        )
                    case 'loop': {
                        const [loop] = content
                        const [type, run] = loop.type.split('@')
                        const props = {
                            ...loop,
                            type,
                            run: Number(run.replace('Z', '')),
                        }

                        return <Loop key={index} {...props} />
                    }
                    case 'point-meteogram':
                    case 'group-meteogram':
                        const [meteogram] = content
                        const [model, run] = meteogram.type.split('@')
                        const props = {
                            model,
                            run: Number(run.replace('Z', '')),
                            type: type.split('-')[0],
                            location: meteogram.location,
                        }

                        return <Meteogram key={index} {...props} />
                    default:
                        return null
                }
            })}
        </div>
    )
}
