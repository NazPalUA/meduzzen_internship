import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SnackbarState {
  open: boolean
  message: string
  error: boolean
}

type ModalType = "password" | "info" | "avatar" | "delete" | null

interface SettingsState {
  modalOpen: ModalType
  snackbar: SnackbarState
}

const initialState: SettingsState = {
  modalOpen: null,
  snackbar: {
    open: false,
    message: "",
    error: false,
  },
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalType>) {
      state.modalOpen = action.payload
    },
    closeModal(state) {
      state.modalOpen = null
    },
    showSnackbar(state, action: PayloadAction<{ message: string; error: boolean }>) {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        error: action.payload.error,
      }
    },
    closeSnackbar(state) {
      state.snackbar.open = false
    },
  },
  selectors: {
    selectModalOpen: (settings) => settings.modalOpen,
    selectSnackbar: (settings) => settings.snackbar,
  },
})

export const { openModal, closeModal, showSnackbar, closeSnackbar } = settingsSlice.actions

export const { selectModalOpen, selectSnackbar } = settingsSlice.selectors

export const settingsReducer = settingsSlice.reducer
