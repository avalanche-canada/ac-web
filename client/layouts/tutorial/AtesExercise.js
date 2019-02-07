import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Media, Caption } from 'components/media'
import { Image, StructuredText } from 'prismic/components/base'
import { Translate } from 'contexts/locale'
import styles from './ATESExercise.css'

// Constants
const VALUES = ['Simple', 'Challenging', 'Complex']

ATESExercise.propTypes = {
    nonRepeat: PropTypes.shape({
        answer: PropTypes.oneOf(VALUES).isRequired,
        credit: PropTypes.string,
        caption: PropTypes.array.isRequired,
        image: PropTypes.shape({
            main: PropTypes.shape({
                url: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
}

export default function ATESExercise({ nonRepeat }) {
    const { image, credit, answer, caption } = nonRepeat
    const [picked, pick] = useState(null)
    function handleChange(event) {
        pick(event.target.value)
    }

    return (
        <div className={styles.Container}>
            <Media>
                <Image url={image.main.url} copyright={credit} />
                <Caption>
                    <StructuredText value={caption} />
                    <div className={styles.Choices}>
                        {VALUES.map(value => (
                            <Input
                                key={value}
                                value={value}
                                onChange={handleChange}
                                picked={picked}>
                                <Translate>{value}</Translate>
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
            <Translate>Well done — You’re right!</Translate>
        </div>
    )
}

function Nope() {
    return (
        <div className={styles.Nope}>
            <Translate>
                Sorry, that isn’t the right answer. Try again!
            </Translate>
        </div>
    )
}
