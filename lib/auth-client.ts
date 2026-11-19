"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export function authErrorMessage(
  error: { message?: string; code?: string } | null | undefined,
  fallback: string,
) {
  if (!error) return fallback;
  if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
    return "Ya existe una cuenta con este correo.";
  }
  if (error.message && /[áéíóúñÁÉÍÓÚÑ]/.test(error.message)) return error.message;
  return fallback;
}
