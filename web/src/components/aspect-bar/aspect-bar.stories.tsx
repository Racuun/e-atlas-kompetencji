import type { Meta, StoryObj } from "storybook-framework-qwik";
import { AspectBar, type AspectBarProps } from "./aspect-bar";

const meta: Meta<AspectBarProps> = {
  component: AspectBar,
};

type Story = StoryObj<AspectBarProps>;

export default meta;

export const Default: Story = {
    args: {
        min: 1,
        max: 9,
        value: 5,
        label: "AspectBar it is",
    },
  render: (props) => <AspectBar{...props}/>,
};