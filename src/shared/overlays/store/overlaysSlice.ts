import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ToastVariant = "success" | "error" | "info" | "warning"

type ToastState = {
  isOpen: boolean
  message: string
  variant: ToastVariant
}

export type ModalType = "test" | "password" | "info" | "avatar" | "delete" | null

type OverlaysState = {
  activeModal: ModalType
  toast: ToastState
}

const initialState: OverlaysState = {
  activeModal: null,
  toast: {
    isOpen: false,
    message: "",
    variant: "info",
  },
}

const overlaysSlice = createSlice({
  name: "overlays",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalType>) {
      state.activeModal = action.payload
    },
    closeModal(state) {
      state.activeModal = null
    },
    showToast(state, action: PayloadAction<{ message: string; variant: ToastVariant }>) {
      state.toast = {
        isOpen: true,
        message: action.payload.message,
        variant: action.payload.variant,
      }
    },
    closeToast(state) {
      state.toast = initialState.toast
    },
  },
})

export const { openModal, closeModal, showToast, closeToast } = overlaysSlice.actions

export const selectActiveModal = (state: { overlays: OverlaysState }) => state.overlays.activeModal
export const selectToast = (state: { overlays: OverlaysState }) => state.overlays.toast

export const overlaysReducer = overlaysSlice.reducer
