import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './hero.css?inline';
import { Navbar } from '../navbar/navbar';
import { Button } from '../button/button';

export interface HeroProps {

}

export const Hero = component$<HeroProps>(() => {
  useStylesScoped$(styles);
  return (
    <div class='hero'>
      <div class='name-text'>
        <h1>ATLAS</h1>
        <h2>KOMPETENCJI</h2>
      </div>
      <div class='questionary-entry'>
        <Button size='large' label='ZUCHOWA'/>
        <Button size='large' label='HARCERSKA'/>
        <Button size='large' label='WĘDROWNICZA'/>
      </div>
    </div>
  );
});
