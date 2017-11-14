import React from 'react'
import styles from 'containers/min/Form.css'

export default function Layout(locals) {
    return (
        <div className={styles.Layout}>
            <div className={styles.Sidebar}>
                <div className={styles.RequiredInformation}>
                    {locals.inputs.required}
                </div>
                <div className={styles.UploadSet}>{locals.inputs.uploads}</div>
            </div>
            <div className={styles.ObservationSet}>
                {locals.inputs.observations}
            </div>
        </div>
    )
}
