import { testSliceReducer } from "@features/test-store"
import { combineSlices, configureStore } from "@reduxjs/toolkit"

const rootReducer = combineSlices({
  test: testSliceReducer,
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]
