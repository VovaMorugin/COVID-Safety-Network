import axios from 'axios'


export const getData = (selectedZipcode) => {
    return axios.get(`https://gis-public.sandiegocounty.gov/arcgis/rest/services/Hosted/COVID19_CaseRateData/FeatureServer/1/query`, {
        params: {
            returnGeometry: false,
            where: `current_date_range >= '6' AND zip_code like '%${selectedZipcode}%'`,
            outFields: `*`,
            outSR: 4326,
            f: 'json'
        }
    })
        .then(resp => {
            let cases = []
            resp.data.features.map((data) => {
                const rawData = data['attributes']['current_date_range'].split('-')[1]
                // const d = new Date(rawData[2], rawData[0], rawData[1])
                const number = data['attributes']['positive_tests_in_7_day_testing']
                cases.push({ date: rawData, cases: number })
                // cases[rawData] = number
            })
            console.log(cases)
            return cases
        })
}