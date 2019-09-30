export default function TagTitle({ value }) {
    return value === 'foundation'
        ? 'AVALANCHE CANADA FOUNDATION'
        : value.toUpperCase()
}
