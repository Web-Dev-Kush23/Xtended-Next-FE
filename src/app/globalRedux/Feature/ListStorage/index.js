"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
value:{}
};

export const listStorage = createSlice({
  name: "listStorage",
  initialState,
  reducers: {
   
    setListStorage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {  setListStorage } = listStorage.actions

export default listStorage.reducer;