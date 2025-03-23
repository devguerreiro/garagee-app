"use client";

import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { setCookie } from "cookies-next/client";

import { jwtDecode } from "jwt-decode";

import { Loader2 } from "lucide-react";

import { toast } from "sonner";

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

import { signIn } from "@/app/actions";
import { TokenDTO } from "@/app/dtos";

const formSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(8).max(30),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Form() {
  const searchParams = useSearchParams();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleLogin(values: FormSchema) {
    const response = await signIn(values.username, values.password);
    if (response.data) {
      const token = response.data.access_token;
      const decodedToken = jwtDecode<TokenDTO>(token);
      setCookie("token", token, {
        secure: true,
        sameSite: "strict",
        path: "/",
        expires: new Date(decodedToken.exp * 1000),
      });
      redirect(searchParams.get("redirect") ?? "/");
    } else {
      toast.error("Usuário e/ou senha inválido(s)");
    }
  }

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
        <Button
          type="submit"
          className="w-full !mt-10"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
          Acessar plataforma
        </Button>
        <Link
          href="/cadastro"
          className="w-full bg-card border border-primary text-primary h-9 flex justify-center items-center rounded-md text-sm font-medium px-2 py-4 hover:bg-primary/10"
        >
          Criar conta
        </Link>
      </form>
    </BaseForm>
  );
}
