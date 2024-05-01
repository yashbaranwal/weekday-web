import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDispatchOrders: [],
};

const DispatchOrderSlice = createSlice({
  name: "dispatchSlice",
  initialState,
  reducers: {
    setSelectedDispatchOrders: (state, action) => {
      if (action.payload === null) {
        state.selectedDispatchOrders = [];
      } else {
        state.selectedDispatchOrders.push(action.payload);
      }
    },
    updateRating: (state, action) => {
      const index = state.selectedDispatchOrders.findIndex(
        (order) =>
          order.artisan_order_assign_id ===
          action.payload.artisan_order_assign_id
      );
      if (index !== -1) {
        const updatedRating = {
          ...state.selectedDispatchOrders[index],
          rating: action.payload.rating,
        };
        state.selectedDispatchOrders[index] = updatedRating;
      }
    },
    updateAcceptQty: (state, action) => {
      const index = state.selectedDispatchOrders.findIndex(
        (order) =>
          order.artisan_order_assign_id ===
          action.payload.artisan_order_assign_id
      );
      if (index !== -1) {
        const updatedAcceptQty = {
          ...state.selectedDispatchOrders[index],
          accepted_quantitiy: action.payload.accepted_quantitiy,
        };
        state.selectedDispatchOrders[index] = updatedAcceptQty;
      }
    },
    updateRemarks: (state, action) => {
      const index = state.selectedDispatchOrders.findIndex(
        (order) =>
          order.artisan_order_assign_id ===
          action.payload.artisan_order_assign_id
      );
      if (index !== -1) {
        const updatedRating = {
          ...state.selectedDispatchOrders[index],
          remark: action.payload.remark,
        };
        state.selectedDispatchOrders[index] = updatedRating;
      }
    },
  },
});

export const {
  setSelectedDispatchOrders,
  updateRating,
  updateAcceptQty,
  updateRemarks,
} = DispatchOrderSlice.actions;

export default DispatchOrderSlice.reducer;
