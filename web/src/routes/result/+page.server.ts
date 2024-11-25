import type { PageServerLoad } from "../quest/[stage]/$types";

export const load: PageServerLoad = async ({fetch, cookies}) => {

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

    const request = await fetch(process.env.CMS_URL as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query: query }),
      })

    const names = await request.json();

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

    KomData = JSON.parse(cookies.get('kom-results') as string)
    AspData = JSON.parse(cookies.get('asp-results') as string)




    return { kom, asp, KomData, AspData }

};
