import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './aspect-bas.css?inline'

export interface AspectBarProps {
  min: number,
  max: number,
  value: number,
  label: string,
}

export const AspectBar = component$<AspectBarProps>((props) => {
  useStylesScoped$(styles)
  return (
    <div class="container">
      <label class="label">{props.label}</label>
      <div class="bar" style={`${'width: ' + ((props.value/props.max)*400).toString() + 'px'}`}/>
      <span class="valueDisplay">{props.value}</span>
    </div>
  );
});
