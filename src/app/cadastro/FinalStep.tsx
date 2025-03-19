import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function FinalStep() {
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
