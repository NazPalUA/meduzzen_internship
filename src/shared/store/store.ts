import { sessionApiSlice, sessionMiddleware } from "@entities/session"
import { userApiSlice } from "@entities/user"
import { healthApiSlice } from "@features/api-health-check"
import { testSliceReducer } from "@features/test-store"
import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { overlaysReducer } from "@shared/overlays"

const rootReducer = combineSlices({
  test: testSliceReducer,
  overlays: overlaysReducer,
  [sessionApiSlice.reducerPath]: sessionApiSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [healthApiSlice.reducerPath]: healthApiSlice.reducer,
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(sessionMiddleware)
        .concat(sessionApiSlice.middleware)
        .concat(userApiSlice.middleware)
        .concat(healthApiSlice.middleware)
    },
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
