"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import useRegisterState from "@/states/register";

export default function FinalStep() {
  const { isCompleted } = useRegisterState();

  if (isCompleted) {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-lg text-primary font-semibold">
          Cadastro concluído com sucesso!
        </span>
        <span className="text-sm">
          Acesse a plataforma clicando no botão abaixo
        </span>
        <Button asChild>
          <Link className="w-full mt-4 " href="/login">
            Acessar plataforma
          </Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg text-destructive font-semibold">
        Não foi possível concluir o seu cadastro
      </span>
      <span className="text-sm">
        Ocorreu um erro inesperado. Por favor, tente novamente mais tarde
      </span>
    </div>
  );
}
