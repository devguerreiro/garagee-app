"use client";

import dynamic from "next/dynamic";

import StepProgressBar from "@/components/StepProgressBar";

const LocationForm = dynamic(() => import("./LocationForm"));
const AccountForm = dynamic(() => import("./AccountForm"));

export default function Page() {
  return (
    <div className="pt-20 flex justify-center items-center">
      <StepProgressBar
        steps={[
          {
            title: "Localização",
            icon: "map-pin",
            Component: LocationForm,
          },
          {
            title: "Conta",
            icon: "circle-user-round",
            Component: AccountForm,
          },
        ]}
        renderStep={(step) => (
          <div className="container p-8 bg-card shadow rounded space-y-4">
            <div className="space-y-1">
              <h1 className="text-2xl text-secondary text-center font-bold uppercase">
                Garag_<strong className="text-primary">ee</strong>
              </h1>
              <p className="text-sm text-muted-foreground">
                Preencha as informacoes abaixo para ter acesso a plataforma
              </p>
            </div>
            <hr />
            {step}
          </div>
        )}
      />
    </div>
  );
}
