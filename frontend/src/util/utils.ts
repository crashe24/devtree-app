export function classNames(...classes : string[]) {
    return classes.filter(Boolean).join(' ')
}

export function isValidUrl (url: string) {
    console.log('url', url)
    try {
        new URL(url)
        return true
    } catch (error) {
        console.log('entro', error)
        //console.log('error', error)
        return false
    }
}