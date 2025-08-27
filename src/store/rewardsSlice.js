import { createSlice } from '@reduxjs/toolkit'

const badges = [
  { id: 1, name: 'First Step', description: 'Complete your first task', icon: '🌟', requirement: 'complete_task', threshold: 1 },
  { id: 2, name: 'Task Master', description: 'Complete 10 tasks', icon: '🏆', requirement: 'complete_task', threshold: 10 },
  { id: 3, name: 'Productive Bee', description: 'Complete 25 tasks', icon: '🐝', requirement: 'complete_task', threshold: 25 },
  { id: 4, name: 'Hydration Hero', description: 'Drink 8 glasses of water', icon: '💧', requirement: 'habit_water', threshold: 8 },
  { id: 5, name: 'Walking Wonder', description: 'Take 7 walks this week', icon: '🚶‍♂️', requirement: 'habit_walk', threshold: 7 },
  { id: 6, name: 'Stretch Star', description: 'Stretch 3 times today', icon: '⭐', requirement: 'habit_stretch', threshold: 3 },
  { id: 7, name: 'Mood Tracker', description: 'Track your mood for 7 days', icon: '📈', requirement: 'mood_track', threshold: 7 },
  { id: 8, name: 'Focus Master', description: 'Complete 5 Pomodoro sessions', icon: '🎯', requirement: 'pomodoro', threshold: 5 },
  { id: 9, name: 'Week Warrior', description: 'Stay active for 7 consecutive days', icon: '⚔️', requirement: 'daily_streak', threshold: 7 },
  { id: 10, name: 'Zen Master', description: 'Complete 20 meditation sessions', icon: '🧘‍♀️', requirement: 'meditation', threshold: 20 }
]

const initialState = {
  totalPoints: 0,
  level: 1,
  badges: badges.map(badge => ({ ...badge, earned: false, earnedAt: null })),
  achievements: [],
  streaks: {
    dailyTasks: 0,
    habits: 0,
    mood: 0
  }
}

export const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    addPoints: (state, action) => {
      const points = action.payload
      state.totalPoints += points
      
      // Level up calculation (every 100 points = 1 level)
      const newLevel = Math.floor(state.totalPoints / 100) + 1
      if (newLevel > state.level) {
        state.level = newLevel
        state.achievements.push({
          type: 'level_up',
          message: `Level up! You're now level ${newLevel}`,
          timestamp: Date.now(),
          id: Date.now().toString()
        })
      }
    },
    checkAndAwardBadge: (state, action) => {
      const { type, count } = action.payload
      
      state.badges.forEach(badge => {
        if (!badge.earned && badge.requirement === type && count >= badge.threshold) {
          badge.earned = true
          badge.earnedAt = Date.now()
          
          state.achievements.push({
            type: 'badge_earned',
            message: `Badge earned: ${badge.name}!`,
            badge: badge,
            timestamp: Date.now(),
            id: Date.now().toString()
          })
          
          // Bonus points for earning badge
          state.totalPoints += 50
        }
      })
    },
    updateStreak: (state, action) => {
      const { type, value } = action.payload
      if (state.streaks.hasOwnProperty(type)) {
        state.streaks[type] = value
      }
    },
    clearAchievement: (state, action) => {
      const achievementId = action.payload
      state.achievements = state.achievements.filter(a => a.id !== achievementId)
    },
    resetRewards: (state) => {
      state.totalPoints = 0
      state.level = 1
      state.badges.forEach(badge => {
        badge.earned = false
        badge.earnedAt = null
      })
      state.achievements = []
      state.streaks = {
        dailyTasks: 0,
        habits: 0,
        mood: 0
      }
    }
  }
})

export const { 
  addPoints, 
  checkAndAwardBadge, 
  updateStreak, 
  clearAchievement, 
  resetRewards 
} = rewardsSlice.actions

export default rewardsSlice.reducer