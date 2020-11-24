import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Submit, Reset } from 'components/button'
import { StructuredText } from 'prismic/components/base'
import styles from './Question.module.css'

Question.propTypes = {
    primary: PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.array.isRequired,
    }).isRequired,
}

export default function Question({ primary }) {
    const { question, answer } = primary
    const [marking, setMarking] = useState(false)
    const [valid, setValid] = useState(true)
    const input = useRef(null)
    const style = marking ? INVISIBLE_STYLE : null
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

        input.current.focus()
    }
    function handleChange() {
        setValid(true)
    }

    return (
        <form onSubmit={handleSubmit} onReset={handleReset} data-has-errors={!valid} noValidate>
            <fieldset>
                <legend>Question</legend>
                <label>
                    {question}
                    <textarea
                        name="user-answer"
                        ref={input}
                        required
                        onChange={handleChange}
                        style={style}
                    />
                    <span data-error-message>
                        <FormattedMessage defaultMessage="Your answer is required." />
                    </span>
                </label>
                {marking && <Answers answer={answer} user={input.current.value} />}
                {marking ? (
                    <Reset className={styles.Button}>
                        <FormattedMessage defaultMessage="Give another answer" />
                    </Reset>
                ) : (
                    <Submit className={styles.Button}>
                        <FormattedMessage defaultMessage="See answers" />
                    </Submit>
                )}
            </fieldset>
        </form>
    )
}

// Utils & constants
function Answers({ answer, user }) {
    return (
        <section className={styles.Answers}>
            <dl>
                <div>
                    <dt>
                        <FormattedMessage defaultMessage="Our answer" />
                    </dt>
                    <dd>
                        <StructuredText value={answer} />
                    </dd>
                </div>
                <div>
                    <dt>
                        <FormattedMessage defaultMessage="Your answer" />
                    </dt>
                    <dd>
                        <p>{user}</p>
                    </dd>
                </div>
            </dl>
        </section>
    )
}
const INVISIBLE_STYLE = {
    position: 'absolute',
    left: -9999,
    top: -9999,
}
