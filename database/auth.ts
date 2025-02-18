import { randomBytes } from 'node:crypto'
import { createAuth } from '@keystone-6/auth'
import { statelessSessions } from '@keystone-6/core/session'

// withAuth is a function we can use to wrap our base configuration
const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name createdAt',
  secretField: 'password',

  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
})

const sessionMaxAge = 60 * 60

// you can find out more at https://keystonejs.com/docs/apis/session#session-api
const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: process.env.SESSION_SECRET,
  // domain: process.env.SESSION_DOMAIN || undefined,
  secure: true,
})

export { withAuth, session }
