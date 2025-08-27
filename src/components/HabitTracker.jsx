import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { incrementHabit, decrementHabit } from '../store/habitsSlice'
import { addPoints, checkAndAwardBadge } from '../store/rewardsSlice'

const HabitTracker = () => {
  const dispatch = useDispatch()
  const { habits } = useSelector((state) => state.habits)

  const handleIncrement = (habitId) => {
    const habit = habits.find(h => h.id === habitId)
    if (habit && habit.completed < habit.target) {
      dispatch(incrementHabit({ habitId }))
      dispatch(addPoints(5)) // 5 points per habit increment
      
      // Check for habit-specific badges
      const newCount = habit.completed + 1
      if (habit.name === 'Drink water' && newCount >= habit.target) {
        dispatch(checkAndAwardBadge({ type: 'habit_water', count: newCount }))
      } else if (habit.name === 'Take a walk') {
        dispatch(checkAndAwardBadge({ type: 'habit_walk', count: newCount }))
      } else if (habit.name === 'Stretch' && newCount >= habit.target) {
        dispatch(checkAndAwardBadge({ type: 'habit_stretch', count: newCount }))
      }
    }
  }

  const handleDecrement = (habitId) => {
    dispatch(decrementHabit({ habitId }))
  }

  const getProgressPercentage = (completed, target) => {
    return Math.min((completed / target) * 100, 100)
  }

  const getStreakText = (streak) => {
    if (streak === 0) return 'Start your streak!'
    if (streak === 1) return '1 day streak'
    return `${streak} days streak`
  }

  const getCompletionEmoji = (completed, target) => {
    const percentage = (completed / target) * 100
    if (percentage >= 100) return '🎉'
    if (percentage >= 75) return '🔥'
    if (percentage >= 50) return '💪'
    if (percentage >= 25) return '✨'
    return '⭐'
  }

  return (
    <motion.div 
      className="mood-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-2xl font-bold text-white mb-6 text-shadow">
        Daily Habits
      </h3>

      <div className="space-y-4">
        <AnimatePresence>
          {habits.map((habit, index) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 rounded-lg p-4 border border-white/20"
            >
              {/* Habit Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{habit.icon}</div>
                  <div>
                    <h4 className="font-semibold text-white">{habit.name}</h4>
                    <p className="text-xs text-white/70">
                      {habit.completed}/{habit.target} {habit.unit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">
                    {getCompletionEmoji(habit.completed, habit.target)}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">
                      {getStreakText(habit.streak)}
                    </div>
                    {habit.streak > 0 && (
                      <div className="text-xs text-white/70">🔥</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="habit-progress">
                  <motion.div
                    className="habit-progress-bar"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${getProgressPercentage(habit.completed, habit.target)}%` 
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-white/70 mt-1">
                  <span>0</span>
                  <span>{Math.round(getProgressPercentage(habit.completed, habit.target))}%</span>
                  <span>{habit.target}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => handleDecrement(habit.id)}
                    disabled={habit.completed === 0}
                    className="w-8 h-8 rounded-full bg-white/20 text-white border border-white/30 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                    whileHover={{ scale: habit.completed > 0 ? 1.1 : 1 }}
                    whileTap={{ scale: habit.completed > 0 ? 0.9 : 1 }}
                  >
                    -
                  </motion.button>
                  
                  <span className="text-white font-semibold w-8 text-center">
                    {habit.completed}
                  </span>
                  
                  <motion.button
                    onClick={() => handleIncrement(habit.id)}
                    disabled={habit.completed >= habit.target}
                    className="w-8 h-8 rounded-full bg-white/20 text-white border border-white/30 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                    whileHover={{ scale: habit.completed < habit.target ? 1.1 : 1 }}
                    whileTap={{ scale: habit.completed < habit.target ? 0.9 : 1 }}
                  >
                    +
                  </motion.button>
                </div>

                {/* Completion Status */}
                {habit.completed >= habit.target && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-green-500/20 text-green-200 px-3 py-1 rounded-full text-xs font-semibold border border-green-500/30"
                  >
                    Completed! 🎉
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Daily Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 pt-4 border-t border-white/20"
      >
        <div className="flex justify-between items-center text-white">
          <div>
            <h4 className="font-semibold">Today's Progress</h4>
            <p className="text-sm text-white/70">
              {habits.filter(h => h.completed >= h.target).length} of {habits.length} habits completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl">
              {habits.filter(h => h.completed >= h.target).length === habits.length ? '🏆' : '📈'}
            </div>
            <div className="text-sm text-white/70">
              {Math.round((habits.filter(h => h.completed >= h.target).length / habits.length) * 100)}%
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HabitTracker