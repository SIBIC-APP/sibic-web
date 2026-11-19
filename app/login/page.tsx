import { LoginForm } from "@/components/auth/login-form";
import { TopBar } from "@/components/shell/top-bar";

export const metadata = { title: "Iniciar sesión" };

export default function LoginPage() {
  return (
    <>
      <TopBar title="Iniciar sesión" backHref="/" />
      <main className="px-5 pt-4 md:px-8 xl:px-12">
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl font-extrabold tracking-tight text-navy">Entra a tu cuenta</h1>
          <p className="mt-2 text-sm text-slate-500">
            Puedes seguir explorando candidaturas sin iniciar sesión.
          </p>
          <LoginForm />
        </div>
      </main>
    </>
  );
}
