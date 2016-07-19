import PARSER from '../parser'

const {assign} = Object

export default class WeatherForecastTutorial {
    constructor(data) {
        assign(this, data)
    }
    static fromDocument(document, parser = PARSER) {
        const data = parser.parse(document)

        return new WeatherForecastTutorial(data)
    }
}
