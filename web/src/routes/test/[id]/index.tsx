import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Scale } from '~/components/scale/scale';
import questionStyles from './question.css?inline'
import { Form, routeAction$, routeLoader$, useNavigate } from '@builder.io/qwik-city';

export const useSkillsData = routeLoader$(async () => {

  const res = await fetch('http://localhost:1339/api/skills?populate[aspekty][populate]=*&pagination[page]=1&pagination[pageSize]=1', {
    method: "GET",
    headers: {
      'Authorization': 'Bearer 4ad0cbfb8a8e769fd7fc949d4eea2de3d61ccbd40245e40fa9b3eac0b43e01ded24d7c70b9dad432d9a8864c285e121f315eb234686358b896574405cc1e4d86ff3fbfda202a70a818025898a68907864376a3e34b67bfb4740ee0f282637551a75ce385c7a7428b08d3d4b911ed7da1cf71cb9537d35d01587a38363a9df133'
    }
  });
  const aspects = (await res.json());
  return aspects;
})

export const useFillQuestionare = routeAction$( async (answ) => {
  console.log(answ)
})



export default component$(() => {
  useStylesScoped$(questionStyles)
  
  const data = useSkillsData();
  
  const action = useFillQuestionare();
  
  const newTab = useNavigate();

  return (
    <>
    <Form action={action}>  
    {data.value.data.map(({attributes, id}) => (
      <>
        {attributes.aspekty.map(({definicje, id}) => (
          <>
            {definicje.map(({opis, id, idd})=>(
              <div key={id} class='question'>
                {opis}
                <Scale id={'data.' + (id-1).toString()} />
              </div>
            ))}
          </>
        ))}
      </>
    ))}
      <button type='submit' onClick$={() => newTab()}>Submit</button>
    </Form>
    </>
  );
});
