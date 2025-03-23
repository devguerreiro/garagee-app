import { create } from "zustand";

type Option = { label: string; value: string };
type Options = Array<Option>;

type State = {
  locationData: {
    building: string;
    tower: string;
    apartment: string;
  } | null;
  buildingOptions: Options;
  towerOptions: Options;
  apartmentOptions: Options;
  isCompleted: boolean;
};

type Action = {
  setLocationData: (data: State["locationData"]) => void;
  setBuildingOptions: (data: State["buildingOptions"]) => void;
  setTowerOptions: (data: State["buildingOptions"]) => void;
  setApartmentOptions: (data: State["buildingOptions"]) => void;
  setIsCompleted: (data: State["isCompleted"]) => void;
  reset: () => void;
};

const initialState: State = {
  locationData: null,
  buildingOptions: [],
  towerOptions: [],
  apartmentOptions: [],
  isCompleted: false,
};

export default create<State & Action>((set) => ({
  ...initialState,
  setLocationData: (locationData: State["locationData"]) => {
    set({ locationData });
  },
  setBuildingOptions: (buildingOptions: State["buildingOptions"]) => {
    set({ buildingOptions });
  },
  setTowerOptions: (towerOptions: State["towerOptions"]) => {
    set({ towerOptions });
  },
  setApartmentOptions: (apartmentOptions: State["apartmentOptions"]) => {
    set({ apartmentOptions });
  },
  setIsCompleted: (isCompleted: State["isCompleted"]) => {
    set({ isCompleted });
  },
  reset: () => {
    set(initialState);
  },
}));
