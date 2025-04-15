"use client";

import React, { useState } from "react";

import { DynamicIcon, IconName } from "lucide-react/dynamic";

import { cn } from "@/lib/utils";

import Slide from "@/components/animations/Slide";

export type Step = {
  title: string;
  icon: IconName;
  Component: React.ComponentType<{
    onNextStep: () => void;
  }>;
};

type Props = Readonly<{
  className: string;
  steps: Array<Step>;
  renderStep?: (step: React.ReactElement) => React.ReactElement;
  FinalStep?: React.ComponentType;
}>;

const StepProgressBar = React.forwardRef<HTMLDivElement, Props>(
  ({ className, steps, renderStep, FinalStep }, ref) => {
    const [currentStep, setCurrentStep] = useState(0);

    const [animationDirection, setAnimationDirection] = useState<
      "right" | "left"
    >("left");

    const visibleSteps = steps;

    function getGrayBarWidth() {
      const visibleStepsQuantity = visibleSteps.length;

      if (currentStep > visibleStepsQuantity) return 0 + "%";

      // calcula a largura total ocupada pelas etapas restantes E
      // soma com a metade do espaço ocupado por cada etapa
      // para ficar limitado ao circulo da etapa atual
      return (
        ((visibleStepsQuantity - (currentStep + 1)) / visibleStepsQuantity +
          1 / (visibleStepsQuantity * 2)) *
          100 +
        "%"
      );
    }

    function getIconStyle(index: number) {
      if (currentStep === index) {
        return "bg-primary border-card text-white transition-all delay-150";
      } else if (currentStep > index) {
        return "bg-primary border-card text-white";
      } else {
        return "bg-background border-muted text-muted";
      }
    }

    function getTitleStyle(index: number) {
      if (currentStep === index || currentStep > index) {
        return "text-primary font-bold transition-colors delay-150";
      } else {
        return "text-muted font-normal";
      }
    }

    function getCurrentComponent() {
      const Step = steps[currentStep];
      if (Step) {
        return (
          <Slide motionKey={Step.title} direction={animationDirection}>
            <Step.Component
              onNextStep={() => {
                if (currentStep + 1 < steps.length || FinalStep !== undefined) {
                  setCurrentStep((prev) => prev + 1);
                  setAnimationDirection("left");
                } else {
                  setCurrentStep(0);
                }
              }}
            />
          </Slide>
        );
      } else if (FinalStep) {
        return (
          <Slide motionKey="finalStep" direction={animationDirection}>
            <FinalStep />
          </Slide>
        );
      }
      return <></>;
    }

    return (
      <div className={cn("w-full flex flex-col gap-8", className)}>
        <div ref={ref} className="w-full flex items-center relative">
          <div className="w-full h-2 bg-gradient-to-r from-primary to-secondary" />
          <div
            className="h-full absolute top-0 right-0 bg-muted transition-[width] duration-300"
            style={{
              width: getGrayBarWidth(),
            }}
          />
          <ol className="w-full h-full flex justify-between gap-2 absolute top-0 left-0">
            {visibleSteps.map((step, index) => (
              <li
                key={step.title}
                className="flex-1 flex items-center justify-center relative"
              >
                <button
                  title={step.title}
                  type="button"
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${getIconStyle(
                    index
                  )}`}
                  onClick={() => {
                    if (
                      index < currentStep ||
                      currentStep < visibleSteps.length
                    ) {
                      setCurrentStep(index);
                      setAnimationDirection("right");
                    }
                  }}
                  disabled={
                    index > currentStep || currentStep + 1 > visibleSteps.length
                  }
                >
                  <DynamicIcon name={step.icon} size={20} />
                </button>
                <span
                  className={`w-full text-center overflow-hidden absolute -top-10 ${getTitleStyle(
                    index
                  )}`}
                >
                  {step.title}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="overflow-hidden">
          {renderStep
            ? renderStep(getCurrentComponent())
            : getCurrentComponent()}
        </div>
      </div>
    );
  }
);
StepProgressBar.displayName = "Step Progress Bar";

export default StepProgressBar;
