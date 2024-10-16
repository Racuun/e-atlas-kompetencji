import analyze from '$lib/analyze';
import dstrQuestion from '$lib/destrinify';
import type { Question } from '$lib/types';
import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions = {
    init: async({cookies, request}) => {

        const data = await request.formData();

        cookies.set('met', data.get('sel_met'), { path: '/'});
        cookies.set('x8', data.get('sel_x8'), { path: '/'});
        cookies.set('stat', data.get('sel_stat'), { path: '/'});
        cookies.set('fun', data.get('sel_fun'), { path: '/'});

        console.log(data.get('sel_x8')+ ', ' + data.get('sel_fun'))

        redirect(301, '/quest/2');


    },

    analyze: async ({request}) => {
        const data = await request.formData()
        const keys = [...data.keys()];
        const values = [...data.values() as string];

        let answ: {q: Question, v: number}[] = [];
        for(let i=0; i < keys.length; i++) {
            answ.push({
                q: dstrQuestion(keys[i]),
                v: parseInt(values[0])
            })
        }

        await analyze(answ);

        console.log(answ)
    }
}
