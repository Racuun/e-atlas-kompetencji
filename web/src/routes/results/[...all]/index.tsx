import { component$, Resource, useResource$, useSignal, useStore, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { AspectBar } from '~/components/aspect-bar/aspect-bar';
import {isBrowser} from '@builder.io/qwik/build'


interface CookieAnswI {
  data: [{
    id: number,
    answ: number[]
  }]
}

interface Skill {
  name: string,
  aspects: Array<{name: string, avg: number}>
}

export const useLoader = routeLoader$(async ({query}) => {
  const x8 :boolean = query.has('x8');
  const metodyka: string | null = query.get('metodyka')
  const req= await fetch(
    ('http://localhost:1339/api/skills?' +
    'filters[x8][$eq]=' + x8 +
    '&filters[$or][0][metodyka][$eq]=N/D' + '&filters[$or][1][metodyka][$eq]=' + metodyka +
    '&populate[aspekty][populate]=*' +
    '&pagination[pageSize]=100'), 
    {
      method: "GET",
      headers: {
        'Authorization': 'Bearer 4ad0cbfb8a8e769fd7fc949d4eea2de3d61ccbd40245e40fa9b3eac0b43e01ded24d7c70b9dad432d9a8864c285e121f315eb234686358b896574405cc1e4d86ff3fbfda202a70a818025898a68907864376a3e34b67bfb4740ee0f282637551a75ce385c7a7428b08d3d4b911ed7da1cf71cb9537d35d01587a38363a9df133'
      }
  });
  return (await req.json()).data;
})

export default component$(() => {
  const visible = useSignal(false);
  useVisibleTask$(() => {
    visible.value = true;
  })


  let req_data = useLoader().value;

  const skills = useStore(Array<Skill>)

  const result = useResource$(({track, cleanup}) => {
    track(() => visible.value)

    console.log('checking...')

    if (!isBrowser) return;

    console.log('loading...')

    req_data.forEach(({id, attributes}) => {
      const ans = JSON.parse(sessionStorage.getItem(id)).data;

      let iter:number = 0;

      const skill: Skill = {
        name: attributes.nazwa,
        aspects: []
      }
      attributes.aspekty.forEach(aspekt => {
        
        const l = aspekt.definicje.length;
        let avg = 0;

        for (let i=0; i<l; i++) {
          avg += parseInt(ans[i+iter]);
        }
        avg = avg / l;

        skill.aspects.push({
          name: aspekt.nazwa,
          avg: avg
        })

        iter = l;
      });

      skills.push(skill)
    });
  })

  return (
    <Resource
      value={result}
      onPending={() => <p>Loading...</p>}
      onResolved={() =>
      <div class="skillDetails">
        {skills.map(({name, aspects}) => (
          <div key={name} class='skill'>
            <label>{name}</label>
            {aspects.map(({name, avg}) => (
              <AspectBar key={name} min={1} max={9} value={avg} label={name} />
            ))}
          </div>
        ))}
      </div>
      }
    />
  );
});
