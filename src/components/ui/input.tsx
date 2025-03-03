import * as React from "react";

import BaseInputMask from "@mona-health/react-input-mask";
import { Props as BaseInputMaskProps } from "react-input-mask";

import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input">;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

interface InputMaskProps extends InputProps {
  maskProps: BaseInputMaskProps;
}

const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
  ({ maskProps, ...props }, ref) => {
    return (
      <BaseInputMask {...maskProps} {...props} ref={ref}>
        <Input />
      </BaseInputMask>
    );
  }
);

InputMask.displayName = "InputMask";

export { Input, InputMask };
