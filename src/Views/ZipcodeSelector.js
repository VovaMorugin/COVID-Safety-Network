import { useEffect, useContext, useState } from 'react';
import ZipCodeContext from '../Contexts/zipCode'
import { getLatestDataForAllZipCodes } from '../Model/APIManager'
import ComparisonTable from '../Views/ComparisonTable';
import Select from 'react-select'

export default function ZipcodeSelector(props) {

    const options = props.options

    // changed useState to useContext to connect 2 components selector and mapview.
    const { selectedZipcode, setZipcode } = useContext(ZipCodeContext)
    const [data, setData] = useState(null)


    // Run processSelection() on any rerender WHEN the value of selectedZipcode has changed
    useEffect(() => {
        processSelection();
    }, [selectedZipcode]);

    // NEW: perhaps modify this - provide fetch data so can store and pass it into DataManager
    useEffect(() => {
        getLatestDataForAllZipCodes()
            .then((result) => setData(result))
            .catch(() => console.log('error'))
    }, [])


    // Check to see if we entered a zipcode, before changing the state
    const validateZipcode = (input) => {
        let selection = parseInt(input)
        let isNumber = Number.isInteger(selection)

        if (!isNumber) {
            return;
        }

        setZipcode(selection);
    }


    // Do something with the selection
    const processSelection = () => {
        if (selectedZipcode === null) {
            return;
        }

        // // Data processing moved from here to ComparisonTable
    }

    return (
        <div>

            Enter in zipcode or city name:
            <Select options={options} onChange={(data) => validateZipcode(data.value)} />

            <ComparisonTable zipcode={selectedZipcode} data={data} />

        </div>
    )
}