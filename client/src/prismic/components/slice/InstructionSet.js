import React, {createElement} from 'react'
import {compose, withProps} from 'recompose';
import {InstructionSet, Instruction} from 'components/instruction'
import {InnerHTML} from 'components/misc'

export default compose(
    withProps(({content}) => ({
        children: content.map(({content, ...props}) => (
            <Instruction {...props}>
                <InnerHTML>
                    {content}
                </InnerHTML>
            </Instruction>
        ))
    }))
)(InstructionSet)
