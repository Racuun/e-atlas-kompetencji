// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config
import 'dotenv/config'

import { config } from '@keystone-6/core'

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema'

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth'


export default withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: process.env.DB_PROVIDER as any,
      url: process.env.DB_URL as string,
      shadowDatabaseUrl: process.env.DB_SHADOW_URL as string,
      onConnect: async context => { /* ... */ },
      enableLogging: true,
      idField: { kind: 'cuid' },
    },
    lists,
    session,
    server: {
      port: parseInt(process.env.PORT as string),
      cors: { origin: ['http://localhost:5173'], credentials: true },
    },

    storage: {
      local_images: {
        kind: 'local',
        type: 'image',
        generateUrl: path => `http://localhost:${process.env.PORT as string}/images${path}`,
        serverRoute: {
          path: '/images'
        },
        storagePath: 'public/images'
      }
    },

    ui: {
      isDisabled: false,
      basePath: '/cms'
    }
  })
)
