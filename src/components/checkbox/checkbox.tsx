import type { Signal} from '@builder.io/qwik';
import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './checkbox.css?inline'

export interface CheckboxProps {
    checkedSignal?: Signal<boolean>;
    label?: string;
}

export const Checkbox = component$<CheckboxProps>((props) => {
    useStylesScoped$(styles)

    const isChcecked = props.checkedSignal;

  return (
    <label class='container'>
        <input type='checkbox' bind:checked={isChcecked}/>
        <span class='checkmark'></span>
        <span class='placeholder'>{props.label}</span>
    </label>
  );
});
