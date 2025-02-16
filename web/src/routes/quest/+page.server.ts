import analyze from '$lib/analyze';
import dstrQuestion from '$lib/destrinify';
import type { Question } from '$lib/types';
import process from 'process';
import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';


export const load: PageLoad = async ({ fetch, params }) => {

    if (params.stage !== '2') {
        return {
            ready: false,
        }
    }


    let retData: Question[] = []


    const query = `{
        definicje ( where: {
            aspekt: {
                NOT: {
                    kompetencja: null
                }
            }
        }
        ) {
            id
            poziom
            opis
            negatywna
            aspekt {
                id
                kompetencja {
                    id
                }
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

    const data = await request.json();



    console.log("Recieved data: " + JSON.stringify(data))

    retData = Array.from(data.data.definicje).map((value: any) => {
        return {
            kID: value.aspekt.kompetencja.id as string,
            aID: value.aspekt.id as string,
            dID: value.id as string,
            description: value.opis as string,
            level: value.poziom as number,
            negative: (value.negatywna === 'negative' ? false : true)
        } as Question
    })

    console.log("Data: " + JSON.stringify(retData));



	return {
		questions: [] = retData,
        ready: true,
	};
};



export const actions = {
    init: async({cookies, request}) => {

        const data = await request.formData();

        cookies.set('met', data.get('sel_met') as string, { path: '/'});
        cookies.set('x8', data.get('sel_x8') as string, { path: '/'});
        cookies.set('stat', data.get('sel_stat') as string, { path: '/'});
        cookies.set('fun', data.get('sel_fun') as string, { path: '/'});

        console.log(data.get('sel_x8')+ ', ' + data.get('sel_fun'))

        redirect(301, '/quest');

    },

    analyze: async ({request, cookies}) => {
        const data = await request.formData()
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

        cookies.set('asp-results', JSON.stringify(analyzedData.aspekty), { path: '/' })
        cookies.set('kom-results', JSON.stringify(analyzedData.kompetencje), { path: '/' })


        redirect(301, '/result');
    }
}
