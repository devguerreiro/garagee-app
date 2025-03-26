import * as React from "react";

import BaseInputMask from "@mona-health/react-input-mask";
import { Props as BaseInputMaskProps } from "react-input-mask";

import {
  CalendarIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  SearchIcon,
} from "lucide-react";

import debounce from "debounce";

import { cn } from "@/lib/utils";

import { brazilianDate } from "@/utils";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { FormControl, useFormField } from "./form";
import { Button } from "./button";
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
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
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

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input {...props} ref={ref} type={showPassword ? "text" : "password"} />
        <button
          type="button"
          className="absolute top-0 bottom-0 right-3 my-auto"
          onClick={() => setShowPassword((show) => !show)}
        >
          {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
        </button>
      </div>
    );
  }
);
InputPassword.displayName = "InputPassword";

type InputSearchableOption = { label: string; value: string };

type InputSearchableProps = Omit<InputProps, "onChange"> & {
  onSearch: (query: string) => Promise<Array<InputSearchableOption>>;
  onChange: (value: string) => void;
  options: Array<InputSearchableOption>;
};

const InputSearchable = React.forwardRef<
  HTMLInputElement,
  InputSearchableProps
>(({ onSearch, options, onChange, value, ...props }, ref) => {
  const valueLabel = options.find((option) => option.value === value)?.label;

  const [internalValue, setInternalValue] = React.useState(valueLabel ?? "");

  const [showOptions, setShowOptions] = React.useState(false);

  const debouncedOnSearch = React.useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 500),
    [onSearch]
  );

  return (
    <Popover open={showOptions} onOpenChange={setShowOptions}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            {...props}
            ref={ref}
            className="pl-8"
            value={internalValue}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              debouncedOnSearch(target.value);
              setInternalValue(target.value);
            }}
          />
          <SearchIcon className="absolute top-0 bottom-0 my-auto left-3 w-[14px] h-[14px] text-muted-foreground" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="p-1 text-sm max-h-40 overflow-y-auto"
      >
        {options.length === 0 ? (
          <div className="px-2 py-4 text-center">
            <span>Nenhum resultado encontrado</span>
          </div>
        ) : (
          options.map((option) => (
            <button
              key={option.value}
              className={cn(
                "w-full flex justify-between items-center p-2 rounded",
                value === option.value && "bg-primary text-white"
              )}
              onClick={() => {
                if (onChange) onChange(option.value);
                setInternalValue(option.label);
                setShowOptions(false);
              }}
            >
              <span>{option.label}</span>
              {value === option.value && (
                <CheckIcon className="w-[1em] h-[1em]" />
              )}
            </button>
          ))
        )}
      </PopoverContent>
    </Popover>
  );
});
InputSearchable.displayName = "InputSearchable";

type DateInputProps = {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
} & CalendarProps;

const DateInput = ({ value, onChange, ...props }: DateInputProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
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
      <PopoverContent className="w-auto p-0 max-h-none" align="start">
        <Calendar
          {...props}
          mode="single"
          selected={value}
          onSelect={(e) => {
            if (onChange) onChange(e);
            setIsOpen(false);
          }}
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

export {
  Input,
  InputMask,
  InputPassword,
  InputSearchable,
  DateInput,
  HourInput,
};
