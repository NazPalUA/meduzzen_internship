import { sessionMiddleware } from "@entities/session"
import { testSliceReducer } from "@features/test-store"
import { Action, combineSlices, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { overlaysReducer } from "@shared/overlays"
import { baseApi } from "../api"

const rootReducer = combineSlices({
  test: testSliceReducer,
  overlays: overlaysReducer,
  [baseApi.reducerPath]: baseApi.reducer,
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sessionMiddleware).concat(baseApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
