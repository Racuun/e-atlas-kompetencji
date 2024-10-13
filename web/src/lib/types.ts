export interface Question {
    kID: number,
    aID: number,
    dID: number,
    description: string,
    level: number
    negative: boolean,
}

export interface Kompetencja{
    id: number,
    name: string,
    metodyka: 'zuchowa' | 'harcerska' | 'wedrownicza' | 'N/D',
    x8: boolean,

    level1: string,
    level3: string,
    level5: string,
    level7: string,
    level9: string,
}

export interface Aspekt {
    id: number,
    name: string,
}

export interface Definicja {
    id: number,
    name: string,
    level: number,
    negative: boolean,
}
