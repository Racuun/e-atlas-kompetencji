import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Scale, type ScaleProps } from "./scale";

const meta: Meta<ScaleProps> = {
  component: Scale,
};

type Story = StoryObj<ScaleProps>;

export default meta;

export const Default: Story = {
    args: {
        id: 'abc'
    },
  render: (props) => <Scale{...props}/>,
};