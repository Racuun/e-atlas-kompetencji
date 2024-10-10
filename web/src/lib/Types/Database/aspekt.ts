import { Definicja } from "./definicja";

export interface Aspekt {
    id: number,
    name: string,
    definicje: Definicja[],
}
