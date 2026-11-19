"use client";

import { buttonVariants } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient, authErrorMessage } from "@/lib/auth-client";
import { loginSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "cn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    setFormError(null);
    const result = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (result.error) {
      setFormError(authErrorMessage(result.error, "Correo o contraseña incorrectos."));
      return;
    }

    toast.success("Sesión iniciada");
    router.push("/");
    router.refresh();
  }

  return (
    <form className="mt-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Field data-invalid={Boolean(form.formState.errors.email)}>
          <FieldLabel htmlFor="email">Correo</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className="h-11 rounded-xl px-3"
            aria-invalid={Boolean(form.formState.errors.email)}
            {...form.register("email")}
          />
          <FieldError errors={[form.formState.errors.email]} />
        </Field>
        <Field data-invalid={Boolean(form.formState.errors.password)}>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            className="h-11 rounded-xl px-3"
            aria-invalid={Boolean(form.formState.errors.password)}
            {...form.register("password")}
          />
          <FieldError errors={[form.formState.errors.password]} />
        </Field>
      </FieldGroup>
      {formError ? <p className="mt-3 text-sm text-destructive">{formError}</p> : null}
      <button
        type="submit"
        disabled={form.formState.isSubmitting}
        className={cn(buttonVariants(), "mt-5 h-11 w-full rounded-xl")}
      >
        {form.formState.isSubmitting ? "Entrando…" : "Entrar"}
      </button>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }), "mt-2 h-11 w-full rounded-xl")}
        onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/" })}
      >
        Continuar con Google
      </button>
      <p className="mt-4 text-center text-sm text-slate-500">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="font-semibold text-brand">
          Crear cuenta
        </Link>
      </p>
    </form>
  );
}
