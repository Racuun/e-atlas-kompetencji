import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from "./menu-button.css?inline"

export interface MenuButtonProps {
  label?: string
}

export const MenuButton = component$<MenuButtonProps>((props) => {
  useStylesScoped$(styles);

  return (
    <button>
      <h3 class='txt'>{props.label}</h3>
    </button>
  );
});
