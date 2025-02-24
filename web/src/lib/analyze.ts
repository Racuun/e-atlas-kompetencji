import { openAsBlob } from "fs";
import type { Question } from "./types";
import { request } from "http";

function sigmoid(x: number) : number {
    var abs = Math.abs(x);
    var pow2 = Math.pow(2, abs -1);

    return  (1/(1 + Math.exp(-1 * pow2 * Math.sign(x))));
}

export default async function analyze(data: {question: Question, score: number}[]) {
    var asp_group_by_level: {[id: string]: {levels: {[level:number]: {value:number, count:number}}, kID:string}} = {};

    data.forEach(record => {
        if ( asp_group_by_level.hasOwnProperty(record.question.aID) ) {

            if (asp_group_by_level[record.question.aID].levels.hasOwnProperty(record.question.level)) {

                asp_group_by_level[record.question.aID].levels[record.question.level].value += record.score * (record.question.negative ? -1 : 1);
                asp_group_by_level[record.question.aID].levels[record.question.level].count ++;

            } else {

                asp_group_by_level[record.question.aID].levels[record.question.level] = {
                    value: record.score * (record.question.negative ? -1 : 1),
                    count: 1,
                }
            }

            console.log(JSON.stringify(asp_group_by_level[record.question.aID].levels[record.question.level]));

        } else {

            let level = {
                value: (record.score * (record.question.negative ? -1 : 1)),
                count: 1,
            }

            asp_group_by_level[record.question.aID]= {
                levels: {},
                kID: record.question.kID
            }
            asp_group_by_level[record.question.aID].levels[record.question.level] = level;
        }
    })

    // calculate average for every level in aspects
    var aspDictionary: {[id: string]: {level:number, kID:string}} = {};

    for ( const aspekt of Object.keys(asp_group_by_level) ) {
        let levels: {[level:number]: number} = {};
        for ( const level of Object.keys(asp_group_by_level[aspekt].levels) ) {
            let temp = asp_group_by_level[aspekt].levels[parseInt(level)];
            levels[parseInt(level)] = temp.value / temp.count;
        }

        let score = -1;
        let previous = true;
        [1, 3, 5, 7, 9].forEach( lvl => {
            if (!levels.hasOwnProperty(lvl) && previous) {
                score += 2;
                previous = true;
            }
            else {
                if (previous) {
                    if (levels[lvl] >= 1.5) {
                        score += 2;
                        previous = true;
                    }
                    else if (levels[lvl] >= 0) {
                        score += 1;
                        previous = true;
                    }
                    else {
                        previous = false;
                    }
                }
                else {
                    if (levels[lvl] >= 2) {
                        score += 1.5;
                        previous = true;
                    }
                    else if (levels[lvl] >= 1) {
                        score += 1;
                    }
                    else if (levels[lvl] >= 0) {
                        score += 0.5;
                    }
                    else {
                        previous = false;
                    }
                }
            }
        })
        if (score < 1) score = 1;

        aspDictionary[aspekt] = {
            level: score,
            kID: asp_group_by_level[aspekt].kID,
        }
    }

    asp_group_by_level = {}; // clear

    //

    var kom_group_by_id: {[id:string]: {sum:number, asp_count:number}} = {}

    for ( const aspekt of Object.keys(aspDictionary) ) {
        let kID = aspDictionary[aspekt].kID;
        if (!kom_group_by_id.hasOwnProperty(kID)) {
            kom_group_by_id[kID] = {
                sum: aspDictionary[aspekt].level,
                asp_count: 1,
            }
            continue;
        }

        kom_group_by_id[kID].sum += aspDictionary[aspekt].level;
        kom_group_by_id[kID].asp_count ++;
    }

    var komDictionary: {[id:string]: number} = {};

    for ( const kID of Object.keys(kom_group_by_id) ) {
        komDictionary[kID] = kom_group_by_id[kID].sum / kom_group_by_id[kID].asp_count;
    }



    return { aspekty: aspDictionary, kompetencje: komDictionary };
}
