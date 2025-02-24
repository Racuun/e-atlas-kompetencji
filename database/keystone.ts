import 'dotenv/config'

import { config } from '@keystone-6/core'
import { lists } from './schema'
import { withAuth, session } from './auth'

export default withAuth(
  config({
    db: {
      provider: process.env.DATABASE_PROVIDER as any,
      url: process.env.DATABASE_URL as string,
      shadowDatabaseUrl: process.env.DATABASE_SHADOW_URL as string,
      onConnect: async context => { /* ... */ },
      enableLogging: true,
      idField: { kind: 'cuid' },
    },
    lists,
    session,
    server: {
      port: parseInt(process.env.PORT as string),
      cors: { origin: ['http://web:3000', 'http://localhost:5137'], credentials: true },
      extendExpressApp: (app) => {
        app.set('trust proxy', true);
      },
    },

    storage: {
      local_images: {
        kind: 'local',
        type: 'image',
        generateUrl: path => `http://localhost:${process.env.PORT as string}/images${path}`,
        serverRoute: {
          path: '/cms/images'
        },
        storagePath: 'public/images'
      }
    },

    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
      isDisabled: false,
      basePath: '/cms'
    },

    graphql: {
      path: '/cms/api/grphql',
      playground: false,
    }
  })
)
