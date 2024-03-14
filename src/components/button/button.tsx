import { component$, useStylesScoped$ } from "@builder.io/qwik";

export interface ButtonProps {
  size?: "small" | "medium" | "large";
  label?: string;
}

export const Button = component$<ButtonProps>(({ size = "medium", label = "Button"}) => {
  useStylesScoped$(`
    .size-small {
      font-size: 16px;
    }
    .size-medium {
      font-size: 20px;
    }
    .size-large {
      font-size: 32px;
    }
    button {
      padding: 12px 32px;
      background-color: #3E6680;
      color: white;
      border: none;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      border-radius: 10px;
    }
  `);

  return (
    <button
      class={{
        [`size-${size}`]: true,
      }}
    >
      {label}
    </button>
  );
});
