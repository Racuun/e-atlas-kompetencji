// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  integer,
  checkbox,
  image,
} from '@keystone-6/core/fields'

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document'
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import { type Lists } from '.keystone/types'

export const lists = {
  User: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user - this may or may not be a good idea for your project
        isIndexed: 'unique',
      }),

      password: password({ validation: { isRequired: true } }),

      createdAt: timestamp({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: 'now' },
      }),
    },
  }),


  Definicja: list({
    access: allowAll,

    fields: {
      opis: text({ validation: { isRequired: true } }),
      poziom: integer({
        validation: {
          isRequired: true,
          min: 1,
          max: 9,
        }
      }),
      negatywna: select({
        type: 'enum',
          options: [
            { label: 'Negatywna', value: 'negative' },
            { label: 'Pozytywna', value: 'positive' },
          ],
          label: "Charakter definicji: ",
          defaultValue: 'positive',
          db: { isNullable: false },
          validation: {isRequired: true },
          ui: { displayMode: 'segmented-control'},
      }),

      aspekt: relationship({
        ref: 'Aspekt.definicje',
        many: false,
        ui: {
          hideCreate: false,
          displayMode: 'cards',
          cardFields: [ 'nazwa' ],
          removeMode: 'none'
        }
      }),

      aktualizacja: timestamp({
        defaultValue: { kind: 'now' },
        db: {
          updatedAt: true,
        }
      })
    },

    ui: {
      labelField: 'opis',
      listView: { initialColumns: ['opis', 'poziom'] },
      itemView: { defaultFieldMode: ({ session, context }) => 'read'},
      label: 'Definicje',
      singular: 'Definicja',
      plural: 'Definicje',
      hideCreate: ({ session, context }) => true,
    },

    graphql: {
      plural: 'Definicje',
    }
  }),


  /* Define Aspekt list */

  Aspekt: list({
    access: allowAll,

    fields: {
      nazwa: text({ validation: { isRequired: true } }),
      definicje: relationship({
        ref: 'Definicja.aspekt',
        many: true,
        ui: {
          hideCreate: false,
          displayMode: 'cards',
          cardFields: [ 'opis', 'poziom', 'negatywna' ],
          inlineEdit: { fields: [ 'poziom', 'negatywna' ] },
          inlineCreate: { fields: [ 'opis', 'poziom', 'negatywna' ] },
          inlineConnect: true,
          removeMode: 'disconnect',
        }
      }),
      kompetencja: relationship({
        ref: 'Kompetencja.aspekty',
        many: false,
        ui: {
          hideCreate: false,
          displayMode: 'cards',
          cardFields: [ 'nazwa' ],
          inlineConnect: true,
          removeMode: 'disconnect'
        }
      })
    },

    ui: {
      labelField: 'nazwa',

      label: 'Aspekty',
      singular: 'Aspekt',
      plural: 'Aspekty',
      hideCreate: ({ session, context }) => false,
    },

    graphql: {
      plural: 'Aspekty',
    }
  }),


  /* Define Kompetencja List */

  Kompetencja: list({
    access: allowAll,

    fields: {
      nazwa: text({ validation: { isRequired: true } }),
      metodyka: select({
        type: 'string',
        options:[
          { label: "Harcerska", value: 'harc' },
          { label: "Wędrownicza", value: 'wedr' },
          { label: "Zuchowa", value: 'zuch' },
          { label: "Nie dotyczy", value: 'N/A' },
        ],
        defaultValue: 'N/A',
      }),

      aspekty: relationship({
        ref: 'Aspekt.kompetencja',
        many: true,
        ui: {
          hideCreate: false,
          displayMode: 'cards',
          cardFields: [ 'nazwa' ],
          inlineEdit: { fields: [ 'nazwa' ] },
          inlineConnect: true,
          removeMode: 'disconnect',
        }
      }),

      logo: image({ storage: 'local_images' }),
    },

    ui: {
      labelField: 'nazwa',

      label: 'Kompetencje',
      singular: 'Kompetencja',
      plural: 'Kompetencje',
      hideCreate: ({ session, context }) => false,
    },

    graphql: {
      plural: 'Kompetencje',
    }
  }),


} satisfies Lists
