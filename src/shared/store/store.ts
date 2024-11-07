import { companyApiSlice } from "@/src/entities/company/store/companyApiSlice"
import { sessionMiddleware } from "@/src/entities/session"
import { sessionApiSlice } from "@entities/session/store/sessionApiSlice"
import { userApiSlice } from "@entities/user/store/userApiSlice"
import { healthApiSlice } from "@features/api-health-check"
import { testSliceReducer } from "@features/test-store"
import {
  Action,
  combineSlices,
  configureStore,
  createListenerMiddleware,
  isAnyOf,
  ThunkAction,
} from "@reduxjs/toolkit"
import { overlaysReducer } from "@shared/overlays"

const userMutationListener = createListenerMiddleware()

// Trigger a refetch of the session data after user mutations
userMutationListener.startListening({
  matcher: isAnyOf(
    userApiSlice.endpoints.updateUserInfo.matchFulfilled,
    userApiSlice.endpoints.updateUserPassword.matchFulfilled,
    userApiSlice.endpoints.updateUserAvatar.matchFulfilled,
  ),
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(
      sessionApiSlice.endpoints.getSession.initiate(undefined, { forceRefetch: true }),
    )
  },
})

const rootReducer = combineSlices({
  test: testSliceReducer,
  overlays: overlaysReducer,
  [sessionApiSlice.reducerPath]: sessionApiSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [companyApiSlice.reducerPath]: companyApiSlice.reducer,
  [healthApiSlice.reducerPath]: healthApiSlice.reducer,
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(userMutationListener.middleware)
        .concat(sessionMiddleware)
        .concat(sessionApiSlice.middleware)
        .concat(userApiSlice.middleware)
        .concat(companyApiSlice.middleware)
        .concat(healthApiSlice.middleware),
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
