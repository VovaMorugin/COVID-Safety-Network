import { useEffect, useContext } from 'react';
import ZipCodeContext from '../Contexts/zipCode'
export default function ZipcodeSelector(props) {

    const possibilities = props.data;


    // changed useState to useContext to connect 2 components selector and mapview.
    const { selectedZipcode, setZipcode } = useContext(ZipCodeContext)


    // Run processSelection() on any rerender WHEN the value of selectedZipcode has changed
    useEffect(() => {
        processSelection();
    }, [selectedZipcode]);


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

        let data = selectedZipcode;

        if (data === null) {
            return;
        }

        //Perform something meaningful here - maybe return data out of this component
        // alert("Selected zipcode: " + data);
    }





    return (
        <div style={{ marginTop: '100px' }}>


            <select className="ui search dropdown"
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