import { configureStore } from '@reduxjs/toolkit'
import { healthcheckApi } from '../services'
import { userApi } from '../services'
import { spaceApi } from '../services/space'
import { locationApi } from '../services/location'
import { authReducer } from './auth-slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [healthcheckApi.reducerPath]: healthcheckApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [spaceApi.reducerPath]: spaceApi.reducer,
      [locationApi.reducerPath]: locationApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        healthcheckApi.middleware,
        userApi.middleware,
        spaceApi.middleware,
        locationApi.middleware
      ),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

