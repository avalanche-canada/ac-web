import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Submit, Reset } from 'components/button'
import { StructuredText } from 'prismic/components/base'
import { Translate } from 'contexts/locale'
import styles from './Question.css'

Question.propTypes = {
    nonRepeat: PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.array.isRequired,
    }).isRequired,
}

export default function Question({ nonRepeat }) {
    const { question, answer } = nonRepeat
    const [marking, setMarking] = useState(false)
    const [valid, setValid] = useState(true)
    const input = useRef(null)
    function handleSubmit(event) {
        event.preventDefault()

        const isValid = event.target.checkValidity()

        if (isValid) {
            setMarking(true)
        }

        setValid(isValid)
    }
    function handleReset() {
        setMarking(false)
    }
    function handleChange() {
        setValid(true)
    }

    return (
        <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            data-has-errors={!valid}
            noValidate>
            <fieldset>
                <legend>Question</legend>
                <label>
                    {question}{' '}
                    <textarea
                        name="user-answer"
                        ref={input}
                        autoFocus
                        required
                        onChange={handleChange}
                        style={marking ? { display: 'none' } : null}
                    />
                    <span data-error-message>
                        <Translate>Your answer is required.</Translate>
                    </span>
                </label>
                {marking && (
                    <Answers answer={answer} user={input.current.value} />
                )}
                {marking ? (
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

// Utils
function Answers({ answer, user }) {
    return (
        <section className={styles.Answers}>
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
                        <p>{user}</p>
                    </dd>
                </div>
            </dl>
        </section>
    )
}
