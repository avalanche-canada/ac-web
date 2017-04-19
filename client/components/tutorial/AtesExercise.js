import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose, lifecycle, withState} from 'recompose'
import {fetchStaticResource} from '~/api'
import style from './ates.css'

const ExerciseShape = PropTypes.shape({
    slug: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    photo_credit: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
})

AtesExercise.propTypes = {
    exercises: PropTypes.arrayOf(ExerciseShape).isRequired,
}

function AtesExercise({exercises}) {
    return (
        <div>
            {exercises.map(exercise =>
                <Section key={exercise.slug} {...exercise} />
            )}
        </div>
    )
}

Section.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(ExerciseShape)
}

function Section({title, desc, images}){
    return (
        <div>
            <h1>{title}</h1>
            <p dangerouslySetInnerHTML={{__html: desc}} />
            <div className={style.ExerciseList}>
                {images.map((image, index) =>
                    <Exercise key={index} {...image} />
                )}
            </div>
        </div>
    )
}

Input.propTypes = {
    value: PropTypes.string,
    picked: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

function Input({value, onClick, children, picked}) {
    return (
        <label className={style.Input}>
            <input type="radio" onClick={onClick} value={value} checked={picked === value} />
            {children}
        </label>
    )
}

function Yep() {
    return (
        <div className={style.Yep}>
            Well done &mdash; You&rsquo;re right!
        </div>
    )
}

function Nope() {
    return (
        <div className={style.Nope}>
            Sorry, that isn&rsquo;t the right answer. Try again!
        </div>
    )
}

class Exercise extends Component {
    static propTypes = ExerciseShape
    state = {
        picked: null
    }
    pickAnswer(evt) {
        this.setState({picked: evt.target.value})
    }
    render() {
        let {url, caption, photo_credit, answer} = this.props
        let picked = this.state.picked

        return (
            <div className={style.Exercise}>
                <img src={url} />
                <p>{caption} <small className={style.PhotoCred}>Photo: {photo_credit}</small></p>
                {picked && (picked === answer ? <Yep/> : <Nope/>)}
                <div className={style.Choices}>
                    <Input value='SIMPLE'      onClick={e => this.pickAnswer(e)} picked={picked}>&nbsp; Simple</Input>
                    <Input value='CHALLENGING' onClick={e => this.pickAnswer(e)} picked={picked}>&nbsp; Challenging</Input>
                    <Input value='COMPLEX'     onClick={e => this.pickAnswer(e)} picked={picked}>&nbsp; Complex</Input>
                </div>
            </div>
        )
    }
}

export default compose(
    withState('exercises', 'setExercises', []),
    lifecycle({
        componentDidMount() {
            fetchStaticResource('ates-exercise.json').then(response => {
                this.props.setExercises(response.data)
            })
        },
    }),
)(AtesExercise)
