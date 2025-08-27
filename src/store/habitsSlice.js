import { createSlice } from '@reduxjs/toolkit'

const predefinedHabits = [
  { id: 1, name: 'Drink water', icon: '💧', target: 8, unit: 'glasses' },
  { id: 2, name: 'Take a walk', icon: '🚶‍♂️', target: 1, unit: 'session' },
  { id: 3, name: 'Stretch', icon: '🤸‍♀️', target: 3, unit: 'times' },
  { id: 4, name: 'Deep breathing', icon: '🧘‍♀️', target: 5, unit: 'minutes' },
  { id: 5, name: 'Read', icon: '📚', target: 30, unit: 'minutes' }
]

const initialState = {
  habits: predefinedHabits.map(habit => ({
    ...habit,
    completed: 0,
    streak: 0,
    lastCompleted: null,
    history: []
  })),
  selectedDate: new Date().toISOString().split('T')[0]
}

export const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    incrementHabit: (state, action) => {
      const { habitId } = action.payload
      const habit = state.habits.find(h => h.id === habitId)
      if (habit && habit.completed < habit.target) {
        habit.completed += 1
        const today = new Date().toISOString().split('T')[0]
        
        // Update history
        const todayEntry = habit.history.find(h => h.date === today)
        if (todayEntry) {
          todayEntry.count = habit.completed
        } else {
          habit.history.push({
            date: today,
            count: habit.completed
          })
        }
        
        // Update streak if habit is completed
        if (habit.completed === habit.target) {
          const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
            .toISOString().split('T')[0]
          const wasCompletedYesterday = habit.history.some(
            h => h.date === yesterday && h.count >= habit.target
          )
          
          if (wasCompletedYesterday || habit.streak === 0) {
            habit.streak += 1
          } else {
            habit.streak = 1
          }
          habit.lastCompleted = Date.now()
        }
        
        // Keep only last 30 days of history
        if (habit.history.length > 30) {
          habit.history = habit.history.slice(-30)
        }
      }
    },
    decrementHabit: (state, action) => {
      const { habitId } = action.payload
      const habit = state.habits.find(h => h.id === habitId)
      if (habit && habit.completed > 0) {
        habit.completed -= 1
        const today = new Date().toISOString().split('T')[0]
        
        // Update history
        const todayEntry = habit.history.find(h => h.date === today)
        if (todayEntry) {
          todayEntry.count = habit.completed
          if (todayEntry.count === 0) {
            habit.history = habit.history.filter(h => h.date !== today)
          }
        }
      }
    },
    resetDailyHabits: (state) => {
      state.habits.forEach(habit => {
        habit.completed = 0
      })
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    }
  }
})

export const { 
  incrementHabit, 
  decrementHabit, 
  resetDailyHabits, 
  setSelectedDate 
} = habitsSlice.actions

export default habitsSlice.reducer