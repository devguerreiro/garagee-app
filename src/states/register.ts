import { create } from "zustand";

type State = {
  locationData: {
    name: string;
    building: string;
    apartment: string;
  } | null;
  buildingOptions: Array<{ label: string; value: string }>;
  isCompleted: boolean;
};

type Action = {
  setLocationData: (data: State["locationData"]) => void;
  setBuildingOptions: (data: State["buildingOptions"]) => void;
  setIsCompleted: (data: State["isCompleted"]) => void;
  reset: () => void;
};

const initialState: State = {
  locationData: null,
  buildingOptions: [],
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
  setIsCompleted: (isCompleted: State["isCompleted"]) => {
    set({ isCompleted });
  },
  reset: () => {
    set(initialState);
  },
}));
