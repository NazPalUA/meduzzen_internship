import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type TestState = {
	testValueA: string
	testValueB: string
}

const initialState: TestState = {
	testValueA: "Initial value A",
	testValueB: "Initial value B",
}

const testSlice = createSlice({
	name: "test",
	initialState,
	reducers: {
		updateTestValueA(state, action: PayloadAction<string>) {
			state.testValueA = action.payload
		},
		updateTestValueB(state, action: PayloadAction<string>) {
			state.testValueB = action.payload
		},
		resetValueA(state) {
			state.testValueA = initialState.testValueA
		},
		resetValueB(state) {
			state.testValueB = initialState.testValueB
		},

		resetAll() {
			return initialState
		},
	},
	selectors: {
		selectTestValueA: test => test.testValueA,
		selectTestValueB: test => test.testValueB,
	},
})

export const {
	updateTestValueA,
	updateTestValueB,
	resetValueA,
	resetValueB,
	resetAll,
} = testSlice.actions

export const { selectTestValueA, selectTestValueB } = testSlice.selectors

export const testSliceReducer = testSlice.reducer
