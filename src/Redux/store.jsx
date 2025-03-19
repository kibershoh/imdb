import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./languageSlice"; // Til reducerini import qilish

export const store = configureStore({
  reducer: {
    language: languageReducer, // Reducerni store-ga qo‘shamiz
  },
});

export default store;
