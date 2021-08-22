import zipCodeInfo from '../Model/ZIPCODES';

/*
    Generate a data dictionary of these metrics
*/

class DataManager {
    constructor(selectedZipcode, data) {
        //console.log(data)
        this.selectedZipcode = selectedZipcode;
        this.data = data;

        this.structureData();
    }

    describe() {
        //console.log("Selected zipcode is: " + this.selectedZipcode + "\n\n" + "The data is: "  + this.data);
    }

    structureData() {
        console.log(this.data);

        let data = this.data;
        var numberOfCases = data.map((object) =>  object['attributes']['positive_tests_in_7_day_testing']);
        var citizenCount = data.map((object) =>  object['attributes']['population']);
        var caseRate = data.map((object) =>  object['attributes']['f7_day_average_case_rate']);
        var lastWeekCaseRate = data.map((object) =>  object['attributes']['previous_week_case_rate']);
        var zipcodes = Object.keys(zipCodeInfo);

        //Error handling
        if (numberOfCases === null || numberOfCases === undefined) {
            return;
        }


        // ISSUE: notice this only returns 8
        console.log("Number of cases passed in: " + numberOfCases.length);
        console.log("Number of total zipcodes: " + zipcodes.length);

        this.numberOfCases = numberOfCases;
        this.zipcodes = zipcodes;


        // ISSUE: confirm this is correct - Building exposure data object 
        var exposureRate = {};
        zipcodes.forEach((key, i) => exposureRate[key] = numberOfCases[i]);

        var population = {};
        zipcodes.forEach((key, i) => population[key] = citizenCount[i]);

        var caseRates = {};
        zipcodes.forEach((key, i) => caseRates[key] = caseRate[i]);

        var lastWeekCaseRates = {};
        zipcodes.forEach((key, i) => lastWeekCaseRates[key] = lastWeekCaseRate[i]);

        this.exposureRate = exposureRate;
        this.population = population;
        this.caseRates = caseRates;
        this.lastWeekCaseRates = lastWeekCaseRates;

        //console.log(exposureRate);
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

        var suffix = ""
        switch(rankingCounter) {
            case 1:
                suffix = "st";
                break;
            case 2:
                suffix = "nd";
                break;
            case 3:
                suffix = "rd";
                break;
            default:
                suffix = "th";
                break;
        }


        console.log("ranking: " + rankingCounter + suffix + " out of " + this.numberOfCases.length);
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

    populationForZipcode() {
        const zipcodePopulation = this.population[this.selectedZipcode];

        console.log("population for zipcode is: " + zipcodePopulation);
        return this.zipcodePopulation;
    }

    positivityRateIncreasing() {
        const caseRate = this.caseRates[this.selectedZipcode];
        const lastWeekcaseRate = this.lastWeekCaseRates[this.selectedZipcode];

        if (caseRate === null || caseRate === undefined || lastWeekcaseRate === null || lastWeekcaseRate === undefined) {
            return;
        }

        const comparison = caseRate > lastWeekcaseRate;
        const comparisonString = comparison === true ? "Increasing rate" : "Decreasing rate";

        console.log(comparisonString);
        return comparisonString;
    }


    averagePositiveCaseRate() {
        const caseRate = this.caseRates[this.selectedZipcode];

        if (caseRate === null || caseRate === undefined) {
            return;
        }

        const caseRateString = "" + this.round(caseRate) + "% positive cases rate this week";

        console.log(caseRateString);
        return caseRateString;
    }

    lastWeekAveragePositiveCaseRate() {
        const lastWeekcaseRate = this.lastWeekCaseRates[this.selectedZipcode];

        if (lastWeekcaseRate === null || lastWeekcaseRate === undefined) {
            return;
        }

        const lastWeekcaseRateString = "" + this.round(lastWeekcaseRate) + "% positive cases rate last week";

        console.log(lastWeekcaseRateString);
        return lastWeekcaseRateString;
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
    
        var pct = (L + (0.5 * S)) / N;

        var roundedPercent = this.round(pct);
    
        return roundedPercent;
    }

    round(num) {
        var m = Number((Math.abs(num) * 1000).toPrecision(15));
        return Math.round(m) / 1000 * Math.sign(num);
    }



}

export default DataManager;