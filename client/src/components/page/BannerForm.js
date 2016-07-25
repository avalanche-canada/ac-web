import React, { PropTypes, Children} from 'react'
import CSSModules from 'react-css-modules'
import {Form, Fieldset, Legend, ControlSet, Control, Submit} from '../form'
import styles from './Page.css'

BannerForm.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    legend: PropTypes.string.isRequired,
}

function BannerForm({ legend, children, ...props }) {
    return (
        <Form styleName='BannerForm' {...props} >
            <Fieldset>
                <Legend>{legend}</Legend>
                <ControlSet horizontal>
                    {children}
                    <Control>
                        <Submit>
                            Search
                        </Submit>
                    </Control>
                </ControlSet>
            </Fieldset>
        </Form>
    )
}

export default CSSModules(BannerForm, styles)
