import PARSER from '../parser'

const {assign} = Object

export default class NewWeatherForecast {
    constructor(data) {
        assign(this, data)
    }
    static fromDocument(document, parser = PARSER) {
        const data = parser.parse(document)

        return new NewWeatherForecast(data)
    }
}
