import react from 'react';
import DataManager from '../Model/DataManager';


export default function ComparisonTable(props) {

    const selectedZipcode = props.zipcode;
    const data = props.data;


    //Error handling
    if (selectedZipcode === null || selectedZipcode === undefined || data === null || data === undefined) {
        return <div></div>;
    }

    // Data processing 
    const dataManager = new DataManager(selectedZipcode, data);

    //dataManager.describe();
    const relativeRanking = dataManager.computeRelativeRanking(selectedZipcode, 91913);
    const percentile = dataManager.computePercentile();
    const ranking = dataManager.computeRanking();
    const population = dataManager.populationForZipcode();
    const isRateIncreasing = dataManager.positivityRateIncreasing();
    const positiveCaseRate = dataManager.averagePositiveCaseRate();
    const lastWeekCaseRate = dataManager.lastWeekAveragePositiveCaseRate();
    const numberOfCases = dataManager.exposureRate[selectedZipcode];

    var trendColor = isRateIncreasing === "Increasing rate" ? 'negative' : 'positive'

    return(
        <div>
            <table class="ui celled table"  style={{ marginTop: '40px'}}>

            <thead>
                <tr>
                <th>Zipcode</th>
                <th>{selectedZipcode}</th>
                </tr>
            </thead>

            <tbody>

                <tr>
                <td>Ranking</td>
                <td>{ranking}</td>
                </tr>

                <tr>
                <td>Number of cases:</td>
                <td>{numberOfCases}</td>
                </tr>

                <tr>
                <td>Percentile</td>
                <td>{percentile}</td>
                </tr>

                <tr className={trendColor}>
                <td>Trend</td>
                <td>{isRateIncreasing}</td>
                </tr>

                <tr>
                <td>Positive case rate:</td>
                <td>{positiveCaseRate}</td>
                </tr>

                <tr>
                <td>Last week:</td>
                <td>{lastWeekCaseRate}</td>
                </tr>

            </tbody>
            </table>
        </div>
    )

}