import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { Submit, Reset } from 'components/button'
import { StructuredText } from 'prismic/components/base'
import { Translate } from 'contexts/locale'
import styles from './Question.css'

export default class Question extends Component {
    static propTypes = {
        nonRepeat: PropTypes.shape({
            question: PropTypes.string.isRequired,
            answer: PropTypes.array.isRequired,
        }).isRequired,
    }
    state = {
        hasErrors: false,
        userAnswer: null,
    }
    userAnswer = createRef()
    handleSubmit = event => {
        event.preventDefault()

        const isValid = event.target.checkValidity()

        this.setState({ hasErrors: !isValid })

        if (isValid) {
            this.setState({
                userAnswer: this.userAnswer.current.value,
            })
        }
    }
    handleReset = () => {
        this.setState({
            userAnswer: null,
            hasErrors: false,
        })
    }
    get allAnswers() {
        const { answer, question } = this.props.nonRepeat

        return (
            <section className={styles.AllAnswers}>
                <header>{question}</header>
                <dl>
                    <div>
                        <dt>
                            <Translate>Our answer</Translate>
                        </dt>
                        <dd>
                            <StructuredText value={answer} />
                        </dd>
                    </div>
                    <div>
                        <dt>
                            <Translate>Your answer</Translate>
                        </dt>
                        <dd>
                            <p>{this.state.userAnswer}</p>
                        </dd>
                    </div>
                </dl>
            </section>
        )
    }
    get form() {
        const { question } = this.props.nonRepeat

        return (
            <label>
                {question}{' '}
                <textarea
                    name="user-answer"
                    ref={this.userAnswer}
                    autoFocus
                    required
                />
                <span data-error-message>
                    <Translate>Your answer is required.</Translate>
                </span>
            </label>
        )
    }
    render() {
        const { userAnswer } = this.state

        return (
            <form
                onSubmit={this.handleSubmit}
                onReset={this.handleReset}
                data-has-errors={this.state.hasErrors}
                noValidate>
                <fieldset>
                    <legend>Question</legend>
                    {userAnswer ? this.allAnswers : this.form}
                    {userAnswer ? (
                        <Reset className={styles.Button}>
                            <Translate>Give another answer</Translate>
                        </Reset>
                    ) : (
                        <Submit className={styles.Button}>
                            <Translate>See answers</Translate>
                        </Submit>
                    )}
                </fieldset>
            </form>
        )
    }
}
