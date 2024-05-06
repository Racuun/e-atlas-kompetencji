import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import { Footer } from "../components/footer/footer";
import Map from '~/media/Mapa-atlas-2560.jpg?jsx';

import styles from "./styles.css?inline";
import { Navbar } from "~/components/navbar/navbar";

export const onGet: RequestHandler = async ({ cacheControl, url }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/

  if(url.pathname === '/') {
    cacheControl({
      // Always serve a cached response by default, up to a week stale
      staleWhileRevalidate: 60 * 60 * 24 * 7,
      // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
      maxAge: 5,
    });
  }
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <Map style={{position: 'fixed', scale: '120%', top: '0px', left: '0px', opacity: '0.3', zIndex: '-1', height: '100%', width: '100%', objectFit: 'none'}}/>
      <Navbar />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
