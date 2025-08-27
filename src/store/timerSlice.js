import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  timeLeft: 25 * 60, // 25 minutes in seconds
  isActive: false,
  isBreak: false,
  currentSession: 0,
  totalSessions: 0,
  sessionType: 'work', // 'work', 'shortBreak', 'longBreak'
  settings: {
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsUntilLongBreak: 4
  }
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isActive = true
    },
    pauseTimer: (state) => {
      state.isActive = false
    },
    resetTimer: (state) => {
      state.isActive = false
      state.timeLeft = state.settings.workDuration * 60
      state.sessionType = 'work'
    },
    tick: (state) => {
      if (state.isActive && state.timeLeft > 0) {
        state.timeLeft -= 1
      }
    },
    completeSession: (state) => {
      state.isActive = false
      state.currentSession += 1
      state.totalSessions += 1
      
      // Determine next session type
      if (state.sessionType === 'work') {
        if (state.currentSession % state.settings.sessionsUntilLongBreak === 0) {
          state.sessionType = 'longBreak'
          state.timeLeft = state.settings.longBreakDuration * 60
        } else {
          state.sessionType = 'shortBreak'
          state.timeLeft = state.settings.shortBreakDuration * 60
        }
        state.isBreak = true
      } else {
        state.sessionType = 'work'
        state.timeLeft = state.settings.workDuration * 60
        state.isBreak = false
      }
    },
    skipSession: (state) => {
      state.isActive = false
      
      if (state.sessionType === 'work') {
        state.sessionType = 'shortBreak'
        state.timeLeft = state.settings.shortBreakDuration * 60
        state.isBreak = true
      } else {
        state.sessionType = 'work'
        state.timeLeft = state.settings.workDuration * 60
        state.isBreak = false
      }
    },
    updateSettings: (state, action) => {
      const { workDuration, shortBreakDuration, longBreakDuration, sessionsUntilLongBreak } = action.payload
      
      state.settings = {
        workDuration: workDuration || state.settings.workDuration,
        shortBreakDuration: shortBreakDuration || state.settings.shortBreakDuration,
        longBreakDuration: longBreakDuration || state.settings.longBreakDuration,
        sessionsUntilLongBreak: sessionsUntilLongBreak || state.settings.sessionsUntilLongBreak
      }
      
      // Reset timer with new settings if not active
      if (!state.isActive) {
        state.timeLeft = state.settings.workDuration * 60
        state.sessionType = 'work'
        state.isBreak = false
      }
    }
  }
})

export const { 
  startTimer, 
  pauseTimer, 
  resetTimer, 
  tick, 
  completeSession, 
  skipSession, 
  updateSettings 
} = timerSlice.actions

export default timerSlice.reducer