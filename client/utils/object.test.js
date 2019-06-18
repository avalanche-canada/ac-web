import { clean } from './object'

test('clean objects', () => {
    expect(clean({})).toEqual({})
    expect(clean({ key: 'value' })).toEqual({ key: 'value' })
    expect(clean({ key: 0 })).toEqual({ key: 0 })
    expect(clean({ key: '' })).toEqual({ key: '' })
    expect(clean({ key: null })).toEqual({})
    expect(clean({ key: undefined })).toEqual({})
})
