"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import useRegisterState from "@/states/register";

export default function FinalStep() {
  const { isCompleted } = useRegisterState();

  if (isCompleted) {
    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-lg text-primary font-semibold">
          Cadastro concluído com sucesso!
        </h2>
        <p className="text-sm">Acesse a plataforma clicando no botão abaixo</p>
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
      <h2 className="text-lg text-destructive font-semibold">
        Não foi possível concluir o seu cadastro
      </h2>
      <p className="text-sm">
        Ocorreu um erro inesperado. Por favor, tente novamente mais tarde
      </p>
    </div>
  );
}
