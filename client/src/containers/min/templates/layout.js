import React from 'react'
import CSSModules from 'react-css-modules'
import styles from 'containers/min/Form.css'

function Layout(locals) {
    return (
        <div styleName='Layout'>
            <div styleName='Sidebar'>
                <div styleName='RequiredInformation'>
                    {locals.inputs.required}
                </div>
                <div styleName='UploadSet'>
                    {locals.inputs.uploads}
                </div>
            </div>
            <div styleName='ObservationSet'>
                {locals.inputs.observations}
            </div>
        </div>
    )
}

export default CSSModules(Layout, styles)
