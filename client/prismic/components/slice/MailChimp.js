import { mapProps } from 'recompose'
import { Subscribe } from '~/services/mailchimp'

export default mapProps(({ value }) => value[0])(Subscribe)
