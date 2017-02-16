import React from 'react'
import CSSModules from 'react-css-modules'
import styles from 'containers/min/Form.css'
import Button from 'components/button'

const isSubmitting = false

function Layout(locals) {
    return (
        <div>
            <div styleName='Sidebar'>
                <div styleName='RequiredInformation'>
                    {locals.inputs.required}
                </div>
                <div styleName='Uploads'>
                    {locals.inputs.uploads}
                </div>
            </div>
            <div styleName='ObservationSet'>
                {locals.inputs.observations}
                <Button disabled={locals.disabled} type='submit'>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
            </div>
        </div>
    )
}

export default CSSModules(Layout, styles)
