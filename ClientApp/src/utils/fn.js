export const inArray = (element, array) => {
    console.log(array)
    array.forEach(item => {
        if(item.id == element) {
            return true
        }
    })
    return false
}