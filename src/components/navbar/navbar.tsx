import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { MenuButton } from '../menu-button/menu-button';
import Logo from '~/media/ZHR_Logo.png?jsx'
import styles from './navbar.css?inline'


export interface NavbarProps {

}

export const Navbar = component$<NavbarProps>(() => {
  useStylesScoped$(styles);
  return (
    <div class='navbar'>
        <div class='logo'>
            <Logo style={{width: '60px', height: '70px'}}/>
            <h2>Centralna szkoła instruktorska</h2>
        </div>
        <ul>
            <li>
                <a href="/">
                    <MenuButton label='O atlasie'/>
                </a>
            </li>
            <li>
                <a href="/">
                    <MenuButton label='Do pobrania'/>
                </a>
            </li>
            <li>
                <a href="/">
                    <MenuButton label='Materiały'/>
                </a>
            </li>
        </ul>
    </div>
  );
});