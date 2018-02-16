import { Component } from 'react'

export default class StaticComponent extends Component {
    shouldComponentUpdate() {
        return false
    }
}

