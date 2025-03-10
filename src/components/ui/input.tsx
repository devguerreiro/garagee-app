import * as React from "react";

import BaseInputMask from "@mona-health/react-input-mask";
import { Props as BaseInputMaskProps } from "react-input-mask";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl, useFormField } from "./form";
import { Button } from "./button";
import { CalendarIcon } from "lucide-react";
import { brazilianDate } from "@/utils";
import { Calendar, CalendarProps } from "./calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type InputProps = React.ComponentProps<"input">;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { invalid } = useFormField();

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
          invalid && "border-destructive focus-visible:ring-destructive",
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

type DateInputProps = {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
} & CalendarProps;

const DateInput = ({ value, onChange, ...props }: DateInputProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-full font-normal justify-between gap-4 bg-card",
              !value && "text-muted-foreground"
            )}
          >
            {value ? (
              brazilianDate(value)
            ) : (
              <span className="overflow-hidden text-ellipsis">
                Selecione uma data
              </span>
            )}
            <CalendarIcon className="h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          {...props}
          mode="single"
          selected={value}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  );
};

type HourInputProps = {
  value: number | undefined;
  disabled: boolean;
  onChange: (value: string) => void;
  showHour?: (hour: number) => boolean;
};

const HourInput = ({ value, onChange, disabled, showHour }: HourInputProps) => {
  const hours: Array<number> = Array(24)
    .fill(0)
    .map((_, index) => index);

  const availableHours =
    showHour !== undefined ? hours.filter(showHour) : hours;

  return (
    <Select onValueChange={onChange} defaultValue={value?.toString()}>
      <FormControl>
        <SelectTrigger disabled={disabled}>
          <SelectValue placeholder="Selecione um horário" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {availableHours.map((hour) => (
          <SelectItem
            key={hour}
            value={hour.toString()}
          >{`${hour}:00`}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { Input, InputMask, DateInput, HourInput };
