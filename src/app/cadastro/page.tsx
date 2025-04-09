"use client";

import dynamic from "next/dynamic";

import StepProgressBar from "@/components/StepProgressBar";

const LocationForm = dynamic(() => import("./LocationForm"));
const AccountForm = dynamic(() => import("./AccountForm"));
const FinalStep = dynamic(() => import("./FinalStep"));

export default function Page() {
  return (
    <div className="pt-20 flex justify-center items-center">
      <StepProgressBar
        FinalStep={FinalStep}
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
            <p className="text-sm text-muted-foreground">
              Preencha as informacoes abaixo para ter acesso a plataforma
            </p>
            <hr />
            {step}
          </div>
        )}
      />
    </div>
  );
}
