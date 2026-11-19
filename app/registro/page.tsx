import { RegisterForm } from "@/components/auth/register-form";
import { TopBar } from "@/components/shell/top-bar";

export const metadata = { title: "Crear cuenta" };

export default function RegisterPage() {
  return (
    <>
      <TopBar title="Crear cuenta" backHref="/" />
      <main className="px-5 pt-4 md:px-8 xl:px-12">
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl font-extrabold tracking-tight text-navy">Crea tu cuenta</h1>
          <p className="mt-2 text-sm text-slate-500">
            La contraseña se guarda con un hash. No se puede recuperar en texto plano.
          </p>
          <RegisterForm />
        </div>
      </main>
    </>
  );
}
