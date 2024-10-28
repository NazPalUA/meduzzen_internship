import { testSliceReducer } from "@features/test-store"
import { combineSlices, configureStore } from "@reduxjs/toolkit"

// ARCHITECTURAL NOTE: This file contains imports from higher-level folders,
// which is an intentional exception to FSD (Feature-Sliced Design) layer rules.
// This exception is necessary for Redux store configuration, as all reducers
// must be centrally registered here in the shared layer.

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
