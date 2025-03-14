"use client";

import Link from "next/link";

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

const formSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(8).max(30),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Form() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function handleLogin() {}

  return (
    <BaseForm {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
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
        <Button type="submit" className="w-full !mt-10">
          Acessar plataforma
        </Button>
        <Link
          href="/cadastro"
          className="w-full bg-card border border-primary text-primary h-9 flex justify-center items-center rounded-md text-sm font-medium px-2 py-4 hover:bg-primary hover:text-white"
        >
          Criar conta
        </Link>
      </form>
    </BaseForm>
  );
}
