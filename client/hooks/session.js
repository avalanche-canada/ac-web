import { useSessionStorage } from 'hooks'

export function useVisibility(key, initialVisible = true) {
    const [visible, setVisible] = useSessionStorage(
        key + ':visible',
        initialVisible
    )
    function hide() {
        setVisible(false)
    }

    return [visible, hide]
}
