import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './scale.css?inline'

export interface ScaleProps {
  id: string,
}

export const Scale = component$<ScaleProps>((props) => {
  useStylesScoped$(styles)

  return (
    <div class='scale'>
      <label class='container'>
        <input class='input' type='radio' name={props.id} value={-3} />
        <span class='checkmark' />
      </label>
      <label class='container'>
        <input class='input' type='radio' name={props.id} value={-2} />
        <span class='checkmark' />
      </label>
      <label class='container'>
        <input class='input' type='radio' name={props.id} value={-1} />
        <span class='checkmark' />
      </label>
      <label class='container'>
        <input class='input' type='radio' name={props.id} value={0} checked={true}/>
        <span class='checkmark' />
      </label>
      <label class='container'>
        <input class='input' type='radio' name={props.id} value={1} />
        <span class='checkmark' />
      </label>
      <label class='container'>
        <input class='input' type='radio' name={props.id} value={2} />
        <span class='checkmark' />
      </label>
      <label class='container'>
        <input class='input' type='radio' name={props.id} value={3} />
        <span class='checkmark' />
      </label>
    </div>
  );
});
