import { component$, useStylesScoped$, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { Scale } from '~/components/scale/scale';
import questionStyles from './question.css?inline'
import { Form, routeAction$, routeLoader$, useLocation, useNavigate } from '@builder.io/qwik-city';
import { Session } from 'inspector';

let x8: boolean;

export const useSkillsData = routeLoader$(async ({params, query}) => {
  x8 = query.has('x8');
  const metodyka: string | null = query.get('metodyka')



  const res = await fetch(
    ('http://localhost:1339/api/skills?' +
    'filters[x8][$eq]=' + x8 +
    '&filters[$or][0][metodyka][$eq]=N/D' + '&filters[$or][1][metodyka][$eq]=' + metodyka +
    '&populate[aspekty][populate]=*' +
    '&pagination[page]=' + params.id +
    '&pagination[pageSize]=1'), 
    {
      method: "GET",
      headers: {
        'Authorization': 'Bearer 4ad0cbfb8a8e769fd7fc949d4eea2de3d61ccbd40245e40fa9b3eac0b43e01ded24d7c70b9dad432d9a8864c285e121f315eb234686358b896574405cc1e4d86ff3fbfda202a70a818025898a68907864376a3e34b67bfb4740ee0f282637551a75ce385c7a7428b08d3d4b911ed7da1cf71cb9537d35d01587a38363a9df133'
      }
  });
  const data = (await res.json());
  return data;
})

export const useFillQuestionare = routeAction$( async (_answ, event) => {
  return {
    succes: true,
    _answ
  }
})

async function save(id:string, data) {
  sessionStorage.setItem(id, JSON.stringify(data));
}

export default component$(() => {
  useStylesScoped$(questionStyles)
  
  let data = useSkillsData();
  const meta = data.value.meta;
  data = data.value.data;
  
  const action = useFillQuestionare();
  
  

  const newTab = useNavigate();

  const locattion = useLocation();
  const nextPageId = parseInt(locattion.params.id) + 1;
  const newPageAdrr = (nextPageId > meta.pagination.pageCount) ? '/results/' + Date.now().toString() + (x8 && '?x8') : '/test/' + nextPageId;
  console.log(nextPageId > meta.pagination.pageCount)
  console.log(newPageAdrr)
  
  useTask$(async ({track}) => {
    track(() => action.value?.succes)

    if(!action.value?.succes)
      return;

    save(locattion.params.id, action.value._answ)
    newTab(newPageAdrr)
  })

  return (
    <>
    <Form action={action}>  
    {data.map(({attributes, id}) => (
      <div key={id}>
        {attributes.aspekty.map(({definicje, id}) => (
          <div key={id}>
            {definicje.map(({opis, id})=>(
              <div key={id} class='question'>
                {opis}
                <Scale id={'data.' + (id-1).toString()} />
              </div>
            ))}
          </div>
        ))}
      </div>
    ))}
      <button type='submit'>Submit</button>
    </Form>
    </>
  );
});
