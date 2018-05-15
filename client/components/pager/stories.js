import React from 'react'
import {storiesOf, action} from '@storybook/react'
import withRouter from '../../../.storybook/withRouter';
import Pager,{Previous,Next} from './index'

const stories = storiesOf('Pager', module)

stories.addDecorator(withRouter)

stories.add('Pager w/ defaults', () => {
    return (
            <Pager>
                <Previous to='/back'>
                    A previous title
                </Previous>
                <Next to='/forward'>
                    A next title
                </Next>
            </Pager>
    )
})

stories.add('Pager', () => {
    return (
            <Pager>
                <Previous to='/back' subtitle='Older'>
                    Share your knowledge
                </Previous>
                <Next to='/forward' subtitle='Newer'>
                    New Fundraiser for Avalanche Canada
                </Next>
            </Pager>
    )
})
