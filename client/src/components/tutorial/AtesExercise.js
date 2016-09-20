
import React from 'react'

import exercises from './ates_exercise.json'
import style from './ates.css'


const AtesExercise = () => (
    <div>{exercises.map( e => <Section {...e} /> )}</div>
)

function Section({title, desc, images}){
    return (
        <div>
            <h1>{title}</h1>
            <p dangerouslySetInnerHTML={{__html: desc}} />
            <div className={style.ExerciseList}>
                {images.map( i => <Exercise {...i} /> )}
            </div>
        </div>
    )
}

function Input({value, onClick, children, picked}) {
    return (
        <label className={style.Input}><input type="radio" onClick={onClick} value={value} checked={picked === value} />{children}</label>
    )
}

const Yep   = () => <div className={style.Yep}>Well done &mdash; You&rsquo;re right!</div>
const Nope  = () => <div className={style.Nope}>Sorry, that isn&rsquo;t the right answer. Try again!</div>

class Exercise extends React.Component {
    state = { picked: null }

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

    pickAnswer(evt) {
        this.setState({picked: evt.target.value})
    }
}

export default AtesExercise

