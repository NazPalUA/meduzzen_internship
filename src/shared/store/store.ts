import { sessionApiSlice } from "@/src/entities/session/store/sessionApiSlice"
import { userApiSlice } from "@/src/entities/user/store/userApiSlice"
import { testSliceReducer } from "@features/test-store"
import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"

const rootReducer = combineSlices({
  test: testSliceReducer,
  [sessionApiSlice.reducerPath]: sessionApiSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(sessionApiSlice.middleware)
        .concat(userApiSlice.middleware)
    },
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
