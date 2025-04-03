import { BuildingIcon, HomeIcon, LogOutIcon, UserIcon } from "lucide-react";

import { getUserProfile, signOut } from "@/app/actions";

import { Button } from "@/components/ui/button";

export default async function Page() {
  const response = await getUserProfile();
  if (!response.data) return;

  const user = response.data;

  return (
    <div className="px-4 py-8 space-y-4 ">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Perfil</h1>
      </div>
      <hr />
      <div>
        <div className="bg-card rounded-lg shadow p-8 space-y-5 text-muted-foreground">
          <div className="flex flex-col gap-1">
            <UserIcon className="text-primary w-[1em] h-[1em]" />
            <span className="text-sm">Nome</span>
            <span className="font-medium">{user.name}</span>
          </div>
          <div className="flex flex-col gap-1">
            <BuildingIcon className="text-primary w-[1em] h-[1em]" />
            <span className="text-sm">Condomínio/Prédio</span>
            <span className="font-medium">
              {user.apartment.tower.building.name}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <HomeIcon className="text-primary w-[1em] h-[1em]" />
            <span className="text-sm">Apartamento/Unidade</span>
            <span className="font-medium">{user.apartment.identifier}</span>
          </div>
        </div>
      </div>
      <Button
        type="button"
        variant="destructive"
        className="!mt-12 w-full"
        onClick={signOut}
      >
        <LogOutIcon />
        Sair
      </Button>
    </div>
  );
}
