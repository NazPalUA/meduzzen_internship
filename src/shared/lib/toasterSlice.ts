import { AlertColor } from "@mui/material"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ToastVariant = AlertColor

type ToasterState = {
  isOpen: boolean
  message: string
  variant: ToastVariant
}

const initialState: ToasterState = {
  isOpen: false,
  message: "",
  variant: "info",
}

const toasterSlice = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<{ message: string; variant: ToastVariant }>) {
      state.isOpen = true
      state.message = action.payload.message
      state.variant = action.payload.variant
    },
    closeToast(state) {
      state.isOpen = false
      state.message = ""
      state.variant = "info"
    },
  },
})

export const { showToast, closeToast } = toasterSlice.actions

export const selectToast = (state: { toaster: ToasterState }) => state.toaster

export const toasterReducer = toasterSlice.reducer
