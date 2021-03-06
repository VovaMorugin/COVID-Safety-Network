import axios from 'axios'
import { sortDates } from '../utils/utils'
const defaultParams = {
    returnGeometry: false,
    outFields: `*`,
    outSR: 4326,
    f: 'json'
}

const startingMonth = '9'
const API_URL = 'https://gis-public.sandiegocounty.gov/arcgis/rest/services/Hosted/COVID19_CaseRateData/FeatureServer/1/query'



const getCurrentDateRange = () => {
    return axios.get(API_URL, {
        params: {
            ...defaultParams,
            where: `current_date_range >= '${startingMonth}' AND zip_code = '92113'`
        }
    })
        .then((response) => {
            const sortedDates = response.data.features.sort(sortDates('standard'))
            return sortedDates[sortedDates.length - 1]['attributes']['current_date_range']
        })
}

const getInfectionRatesInfo = (range) => {
    return axios.get(API_URL, {
        params: {
            ...defaultParams,
            where: `current_date_range = '${range}'`,

        }
    })
        .then((data) => {
            let worstInfectionRate = 0
            let infectionRatesByZipcode = {}
            const allZipCodes = data.data['features']

            for (const feature of allZipCodes) {
                const casesByZipCode = feature['attributes']['positive_tests_in_7_day_testing']
                const population = feature['attributes']['population']
                const infectionRate = casesByZipCode / population

                if (worstInfectionRate < infectionRate) {
                    worstInfectionRate = infectionRate
                }
                const zipCode = feature['attributes']['zip_code']
                infectionRatesByZipcode[zipCode] = infectionRate
            }
            return {
                worstInfectionRate: worstInfectionRate,
                infectionRatesByZipcode: infectionRatesByZipcode

            }
        })
}

// return number of cases per thousand people and dates
export const getDataForZipCode = (selectedZipcode) => {
    return axios.get(API_URL, {
        params: {
            ...defaultParams,
            where: `current_date_range >= '${startingMonth}' AND zip_code like '%${selectedZipcode}%'`
        }
    })
        .then(resp => {
            console.log(resp.data.features[7])
            let cases = []
            for (const data of resp.data.features) {
                const rawData = data['attributes']['current_date_range'].split('-')[1].split('/').slice(0, 2).join('/')
                const newNumber = Math.round(data['attributes'].positive_tests_in_7_day_testing / data['attributes'].population * 1000 * 10) / 10
                cases.push({ date: rawData, cases: newNumber })
            }
            return cases.sort(sortDates('custom'))
        })
}

export const getRawDataForZipCode = (selectedZipcode) => {
    return axios.get(API_URL, {
        params: {
            ...defaultParams,
            where: `current_date_range >= '${startingMonth}' AND zip_code like '%${selectedZipcode}%'`
        }
    })
        .then(resp => {
            let cases = []
            
            for (const data of resp.data.features) {
                const rawDate = data['attributes']['current_date_range'].split('-')[1].split('/').slice(0, 2).join('/')
                cases.push({ 
                    date: rawDate, 
                   ...data['attributes']
                })
            }
            return cases.sort(sortDates('custom'))
        })
}



export const getDataForHeatmap = () => {
    return getCurrentDateRange()
        .then((range) => getInfectionRatesInfo(range))
}




export const getLatestDataForAllZipCodes = () => {
    return getCurrentDateRange()
        .then((range) => {
            return axios.get(API_URL, {
                params: {
                    ...defaultParams,
                    where: `current_date_range = '${range}'`,

                }
            })
                .then((response) => response.data.features)
        })
}
