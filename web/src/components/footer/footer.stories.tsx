import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Footer, type FooterProps } from "./footer";

const meta: Meta<FooterProps> = {
  component: Footer,
};

type Story = StoryObj<FooterProps>;

export default meta;

export const Default: Story = {
  render: (props) => <Footer{...props}/>,
};