import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Media, Caption } from 'components/media'
import { Image, StructuredText } from 'prismic/components/base'
import * as LocaleContext from 'contexts/locale'
import styles from './ATESExercise.css'

const VALUES = ['Simple', 'Challenging', 'Complex']

export default class ATESExercise extends Component {
    static propTypes = {
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
    state = {
        picked: null,
    }
    pickAnswer = event => {
        this.setState({
            picked: event.target.value,
        })
    }
    render() {
        const { image, credit, answer, caption } = this.props.nonRepeat
        const { picked } = this.state

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
                                    onChange={this.pickAnswer}
                                    picked={picked}>
                                    <LocaleContext.Translate>
                                        {value}
                                    </LocaleContext.Translate>
                                </Input>
                            ))}
                        </div>
                        {picked && (picked === answer ? <Yep /> : <Nope />)}
                    </Caption>
                </Media>
            </div>
        )
    }
}

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
    return <div className={styles.Yep}>Well done — You’re right!</div>
}

function Nope() {
    return (
        <div className={styles.Nope}>
            Sorry, that isn’t the right answer. Try again!
        </div>
    )
}
