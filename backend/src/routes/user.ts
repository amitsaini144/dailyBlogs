import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from "@amitsaini144/common-medium"
import { hashSync, compareSync } from "bcrypt-ts";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  
  if (!success) {
    c.status(403);
    return c.json({ "message": "Inputs are not correct!!" })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const hash = hashSync(body.password, 10);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hash
      }
    })
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ token})
  } catch (error) {
    return c.status(403)
  }
})

userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ "message": "Inputs are not correct!!" })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })

    if (!user) {
      c.status(404);
      return c.json({ "msg": "User not found" })
    }

    const isMatch = compareSync(body.password, user.password)
    if (!isMatch) {
      c.status(403);
      return c.json({ "msg": "Invalid password" })
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ token })

  } catch (error) {
    return c.json({ error });
  }
})