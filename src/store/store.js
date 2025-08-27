import { configureStore } from '@reduxjs/toolkit'
import moodReducer from './moodSlice'
import tasksReducer from './tasksSlice'
import habitsReducer from './habitsSlice'
import rewardsReducer from './rewardsSlice'
import timerReducer from './timerSlice'

export const store = configureStore({
  reducer: {
    mood: moodReducer,
    tasks: tasksReducer,
    habits: habitsReducer,
    rewards: rewardsReducer,
    timer: timerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})