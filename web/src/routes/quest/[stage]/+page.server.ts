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

    analyze: async({request}) => {
        console.log(await request.formData())
    }
}
