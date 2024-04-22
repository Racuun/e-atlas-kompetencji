import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Checkbox, type CheckboxProps } from "./checkbox";

const meta: Meta<CheckboxProps> = {
  component: Checkbox,
};

type Story = StoryObj<CheckboxProps>;

export default meta;

export const Default: Story = {
    args: {
        label: "Checkbox it is",
    },
  render: (props) => <Checkbox{...props}/>,
};