import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import QuestionAnswer, {Question, Answer} from './'

const QUESTION = 'What is the Mountain Information Network?'
const ANSWER = 'It’s a free service for sharing information about riding, avalanche, snowpack, and weather conditions as well as incidents in real time. Posts are not moderated and go live as soon as they are submitted or, if you’re offline, as soon as a connection is obtained. You can post and view information online at www.avalanche.ca or with the Avalanche Canada app on your iOS or Android device.'

storiesOf('Question & Answer', module)
.add('Question', () => (
    <Question>
        {QUESTION}
    </Question>
))
.add('Answer', () => (
    <Answer>
        {ANSWER}
    </Answer>
))
.add('Question & Answer', () => (
    <QuestionAnswer question={QUESTION} answer={ANSWER} />
))
