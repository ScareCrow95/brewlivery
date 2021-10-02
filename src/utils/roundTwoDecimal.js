export default function round(number) {
    return Math.round((number + Number.EPSILON) * 100) / 100
}
