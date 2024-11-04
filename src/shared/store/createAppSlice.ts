import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"

// allows us to create a slice with async thunks.
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})
