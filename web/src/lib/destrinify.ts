import type { Question } from "./types";

export default function dstrQuestion(ret:string) :Question {
    const IDs: string[] = ret.split('/');
    return {
        kID: IDs[0],
        aID: IDs[1],
        dID: IDs[2],
        level: parseInt(IDs[3]),
        negative: (IDs[4] === 'true'),
        description: ''
    }
}
