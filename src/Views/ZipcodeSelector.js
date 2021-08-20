import { useEffect, useContext, useState } from 'react';
import ZipCodeContext from '../Contexts/zipCode'
import DataManager from '../Model/DataManager';
import { getLatestDataForAllZipCodes } from '../Model/APIManager'


export default function ZipcodeSelector(props) {

    const possibilities = props.data;


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

        // NEW: added DataManager object
        let dataManager = new DataManager(selectedZipcode, data);
        dataManager.describe();
        dataManager.computeRelativeRanking(91914, 91913);
        dataManager.computePercentile();
        dataManager.computeRanking();


    }





    return (
        <div style={{ marginTop: '100px' }}>


            <select className="ui fluid search dropdown"
                onInput={(e) => validateZipcode(e.target.value)} >

                <option value="">Enter in zip code:</option>

                {possibilities.map((zipcode, index) =>
                    <option key={index}>
                        {zipcode}
                    </option>)}

            </select>

        </div>
    )
}