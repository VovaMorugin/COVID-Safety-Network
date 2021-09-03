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
            <table className="ui celled table my-3">

            <thead>
                <tr>
                <th>Zipcode</th>
                <th>{selectedZipcode}</th>
                </tr>
            </thead>

            <tbody>

                <tr>
                <td>Ranking </td>
                <td data-tooltip="Ranking is computed by ordering all San Diego zip codes. With #1 having the least cases and #84 having the most." data-position="right center">{ranking}</td>
                </tr>

                <tr>
                <td>Number of cases:</td>
                <td data-tooltip="The number of new cases recorded this week." data-position="right center">{numberOfCases}</td>
                </tr>

                <tr>
                <td>Percentile</td>
                <td data-tooltip="The percentage of zipcodes (out of 100) with as many or less COVID cases than this one. Lower is better. " data-position="right center">{percentile}</td>
                </tr>

                <tr className={trendColor}>
                <td>Trend</td>
                <td data-tooltip="Did the percentage of positive cases increase or decrease since last weeek? " data-position="right center">{isRateIncreasing}</td>
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