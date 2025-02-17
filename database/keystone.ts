import 'dotenv/config'

import { config } from '@keystone-6/core'
import { lists } from './schema'
import { withAuth, session } from './auth'
import {onHeaders} from 'on-headers'

export default withAuth(
  config({
    db: {
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
      cors: { origin: ['http://web:3000', 'http://localhost:5137'], credentials: true },
      extendExpressApp: (app) => {
        // app.use((req, res, next) => {
        //   onHeaders(res, () => {
        //     // Should be an array; let's join it together
        //     if (res.getHeader('set-cookie') == undefined) return;
        //     const headerValue = Array.isArray(res.getHeader('set-cookie')) ? res.getHeader('set-cookie').join(' ') : ''
        //     console.log('Set-Cookie response header being set as...\nSet-Cookie: ', headerValue)
        //   });
        //   next();
        // });

        app.set('trust proxy', true);
      },
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
    },

    graphql: {
      path: '/cms/api/grphql',
      playground: false,
    }
  })
)
