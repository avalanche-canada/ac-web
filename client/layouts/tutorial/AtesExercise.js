import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Media, Caption } from 'components/media'
import { Image, StructuredText } from 'prismic/components/base'
import styles from './ATESExercise.css'
import { FormattedMessage } from 'react-intl'

// Constants
const VALUES = ['Simple', 'Challenging', 'Complex']

ATESExercise.propTypes = {
    primary: PropTypes.shape({
        answer: PropTypes.oneOf(VALUES).isRequired,
        credit: PropTypes.string,
        caption: PropTypes.array.isRequired,
        image: PropTypes.shape({
            url: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}

export default function ATESExercise({ primary }) {
    const { image, credit, answer, caption } = primary
    const [picked, pick] = useState(null)
    function handleChange(event) {
        pick(event.target.value)
    }

    return (
        <div className={styles.Container}>
            <Media>
                <Image url={image.url} copyright={credit} />
                <Caption>
                    <StructuredText value={caption} />
                    <div className={styles.Choices}>
                        {VALUES.map(value => (
                            <Input
                                key={value}
                                value={value}
                                onChange={handleChange}
                                picked={picked}>
                                {value}
                            </Input>
                        ))}
                    </div>
                    {picked && (picked === answer ? <Yep /> : <Nope />)}
                </Caption>
            </Media>
        </div>
    )
}

// Utils
Input.propTypes = {
    value: PropTypes.string,
    picked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

function Input({ value, onChange, children, picked }) {
    return (
        <label className={styles.Input}>
            <input
                type="radio"
                value={value}
                onChange={onChange}
                checked={picked === value}
            />
            {children}
        </label>
    )
}

function Yep() {
    return (
        <div className={styles.Yep}>
            <FormattedMessage defaultMessage="Well done — You’re right!" />
        </div>
    )
}

function Nope() {
    return (
        <div className={styles.Nope}>
            <FormattedMessage defaultMessage="Sorry, that isn’t the right answer. Try again!" />
        </div>
    )
}
