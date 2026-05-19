"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import counterReducer from "./Feature/Counter/counterSlice";
import listStorageReducer from "./Feature/ListStorage"


const rootReducer = combineReducers({
  counter: counterReducer,
  listStorage: listStorageReducer,
  //add all your reducers here
},);

export const store = configureStore({
  reducer: rootReducer,

 });