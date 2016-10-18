import {Element} from 'compose'
import styles from './Social.css'
import {neverUpdate} from 'compose'

export default neverUpdate(Element({
    name: 'SocialSet',
    styleName: 'Set',
    styles,
}))
