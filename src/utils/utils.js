export const sortDates = (type) => (a, b) => {

    let dateA = type === 'standard' ? a['attributes']['current_date_range'].split('-')[1].split('/') : a.date.split('/')
    let dateB = type === 'standard' ? b['attributes']['current_date_range'].split('-')[1].split('/') : b.date.split('/')

    if (dateA[1].length === 1) {
        dateA[1] = '0'.concat(dateA[1])
    }

    if (dateB[1].length === 1) {
        dateB[1] = '0'.concat(dateB[1])
    }

    return dateA.join() > dateB.join() ? 1 : dateA.join() < dateB.join() ? -1 : 0
}