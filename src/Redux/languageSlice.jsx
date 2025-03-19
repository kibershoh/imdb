import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "English", // Default til
  availableLanguages: [
    "English", "Español", "Français", "Deutsch", "Русский",
    "Italiano", "Português", "Türkçe", "中文", "日本語",
  ],
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
