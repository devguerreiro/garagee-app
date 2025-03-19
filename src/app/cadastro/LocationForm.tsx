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

import { getBuildingsByName } from "@/app/actions";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  building: z.string().uuid("Selecione um condomínio/prédio"),
  apartment: z.string().min(3).max(15),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  onNextStep: () => void;
};

export default function LocationForm(props: Readonly<Props>) {
  const { locationData, setLocationData, buildingOptions, setBuildingOptions } =
    useRegisterState();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: locationData ?? {
      name: "",
      building: "",
      apartment: "",
    },
  });

  function handleSubmit(values: FormSchema) {
    setLocationData(values);
    props.onNextStep();
  }

  async function onSearchBuilding(query: string) {
    let options: Array<{ label: string; value: string }> = [];
    form.resetField("building");
    if (query.length >= 3) {
      const response = await getBuildingsByName(query);
      if (!response.errors && response.data) {
        options = response.data.map((building) => ({
          label: building.name,
          value: building.public_id,
        }));
      }
    } else {
      form.setError("building", {
        message: "Digite ao menos 3 caracteres para buscar",
      });
    }
    setBuildingOptions(options);
    return options;
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
                  options={buildingOptions}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apartment"
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
