import {mapProps} from 'recompose'
import {Subscribe} from 'services/mailchimp'

export default mapProps(({content: [{url}]}) => ({url}))(Subscribe)
