import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import { Scale } from '~/components/scale/scale';
import questionStyles from './question.css?inline'

export default component$(() => {
  useStylesScoped$(questionStyles)
  const value = useSignal(0)

  const data = [{id: 1, label: 'label1'}, {id: 2, label: 'label2'}]

  

  return (
    <>
    {data.map(({id, label}) => (
      <div key={id} class='question'>
        <label>
          {label}
        </label>
        <Scale id={id.toString()} valueSignal={value}/>
      </div>
    ))}
      
    </>
  );
});
