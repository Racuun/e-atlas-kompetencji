import type { Meta, StoryObj } from "storybook-framework-qwik";
import { MenuButton, type MenuButtonProps } from "./menu-button";

const meta: Meta<MenuButtonProps> = {
  component: MenuButton,
};

type Story = StoryObj<MenuButtonProps>;

export default meta;

export const Default: Story = {
    args: {
        label: 'Menu Button'
    },
  render: (props) => <MenuButton{...props}/>,
};