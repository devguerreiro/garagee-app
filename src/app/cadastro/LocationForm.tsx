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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  building: z.string().min(8).max(50),
  apartament: z.string().min(3).max(15),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  onNextStep: () => void;
};

export default function LocationForm(props: Readonly<Props>) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      building: "",
      apartament: "",
    },
  });

  function handleLogin() {
    props.onNextStep();
  }

  return (
    <BaseForm {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
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
            <FormItem>
              <FormLabel className="required">Condomínio/Prédio</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o seu condomínio/prédio" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Edifício Lago da Constança">
                    Edifício Lago da Constança
                  </SelectItem>
                  <SelectItem value="Residencial Ilha do Arvoredo">
                    Residencial Ilha do Arvoredo
                  </SelectItem>
                </SelectContent>
              </Select>
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
