import z from "zod";

export const signupInput = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(5)
})

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(5)
})

export const createPostInput = z.object({
    title: z.string().min(2),
    content: z.string().optional(),
    Date: z.string()
})

export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    id: z.string()
})

export type SignupType = z.infer<typeof signupInput>
export type SigninType = z.infer<typeof signinInput>
export type CreatePostType = z.infer<typeof createPostInput>
export type UpdatePostType = z.infer<typeof updatePostInput>
