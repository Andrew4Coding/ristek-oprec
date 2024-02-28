export function thousandSeparator(string: string) {
    return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}