import { Aspekt } from "./aspekt";


export interface Kompetencja{
    id: number,
    name: string,
    metodyka: 'zuchowa' | 'harcerska' | 'wedrownicza' | 'N/D',
    x8: boolean,
    aspekty: Aspekt[],

    level1: string,
    level3: string,
    level5: string,
    level7: string,
    level9: string,
}
