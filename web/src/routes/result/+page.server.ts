import analyze from "$lib/analyze";
import dstrQuestion from "$lib/destrinify";
import { env } from "$lib/env";
import type { Question } from "$lib/types";
import { resolve } from "path";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({request, fetch, cookies}) => {

    const query = `{
        kompetencje
        {
            id
            nazwa
            aspekty {
                id
                nazwa
            }
        }
    }`

    const _request = await fetch(env.CMS_URL as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query: query }),
      })

    const names = await _request.json();

    console.log(JSON.stringify(names))

    let kom: { [id: string]: {name: string, }} = {};
    let asp: { [id: string]: {kID: number, name: string, }} = {};

    Array.from(names.data.kompetencje).forEach((d: any) => {
        d.aspekty.forEach((v: any) => {
            asp[v.id] = {kID: d.id, name: v.nazwa}
        })
        kom[d.id] = {name: d.nazwa}
    })


    /* GET DATA FROM QUESTIONARE */

    let KomData: { [id: string]: {value: number, n: number}};
    let AspData: { [id: string]: {kID:string, value: number, n: number}};

    let formData = null;
    try {
        formData = await request.formData();
    } catch (e) {
        console.warn("No data from form");
    }

    if (formData !== null) {
        // If there is available formData
        const data = formData;
        const keys = [...data.keys()];
        const values = [...data.values()];

        let answ: {q: Question, v: number}[] = [];
        for(let i=0; i < keys.length; i++) {
            answ.push({
                q: dstrQuestion(keys[i]),
                v: parseInt(values[i] as string)
            })
        }

        const analyzedData = await analyze(answ);
        KomData = analyzedData.kompetencje;
        AspData = analyzedData.aspekty;

        // cache results
        cookies.set("results-cache", JSON.stringify({"KomData": KomData, "AspData": AspData}), {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

    }
    else {
        // If there is not available formData
        if (cookies.get("results-cache") === undefined) {
            console.error("No cache");
            error(412, {
                message:"No data from form or cache is available",
            });
        }


        const cacheData = JSON.parse(cookies.get("results-cache") as string);

        KomData = cacheData.KomData;
        AspData = cacheData.AspData;

        // no need for caching
    }

    return { returnData: {
            kom,
            asp,
            KomData,
            AspData
        },
        resolve: true
    }

};

export const actions = {
    analyze: async ({ cookies, request }) => {
        //TODO: validation
        return { success: true };
    }
}
