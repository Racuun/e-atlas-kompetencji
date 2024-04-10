import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Hero, type HeroProps } from "./hero";

const meta: Meta<HeroProps> = {
  component: Hero,
};

type Story = StoryObj<HeroProps>;

export default meta;

export const Default: Story = {
  render: (props) => <Hero{...props}/>,
};