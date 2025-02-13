import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import type { Context } from 'hono/jsx'
import type { Bindings } from 'hono/types'

const app = new Hono()
const prisma = new PrismaClient()

const port = 8787
console.log(`Server is running on http://localhost:${port}`)


app.get('/', async (c) => {
  const body = await c.req.parseBody(); 
  console.log("body: ", body);
  return c.text('Hello Hono & Node.js desu!!!')
})

app.post('/api/auth/register', async (c) => {
  // as: 型アサーション。コンパイラに対して特定の値が特定の型であることを明示的に伝える。
  const body = await c.req.parseBody() as { username: string, email: string, password: string }
  const { username, email, password } = body

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password
    }
  });
  
  return c.json({ user });
});


serve({
  fetch: app.fetch,
  port
})
