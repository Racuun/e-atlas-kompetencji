import type { PageLoad } from "../quest/$types";

export const load: PageLoad = async({}) => {

    const KomData = {
        '1': { value: 8.8, n: 1},
        '2': { value: 3.8, n: 1},
        '3': { value: 5.8, n: 1},
        '4': { value: 6, n: 1},
        '5': { value: 7.2, n: 1},
        '6': { value: 1.0, n: 1},
        '7': { value: 4.5, n: 1},
        '8': { value: 5.4, n: 1}
    }

    const AspData = {
        '1': { kID: '1', value: 8.8, n: 1},
        '2': { kID: '1', value: 3.8, n: 1},
        '3': { kID: '1', value: 5.8, n: 1},
        '4': { kID: '2', value: 6, n: 1},
        '5': { kID: '2', value: 7.2, n: 1},
        '6': { kID: '2', value: 1.0, n: 1},
        '7': { kID: '3', value: 4.5, n: 1},
        '8': { kID: '3', value: 5.4, n: 1}
    }


    return { KomData, AspData }

};
