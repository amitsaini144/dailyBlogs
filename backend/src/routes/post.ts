import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { updatePostInput, createPostInput } from "@amitsaini144/common-medium"

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        "userId": string
    }
}>();

postRouter.use('/*', async (c, next) => {
    const token = c.req.header("Authorization") || "";
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
        c.set("userId", user.id);
        await next();
    }
    else {
        c.status(404)
        return c.json({ "message": "user not found" })
    }
})

postRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
    if (!success) {
        c.status(403);
        return c.json({ "message": "Inputs are not correct!!" })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const authorId = c.get("userId");
    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId,
                Date: body.Date,
            }
        })
        return c.json({ id: post.id })
    } catch (error) {
        c.status(404);
        return c.json({ "msg": "error while creating post" })
    }
})

postRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
        c.status(403);
        return c.json({ "message": "Inputs are not correct!!" })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const post = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({ post })
    } catch (error) {
        c.status(404);
        return c.json({ "msg": "error while updating post" })
    }
})

postRouter.get('/bulk/myblogs', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const authorId = c.get("userId");
    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: authorId
            },
            select: {
                Date: true,
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({ posts })
    } catch (error) {
        c.status(404);
        return c.json({ "msg": "error while fetching posts" })
    }
})

postRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const posts = await prisma.post.findMany({
            take: 10,
            skip: 0,
            select: {
                Date: true,
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({ posts })
    } catch (error) {
        c.status(404);
        return c.json({ "msg": "error while fetching posts" })
    }
})

postRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const id = c.req.param("id");

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                Date: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({ post })
    } catch (error) {
        c.status(404);
        return c.json({ "msg": "error while fetching a post" })
    }
})

