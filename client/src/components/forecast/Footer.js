import React, {PropTypes} from 'react'
import {withProps} from 'recompose'
import CSSModules from 'react-css-modules'
import BasePanel, {INVERSE} from 'components/panel'
import EXPLANATION from 'constants/forecast/danger/rating/explanation'
import {Generic} from 'prismic/components'
import styles from './Forecast.css'

const Panel = withProps({
    // theme: INVERSE,
    expandable: true,
})(BasePanel)

Footer.propTypes = {
    author: PropTypes.string,
}

function Footer({author}) {
    return (
        <footer styleName='Footer'>
            {author &&
                <dl>
                    <dt>Prepared by</dt>
                    <dd>{author}</dd>
                </dl>
            }
            <Panel header='Danger Ratings Explained'>
                {EXPLANATION}
            </Panel>
            <Panel header='Avalanche Forecasts in your Inbox'>
                <Generic type='generic' uid='forecast-rss-message' />
            </Panel>
            <Panel header='Forecast Disclaimer'>
                <Generic type='generic' uid='forecast-disclaimer' />
            </Panel>
        </footer>
    )
}

export default CSSModules(Footer, styles)
