import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle, withState } from 'recompose'
import { fetchStaticResource } from 'api'
import { InnerHTML } from 'components/misc'
import style from './ates.css'
import { Media, Caption } from 'components/media'
import { Image } from 'prismic/components/base'

const ExerciseShape = PropTypes.shape({
    slug: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    photo_credit: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
})

AtesExercise.propTypes = {
    exercises: PropTypes.arrayOf(ExerciseShape).isRequired,
}

function AtesExercise({ exercises }) {
    return (
        <div>
            {exercises.map(exercise => (
                <Section key={exercise.slug} {...exercise} />
            ))}
        </div>
    )
}

Section.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(ExerciseShape),
}

function Section({ title, desc, images }) {
    return (
        <section>
            <h1>{title}</h1>
            <InnerHTML component="p">{desc}</InnerHTML>
            {images.map((image, index) => <Exercise key={index} {...image} />)}
        </section>
    )
}

Input.propTypes = {
    value: PropTypes.string,
    picked: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

function Input({ value, onClick, children, picked }) {
    return (
        <label className={style.Input}>
            <input
                type="radio"
                onClick={onClick}
                value={value}
                checked={picked === value}
            />
            {children}
        </label>
    )
}

function Yep() {
    return <div className={style.Yep}>Well done — You’re right!</div>
}

function Nope() {
    return (
        <div className={style.Nope}>
            Sorry, that isn’t the right answer. Try again!
        </div>
    )
}

class Exercise extends Component {
    static propTypes = ExerciseShape
    state = {
        picked: null,
    }
    pickAnswer = event => {
        this.setState({ picked: event.target.value })
    }
    render() {
        const { url, caption, photo_credit, answer } = this.props
        const { picked } = this.state

        return (
            <Media>
                <Image url={url} copyright={photo_credit} />
                <Caption>
                    {caption}
                    {picked && (picked === answer ? <Yep /> : <Nope />)}
                    <div className={style.Choices}>
                        <Input
                            value="SIMPLE"
                            onClick={this.pickAnswer}
                            picked={picked}>
                            Simple
                        </Input>
                        <Input
                            value="CHALLENGING"
                            onClick={this.pickAnswer}
                            picked={picked}>
                            Challenging
                        </Input>
                        <Input
                            value="COMPLEX"
                            onClick={this.pickAnswer}
                            picked={picked}>
                            Complex
                        </Input>
                    </div>
                </Caption>
            </Media>
        )
    }
}

export default compose(
    withState('exercises', 'setExercises', []),
    lifecycle({
        componentDidMount() {
            fetchStaticResource('ates-exercise').then(this.props.setExercises)
        },
    })
)(AtesExercise)
