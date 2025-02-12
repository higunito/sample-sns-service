import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import type { Context } from 'hono/jsx'
import type { Bindings } from 'hono/types'

const app = new Hono()

app.get('/', (c) => {
  console.log("body: ", c.body);
  return c.text('Hello Hono & Node.js desu!!!')
})

app.post('/api/auth/register', (c) => {
  return c.json({ message: 'Register success' })
})

const port = 8787
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
