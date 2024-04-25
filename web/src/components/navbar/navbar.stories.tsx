import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Navbar, type NavbarProps } from "./navbar";

const meta: Meta<NavbarProps> = {
  component: Navbar,
};

type Story = StoryObj<NavbarProps>;

export default meta;

export const Default: Story = {
  render: (props) => <Navbar{...props}/>,
};