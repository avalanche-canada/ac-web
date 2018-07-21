import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StructuredText } from 'prismic/components/base'
import styles from './Quiz.css'
import classnames from 'classnames/bind'

export default class Quiz extends Component {
    static propTypes = {
        nonRepeat: PropTypes.shape({
            question: PropTypes.array.isRequired,
        }).isRequired,
        repeat: PropTypes.arrayOf(
            PropTypes.shape({
                answer: PropTypes.string.isRequired,
                feedback: PropTypes.array.isRequired,
                correctness: PropTypes.oneOf([0, 50, 100]).isRequired,
            }).isRequired
        ),
    }
    state = {
        picked: null,
    }
    pickAnswer = event => {
        this.setState({
            picked: Number(event.target.value),
        })
    }
    get answer() {
        const { picked } = this.state

        return typeof picked === 'number' ? this.props.repeat[picked] : null
    }
    get feedbackClassNames() {
        const { answer } = this

        return classNames({
            Feedback: true,
            FeedbackSuccess: answer && answer.correctness === '100',
            FeedbackError: answer && answer.correctness === '0',
        })
    }
    render() {
        const { nonRepeat, repeat } = this.props
        const { picked } = this.state
        const { answer } = this

        return (
            <fieldset>
                <legend>Quiz</legend>
                <label>{nonRepeat.question}</label>
                <div className={styles.Content}>
                    <div className={styles.Choices}>
                        {repeat.map(({ answer }, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    value={String(index)}
                                    onChange={this.pickAnswer}
                                    checked={picked === index}
                                />
                                {answer}
                            </label>
                        ))}
                    </div>
                    <div className={this.feedbackClassNames}>
                        {answer && <StructuredText value={answer.feedback} />}
                    </div>
                </div>
            </fieldset>
        )
    }
}

const classNames = classnames.bind(styles)
