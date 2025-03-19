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

import { Input, InputPassword } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useRegisterState from "@/states/register";

const formSchema = z
  .object({
    username: z.string().min(3).max(30),
    password: z.string().min(8).max(30),
    passwordConfirmation: z.string(),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    message: "Senhas não conferem",
    path: ["passwordConfirmation"],
  });

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  onNextStep: () => void;
};

export default function AccountForm(props: Readonly<Props>) {
  const { accountData, setAccountData } = useRegisterState();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: accountData ?? {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  function handleSubmit(values: FormSchema) {
    setAccountData(values);
    props.onNextStep();
  }

  return (
    <BaseForm {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Usuário</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite seu usuário" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Senha</FormLabel>
              <FormControl>
                <InputPassword {...field} placeholder="Digite sua senha" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Confirme sua senha</FormLabel>
              <FormControl>
                <InputPassword {...field} placeholder="Digite sua senha" />
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
