"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "@/lib/zod";

import {
  Form as BaseForm,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputSearchable } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useRegisterState from "@/states/register";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  building: z.string().min(1, "Selecione um condomínio/prédio"),
  apartament: z.string().min(3).max(15),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  onNextStep: () => void;
};

export default function LocationForm(props: Readonly<Props>) {
  const { locationData, setLocationData } = useRegisterState();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: locationData ?? {
      name: "",
      building: "",
      apartament: "",
    },
  });

  function handleSubmit(values: FormSchema) {
    setLocationData(values);
    props.onNextStep();
  }

  async function onSearchBuilding(query: string) {
    console.log(query);
    return [
      { label: "Edifício Lago da Constança", value: "123" },
      { label: "Residencial Ilha do Arvoredo", value: "321" },
    ];
  }

  return (
    <BaseForm {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Nome Completo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite o seu nome completo" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="building"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">Condomínio/Prédio</FormLabel>
              <FormControl>
                <InputSearchable
                  {...field}
                  placeholder="Busque seu condomínio/prédio"
                  onSearch={onSearchBuilding}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apartament"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Apartamento</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex.: BL5 APTO 302" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full !mt-10">
          Continuar
        </Button>
      </form>
    </BaseForm>
  );
}
