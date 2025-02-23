import { createHash } from "node:crypto";
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";
import type { Question } from "$lib/types";
import { env } from "$lib/env";

export const load: PageServerLoad = async ({ cookies, fetch }) => {
    return {
        returnData: new Promise<Question[]>(async (resolve, reject) => {

            let retData: Question[] = []

            // TODO Dynamic query based on config cookie
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

            const api_url = env.CMS_URL as string;
            let data;

            const request = await fetch(api_url as string, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                },
                body: JSON.stringify({ query: query }),
            })

            data = await request.json();

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



            resolve(retData);
        }),
        resolve: true,
    };
};

export const actions = {
    config: async ({ cookies, request }) => {
        console.log("\x1b[1;32;2m[/extended:action:config]:\x1b[0m Pulling form data...");
        const data = await request.formData();

        const typ = data.get('typ') as string;
        const metodyka = data.get('metodyka') as string;

        console.log("\x1b[1;32;2m[/extended:action:config]:\x1b[0m \x1b[2;3mtyp: \x1b[0m" + typ);
        console.log("\x1b[1;32;2m[/extended:action:config]:\x1b[0m \x1b[2;3mmetodyka: \x1b[0m" + metodyka);

        if (typ !== "8k" && typ !== "5k") {
            // TODO: reject config form
        }
        if (metodyka !== "zuch" && metodyka !== "harc" && metodyka !== "wedr") {
            // TODO: reject config form
        }

        const cuid = "eAT" + Date.now().toString(36) + Math.random().toString(36).substring(2,10);
        console.log("\x1b[1;32;2m[/extended:action:config]:\x1b[0m \x1b[2;3msession ID: \x1b[0m" + cuid);

        const session = createHash('sha512').update(cuid).digest('base64url');

        const payload = JSON.stringify({typ, metodyka});

        cookies.set(session + '-config', payload, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 60 * 60 * 24,
        });

        // TODO: create cookie validation

        console.log("\x1b[1;32;2m[/extended:action:config]:\x1b[0m \x1b[2;3mcookie: \x1b[0m\x1b[1;92mset\x1b[0m");

        return { success: true };
    }
} satisfies Actions;
