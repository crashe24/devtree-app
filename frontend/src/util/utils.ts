export function classNames(...classes : string[]) {
    return classes.filter(Boolean).join(' ')
}

export function isValidUrl (url: string) {
    try {
        new URL(url)
        return true
    } catch (error) {
        console.log('Error al validar la url', error)
        return false
    }
}