import { createSlice } from '@reduxjs/toolkit'

const moodBasedTasks = {
  happy: [
    { id: 1, title: 'Write in your journal', type: 'creative', points: 15 },
    { id: 2, title: 'Brainstorm new ideas', type: 'creative', points: 20 },
    { id: 3, title: 'Start a creative project', type: 'creative', points: 25 },
    { id: 4, title: 'Connect with friends', type: 'social', points: 15 },
    { id: 5, title: 'Learn something new', type: 'educational', points: 20 }
  ],
  tired: [
    { id: 6, title: 'Organize your workspace', type: 'low-energy', points: 10 },
    { id: 7, title: 'Review your notes', type: 'low-energy', points: 10 },
    { id: 8, title: 'Use Pomodoro timer for focus', type: 'productivity', points: 15 },
    { id: 9, title: 'Take a power nap', type: 'self-care', points: 10 },
    { id: 10, title: 'Do light stretching', type: 'self-care', points: 10 }
  ],
  anxious: [
    { id: 11, title: 'Practice breathing exercises', type: 'mindfulness', points: 15 },
    { id: 12, title: 'Listen to calming music', type: 'relaxation', points: 10 },
    { id: 13, title: 'Take a short walk', type: 'physical', points: 15 },
    { id: 14, title: 'Write down your worries', type: 'mental-health', points: 15 },
    { id: 15, title: 'Practice meditation', type: 'mindfulness', points: 20 }
  ],
  focused: [
    { id: 16, title: 'Tackle your hardest task', type: 'productivity', points: 30 },
    { id: 17, title: 'Plan your week', type: 'planning', points: 20 },
    { id: 18, title: 'Learn a new skill', type: 'educational', points: 25 },
    { id: 19, title: 'Work on important project', type: 'productivity', points: 25 },
    { id: 20, title: 'Set new goals', type: 'planning', points: 20 }
  ]
}

const initialState = {
  suggestedTasks: [],
  completedTasks: [],
  currentMoodTasks: []
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateSuggestedTasks: (state, action) => {
      const mood = action.payload
      state.currentMoodTasks = moodBasedTasks[mood] || []
      state.suggestedTasks = [...state.currentMoodTasks]
    },
    completeTask: (state, action) => {
      const taskId = action.payload
      const task = state.suggestedTasks.find(t => t.id === taskId)
      if (task) {
        state.completedTasks.push({
          ...task,
          completedAt: Date.now()
        })
        state.suggestedTasks = state.suggestedTasks.filter(t => t.id !== taskId)
      }
    },
    resetTasks: (state) => {
      state.suggestedTasks = [...state.currentMoodTasks]
    }
  }
})

export const { updateSuggestedTasks, completeTask, resetTasks } = tasksSlice.actions

export default tasksSlice.reducer