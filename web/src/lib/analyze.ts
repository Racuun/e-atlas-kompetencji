import type { Question } from "./types";

function sigmoid(x: number) : number {
    var abs = Math.abs(x);
    var pow2 = Math.pow(2, abs -1);

    return  (1/(1 + Math.exp(-1 * pow2 * Math.sign(x))));
}

export default async function analyze(data: {q: Question, v: number}[]) {
    var aspDict = {};
    data.forEach(d => {
        var record = {kID: d.q.kID, value: sigmoid((d.q.negative ? -1 : 1) * d.v), n: 1};
        if (aspDict.hasOwnProperty(d.q.aID)) {
            record.value += aspDict[d.q.aID].value;
            record.n++;
        }
        aspDict[d.q.aID] = record;
    });

    for (const key of Object.keys(aspDict)) {
        aspDict[key].value /= aspDict[key].n;
        aspDict[key].value *= 9;
        aspDict[key].value = Math.round(aspDict[key].value * 10)/10
    }

    console.log(aspDict)

    var komDict = {};

    for (const key of Object.keys(aspDict)) {
        var record = {value: aspDict[key].value, n: 1};

        if (komDict.hasOwnProperty(aspDict[key].kID)) {
            record.value += aspDict[key].value;
            record.n ++;
        }

        komDict[aspDict[key].kID] = record;
    }

    for (const key of Object.keys(komDict)) {
        komDict[key].value /= komDict[key].n;
    }

    console.log(komDict);

    return { aspekty: aspDict, kompetencje: komDict };
}
