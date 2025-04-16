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
import { InputSearchable } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useRegisterState from "@/states/register";

import { ApartmentListDTO, BuildingListDTO, TowerListDTO } from "@/app/dtos";

import useFetch from "@/hooks/use-fetch";

const formSchema = z.object({
  building: z.string().uuid("Selecione um condomínio/prédio"),
  tower: z.string().uuid("Selecione um bloco/torre"),
  apartment: z.string().uuid("Selecione um apartamento/unidade"),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  onNextStep: () => void;
};

export default function LocationForm(props: Readonly<Props>) {
  const {
    locationData,
    setLocationData,
    buildingOptions,
    towerOptions,
    apartmentOptions,
    setBuildingOptions,
    setTowerOptions,
    setApartmentOptions,
  } = useRegisterState();

  const { fetchData } = useFetch();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: locationData ?? {
      building: "",
      tower: "",
      apartment: "",
    },
  });

  function handleSubmit(values: FormSchema) {
    setLocationData(values);
    props.onNextStep();
  }

  async function onSearchBuilding(name: string) {
    let options: Array<{ label: string; value: string }> = [];
    form.resetField("building");
    if (name.length >= 3) {
      const data = await fetchData<Array<BuildingListDTO>>(
        "api/building?" + new URLSearchParams({ name })
      );
      if (data) {
        options = data.map((building) => ({
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

  async function onBuildingChange(building: string) {
    const data = await fetchData<Array<TowerListDTO>>(
      "api/tower?" + new URLSearchParams({ building })
    );
    if (data) {
      setTowerOptions(
        data.map((tower) => ({
          label: tower.identifier,
          value: tower.public_id,
        }))
      );
    } else {
      setTowerOptions([]);
    }
  }

  async function onTowerChange(tower: string) {
    const data = await fetchData<Array<ApartmentListDTO>>(
      "api/apartment?" + new URLSearchParams({ tower })
    );
    if (data) {
      setApartmentOptions(
        data.map((apartment) => ({
          label: apartment.identifier,
          value: apartment.public_id,
        }))
      );
    } else {
      setApartmentOptions([]);
    }
  }

  return (
    <BaseForm {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                  onChange={(building) => {
                    field.onChange(building);
                    onBuildingChange(building);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tower"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">Bloco/Torre</FormLabel>
              <Select
                onValueChange={(e) => {
                  field.onChange(e);
                  onTowerChange(e);
                }}
                defaultValue={field.value}
                disabled={towerOptions.length === 0}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu bloco/torre" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {towerOptions.map((tower) => (
                    <SelectItem key={tower.value} value={tower.value}>
                      {tower.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apartment"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">Apartamento/Unidade</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={apartmentOptions.length === 0}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu apartamento/unidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {apartmentOptions.map((apartment) => (
                    <SelectItem key={apartment.value} value={apartment.value}>
                      {apartment.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
