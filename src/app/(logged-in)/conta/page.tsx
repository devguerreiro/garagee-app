import { BuildingIcon, HomeIcon, LogOutIcon, UserIcon } from "lucide-react";

import { signOut } from "@/app/actions";
import { UserProfileDTO } from "@/app/dtos";

import { Button } from "@/components/ui/button";

import fetchWrapper from "@/lib/fetch";

export default async function Page() {
  const response = await fetchWrapper<UserProfileDTO>("user/profile");

  if (!response.data) return;

  const user = response.data;

  return (
    <div className="container py-8 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-foreground">Sua conta</h1>
      </div>
      <hr />
      <div className="bg-card rounded-lg shadow p-8 space-y-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <UserIcon className="text-secondary w-[1em] h-[1em]" />
            <span className="text-sm">Nome</span>
          </div>
          <span className="font-medium">{user.name}</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <BuildingIcon className="text-secondary w-[1em] h-[1em]" />
            <span className="text-sm">Condomínio/Prédio</span>
          </div>
          <span className="font-medium">
            {user.apartment.tower.building.name}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <HomeIcon className="text-secondary w-[1em] h-[1em]" />
            <span className="text-sm">Apartamento/Unidade</span>
          </div>
          <span className="font-medium">
            {user.apartment.identifier} | {user.apartment.tower.identifier}
          </span>
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
