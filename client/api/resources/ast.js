import { unstable_createResource as createResource } from 'react-cache'
import * as ast from 'api/requests/ast'
import fetch from 'services/fetch'

export const Courses = createResource(() => fetch(ast.courses(PARAMS)))
export const Providers = createResource(() => fetch(ast.providers(PARAMS)))

const PARAMS = {
    page_size: 1000,
}
