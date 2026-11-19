"use client";

import { buttonVariants } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient, authErrorMessage } from "@/lib/auth-client";
import { registerFormSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "cn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

type RegisterValues = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: RegisterValues) {
    setFormError(null);
    const result = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (result.error) {
      setFormError(authErrorMessage(result.error, "No se pudo crear la cuenta."));
      return;
    }

    toast.success("Cuenta creada");
    router.push("/");
    router.refresh();
  }

  return (
    <form className="mt-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Field data-invalid={Boolean(form.formState.errors.name)}>
          <FieldLabel htmlFor="name">Nombre</FieldLabel>
          <Input id="name" autoComplete="name" className="h-11 rounded-xl px-3" {...form.register("name")} />
          <FieldError errors={[form.formState.errors.name]} />
        </Field>
        <Field data-invalid={Boolean(form.formState.errors.email)}>
          <FieldLabel htmlFor="email">Correo</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className="h-11 rounded-xl px-3"
            {...form.register("email")}
          />
          <FieldError errors={[form.formState.errors.email]} />
        </Field>
        <Field data-invalid={Boolean(form.formState.errors.password)}>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            className="h-11 rounded-xl px-3"
            {...form.register("password")}
          />
          <FieldDescription>Mínimo 8 caracteres, con una letra y un número.</FieldDescription>
          <FieldError errors={[form.formState.errors.password]} />
        </Field>
        <Field data-invalid={Boolean(form.formState.errors.confirmPassword)}>
          <FieldLabel htmlFor="confirmPassword">Confirmar contraseña</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            className="h-11 rounded-xl px-3"
            {...form.register("confirmPassword")}
          />
          <FieldError errors={[form.formState.errors.confirmPassword]} />
        </Field>
      </FieldGroup>
      {formError ? <p className="mt-3 text-sm text-destructive">{formError}</p> : null}
      <button
        type="submit"
        disabled={form.formState.isSubmitting}
        className={cn(buttonVariants(), "mt-5 h-11 w-full rounded-xl")}
      >
        {form.formState.isSubmitting ? "Creando cuenta…" : "Crear cuenta"}
      </button>
      <p className="mt-4 text-center text-sm text-slate-500">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-semibold text-brand">
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
}
