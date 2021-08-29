import { getDataForZipCode, getRawDataForZipCode } from '../Model/APIManager'

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


export const getData = async (locations) => {
    let result = []
    for (const location of locations) {
        await getDataForZipCode(location['value'])
            .then((data) => {
                for (const index in data) {
                    if (result[index] === undefined) {
                        result.push({ date: data[index]['date'], [location['label']]: data[index]['cases'] })
                    } else {
                        result[index][location['label']] = data[index]['cases']
                    }
                }
            })
    }
    return result
}



export const getDataForGraph = async (locations) => {
    let result = []
    for (const location of locations) {
        await getRawDataForZipCode(location['value'])
            .then((data) => {
                for (const index in data) {
                    if (result[index] === undefined) {

                        result.push({
                            date: data[index]['date'], [location['label']]:
                            {
                                per_thousand: Math.round(data[index].positive_tests_in_7_day_testing / data[index].population * 1000 * 10) / 10,
                                ...data[index]
                            }
                        })

                    } else {
                        result[index][location['label']] = {
                            per_thousand: Math.round(data[index].positive_tests_in_7_day_testing / data[index].population * 1000 * 10) / 10,
                            ...data[index]
                        }
                    }
                }
            })
    }
    return result
}