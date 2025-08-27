import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentMood: null,
  moodHistory: [],
  moodText: ''
}

export const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    setMood: (state, action) => {
      const newMood = {
        ...action.payload,
        timestamp: Date.now(),
        id: Date.now().toString()
      }
      state.currentMood = newMood
      state.moodHistory.push(newMood)
      
      // Keep only last 30 mood entries
      if (state.moodHistory.length > 30) {
        state.moodHistory = state.moodHistory.slice(-30)
      }
    },
    setMoodText: (state, action) => {
      state.moodText = action.payload
    },
    clearCurrentMood: (state) => {
      state.currentMood = null
      state.moodText = ''
    }
  }
})

export const { setMood, setMoodText, clearCurrentMood } = moodSlice.actions

export default moodSlice.reducer