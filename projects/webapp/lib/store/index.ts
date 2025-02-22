import { configureStore } from '@reduxjs/toolkit'
import { healthcheckApi } from '../services'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [healthcheckApi.reducerPath]: healthcheckApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(healthcheckApi.middleware)
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

