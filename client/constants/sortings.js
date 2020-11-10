import { useIntlMemo } from 'hooks/intl'

export const ASC = 'asc'
export const DESC = 'desc'
export const NONE = 'none'

export function useSortings() {
  return useIntlMemo((intl) => new Map([
    [ASC, intl.formatMessage({
      defaultMessage: 'asc',
      description: 'Constants prismic',
    })],
    [DESC, intl.formatMessage({
      defaultMessage: 'desc',
      description: 'Constants prismic',
    })],
    [NONE, intl.formatMessage({
      defaultMessage: 'none',
      description: 'Constants prismic',
    })]
  ]))
}