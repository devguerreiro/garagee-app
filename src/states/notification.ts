import { create } from "zustand";

type State = {
  pendingBookingsQuantity: number | null;
};

type Action = {
  setPendingBookingsQuantity: (quantity: number) => void;
  incrementPendingBookingsQuantity: () => void;
};

const initialState: State = {
  pendingBookingsQuantity: null,
};

export default create<State & Action>((set, get) => ({
  ...initialState,
  setPendingBookingsQuantity: (quantity: number) => {
    set({ pendingBookingsQuantity: quantity });
  },
  incrementPendingBookingsQuantity: () => {
    const quantity = get().pendingBookingsQuantity;
    set({ pendingBookingsQuantity: quantity !== null ? quantity + 1 : 1 });
  },
}));
