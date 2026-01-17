"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";

export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-vasta-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-vasta-accent/5 blur-[120px]" />
      </div>

      <div className="w-full max-w-[440px] space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <img
              src="/logo.svg"
              alt="Vasta Logo"
              className="h-10 w-auto dark:hidden"
            />
            <img
              src="/logo_branca.svg"
              alt="Vasta Logo"
              className="h-10 w-auto hidden dark:block"
            />
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl md:p-10">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-red-500 to-orange-500" />

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 shadow-inner">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-black text-white">
              Erro de Autenticação
            </h1>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              Não foi possível validar seu acesso. Isso pode acontecer se o link
              expirou ou se houve uma falha na comunicação.
            </p>
          </div>

          <Link
            href="/login"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200"
          >
            Tentar login novamente
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-white transition-colors uppercase font-bold tracking-widest"
            >
              Voltar para o início
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-vasta-muted">
          Precisa de ajuda?{" "}
          <Link
            href="/ajuda"
            className="font-bold text-white hover:underline transition-colors"
          >
            Central de Suporte
          </Link>
        </p>
      </div>
    </div>
  );
}
