import startCase from 'lodash/startCase'

export function classify(string) {
    return startCase(string).replace(' ', '', 'g')
}
