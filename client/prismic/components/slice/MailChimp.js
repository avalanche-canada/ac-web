import { mapProps } from 'recompose'
import { Subscribe } from '~/services/mailchimp'
import { parseGroup } from '~/prismic/parsers'

export default mapProps(props => parseGroup(props)[0])(Subscribe)
