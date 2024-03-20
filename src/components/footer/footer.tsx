import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './footer.css?inline'

export interface FooterProps {

}

export const Footer = component$<FooterProps>(() => {
    useStylesScoped$(styles);
    return (
        <div class='footer'>
            <h4>Centralna Szkoła Instruktorska</h4>
            <h4>Organizacja Harcerzy</h4>
            <a href="https:/zhr.pl/">
                <h4>Związek Harcerstwa Rzeczypospolitej</h4>
            </a>
            <div class='copyright'>
              <h4>@ Copyright 2024 -- created by Łukasz Kmiecik</h4>  
            </div>
        </div>
    );
})