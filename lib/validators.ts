import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Usa al menos 8 caracteres.")
  .max(72, "Usa como máximo 72 caracteres.")
  .regex(/[A-Za-zÁÉÍÓÚáéíóúÑñÜü]/, "Incluye al menos una letra.")
  .regex(/[0-9]/, "Incluye al menos un número.");

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Escribe un correo válido."));

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre.").max(80, "El nombre es demasiado largo."),
  email: emailSchema,
  password: passwordSchema,
});

export const registerFormSchema = registerSchema
  .extend({
    confirmPassword: z.string().min(1, "Confirma tu contraseña."),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden.",
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Escribe tu contraseña.").max(72),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type RegisterFormInput = z.infer<typeof registerFormSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
