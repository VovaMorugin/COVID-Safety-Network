import zipCodeInfo from '../Model/ZIPCODES';

/*
Issues to work through:
    - Why does API call only fetch data for 8 zipcodes - even though there are 105?
    - In the exposure object, does the numberOfCases key match the value for zipcodes (is this key-value pair alligned correctly)?
    - Also confirm what data did I actually pass into the constructor - this week or last month's data?
*/


class DataManager {
    constructor(selectedZipcode, data) {
        this.selectedZipcode = selectedZipcode;
        this.data = data;

        this.structureData();
    }

    describe() {
        //console.log("Selected zipcode is: " + this.selectedZipcode + "\n\n" + "The data is: "  + this.data);
    }

    structureData() {
        //console.log(this.data);

        let data = this.data;
        var numberOfCases = data.map((object) =>  object.cases);
        var zipcodes = Object.keys(zipCodeInfo);

        //Error handling
        if (numberOfCases === null || numberOfCases === undefined) {
            return;
        }


        // ISSUE: notice this only returns 8
        console.log("Number of cases passed in: " + numberOfCases.length);
        console.log("Number of total zipcodes: " + zipcodes.length);

        this.numberOfCases = numberOfCases;
        this.zipcodes = this.zipcodes;


        // ISSUE: confirm this is correct - Building exposure data object 
        var exposureRate = {};
        zipcodes.forEach((key, i) => exposureRate[key] = numberOfCases[i]);

        this.exposureRate = exposureRate;
        console.log(exposureRate);
    }



    // Perform calculations
    computeRanking() {
        const exposureRate = this.exposureRate;

        if (exposureRate === null || exposureRate === undefined) {
            return;
        }

        const zipcode = this.selectedZipcode;
        const zipcodeCases = exposureRate[zipcode];
        const numberOfCases = this.numberOfCases;

        var rankingCounter = 0;

        for(var i = 0; i < numberOfCases.length; i++) {
            const caseload = numberOfCases[i];

            if (zipcodeCases > caseload) {
                rankingCounter++;
            }
        }

        console.log("rankingCounter: " + rankingCounter);
        return rankingCounter;

    }

    computeRelativeRanking(zipcodeOne, zipcodeTwo) {
        const exposureRate = this.exposureRate;

        if (exposureRate === null || exposureRate === undefined) {
            return;
        }

        var result = "";

        const zipcodeOneCases = exposureRate[zipcodeOne];
        const zipcodeTwoCases = exposureRate[zipcodeTwo];

        if (zipcodeOneCases  > zipcodeTwoCases) {
            result = ("" + zipcodeOne + " has a higher COVID-19 exposure rate");
        } else {
            result = ("" + zipcodeTwo + " has a higher COVID-19 exposure rate");
        }

        console.log(result);
        return result;
    }

    computePercentile() {
        const zipcode = this.selectedZipcode;
        const zipcodeCases = this.exposureRate[zipcode];


        if (zipcode === null || zipcode === undefined) {
            return;
        }

        const dataset = this.numberOfCases.sort();

        const percentile = this.percentRank(dataset, zipcodeCases);
        const percentileString = "" + percentile * 100 + "%";

        console.log(zipcode + " has more cases than " + percentileString + " of zipcodes.");
        return percentileString;
    }

    computeChangeSinceLastWeek() {

    }


    computeChangeSinceLastMonth() {

    }


    // Helper method - found here: https://gist.github.com/IceCreamYou/6ffa1b18c4c8f6aeaad2
    percentRank(array, n) {
        var L = 0;
        var S = 0;
        var N = array.length
    
        for (var i = 0; i < array.length; i++) {
            const element = array[i];

            if (element === null || element === undefined) {
                continue;
            }

            if (element <= n) {
                L += 1
            } else if (element === n) {
                S += 1
            } else {
    
            }
        }
    
        var pct = (L + (0.5 * S)) / N
    
        return pct
    }



}

export default DataManager;