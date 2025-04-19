import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const registerSchema = loginSchema
    .extend({
        password: z
            .string()
            .min(8, { message: "Must be at least 8 characters long." })
            .max(128, { message: "Must be at most 128 characters long." })
            .refine((password) => /[A-Z]/.test(password), {
                message: "Must contain at least one uppercase letter.",
            })
            .refine((password) => /[a-z]/.test(password), {
                message: "Must contain at least one lowercase letter.",
            })
            .refine((password) => /[0-9]/.test(password), {
                message: "Must contain at least one number.",
            })
            .refine((password) => /[#?!@$%^&*-]/.test(password), {
                message: "Must contain at least one special character.",
            }),
        confirmPassword: z
            .string({ required_error: "Please confirm your password." })
            .min(1, { message: "Confirm your password." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });
