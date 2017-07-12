import { renameProp } from 'recompose'
import { Header } from '~/components/sidebar'

export default renameProp('value', 'children')(Header)
