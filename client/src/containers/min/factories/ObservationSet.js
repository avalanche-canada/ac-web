import t from '~/vendor/tcomb-form'

// TODO: Remove this hack

export default class HackyObservationSet extends t.form.Struct {
    validate() {
        const result = super.validate()

        if (!this.state.hasError && !result.isValid()) {
            // Super hacky way to show errors the first time the validation run
            // Added to error on Avalanche type
            setTimeout(this.validate.bind(this))
        }

        return result
    }
}
