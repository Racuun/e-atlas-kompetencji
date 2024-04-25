import { component$, useStylesScoped$, $ } from "@builder.io/qwik";
import styles from './button.css?inline'

export interface ButtonProps {
  size?: "small" | "medium" | "large";
  label?: string;
}

export const Button = component$<ButtonProps>(({ size = "medium", label = "Button"}) => {
  useStylesScoped$(styles);

  const clog = $(() => console.log('Clicked!'));
    
  return (
    <button
      class={{
        [`size-${size}`]: true,
      }}
      onClick$={clog}
    >
      {label}
    </button>
  );
});
