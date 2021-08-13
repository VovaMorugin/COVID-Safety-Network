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
                const rawData = data['attributes']['current_date_range'].split('-')[1].split('/').slice(0, 2).join('/')
                const number = data['attributes']['positive_tests_in_7_day_testing']
                cases.push({ date: rawData, cases: number })
            })
            return cases.sort(function (a, b) {

                var dateA = a.date.split('/')
                if (dateA[1].length == 1) {
                    dateA[1] = '0'.concat(dateA[1])
                }
                var dateB = b.date.split('/')
                if (dateB[1].length == 1) {
                    dateB[1] = '0'.concat(dateB[1])
                }
                return dateA.join() > dateB.join() ? 1 : dateA.join() < dateB.join() ? -1 : 0;
            })

        })
}