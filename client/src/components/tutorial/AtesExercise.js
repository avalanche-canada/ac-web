import React, {Component} from 'react'
import {compose, lifecycle, withState} from 'recompose'
import {fetchStaticResource} from '/api'
import style from './ates.css'

function AtesExercise({exercises}) {
    return (
        <div>
            {exercises.map(exercise =>
                <Section key={exercise.slug} {...exercise} />
            )}
        </div>
    )
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
            const {setIsLoading, setExercises} = this.props

            fetchStaticResource('ates-exercise.json').then(response => {
                setExercises(response.data)
            })
        },
    }),
)(AtesExercise)
