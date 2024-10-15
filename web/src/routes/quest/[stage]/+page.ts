import * as Types from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({fetch, params }) => {

    if (params.stage !== '2') {
        return {
            ready: false,
        }
    }

	const data: Types.Question[] = [
        {
            kID: 1,
            aID: 1,
            dID: 1,
            description: 'Definicja 1',
            level: 5,
            negative: false,
        },
        {
            kID: 1,
            aID: 1,
            dID: 2,
            description: 'Definicja2',
            level: 3,
            negative: true,
        }
    ]

	return {
		questions: [] = data,
        ready: true,
	};
};
