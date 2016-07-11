import React from 'react'
import {compose, flattenProp, mapProps, renameProp} from 'recompose'
import Ambassador from 'components/ambassador'
import QuestionAnswer from 'components/question-answer'
import {InnerHTML} from 'components/misc'

function computeSocials({twitter, facebook, instagram, website}) {
    return [twitter, facebook, instagram, website].filter(Boolean)
}

export default compose(
    mapProps(props => {
        const data = props.content[0]

        return {
            ...data,
            socials: computeSocials(data),
            children: (
                <InnerHTML>
                    {data.biography}
                </InnerHTML>
            )
        }
    }),
)(Ambassador)
