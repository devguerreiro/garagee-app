import { create } from "zustand";

type State = {
  locationData: {
    name: string;
    building: string;
    apartament: string;
  } | null;
  accountData: {
    username: string;
    password: string;
    passwordConfirmation: string;
  } | null;
};

type Action = {
  setLocationData: (data: State["locationData"]) => void;
  setAccountData: (data: State["accountData"]) => void;
  reset: () => void;
};

const initialState: State = {
  locationData: null,
  accountData: null,
};

export default create<State & Action>((set) => ({
  ...initialState,
  setLocationData: (locationData: State["locationData"]) => {
    set({ locationData });
  },
  setAccountData: (accountData: State["accountData"]) => {
    set({ accountData });
  },
  reset: () => {
    set(initialState);
  },
}));
