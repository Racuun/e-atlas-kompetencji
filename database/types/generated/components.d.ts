import type { Schema, Attribute } from '@strapi/strapi';

export interface AtlasAspekt extends Schema.Component {
  collectionName: 'components_atlas_aspekts';
  info: {
    displayName: 'aspekt';
    icon: 'apps';
  };
  attributes: {
    nazwa: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Nazwa aspektu'>;
    definicje: Attribute.Component<'atlas.definicja', true> &
      Attribute.Required;
  };
}

export interface AtlasDefinicja extends Schema.Component {
  collectionName: 'components_atlas_definicjas';
  info: {
    displayName: 'definicja';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    opis: Attribute.String & Attribute.Required;
    poziom: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 9;
        },
        number
      > &
      Attribute.DefaultTo<5>;
    negatywna: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'atlas.aspekt': AtlasAspekt;
      'atlas.definicja': AtlasDefinicja;
    }
  }
}
