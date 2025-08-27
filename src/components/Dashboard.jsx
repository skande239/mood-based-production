import React from 'react'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import TaskSuggestions from './TaskSuggestions'
import HabitTracker from './HabitTracker'
import PomodoroTimer from './PomodoroTimer'
import RewardSystem from './RewardSystem'

const Dashboard = () => {
  const { currentMood } = useSelector((state) => state.mood)

  if (!currentMood) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-white/80 py-16"
      >
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-2xl font-semibold mb-2">Ready to be productive?</h3>
        <p className="text-lg">Select your mood above to get personalized suggestions!</p>
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6 sm:space-y-8"
      >
        {/* Current Mood Summary */}
        <motion.div
          className="mood-card text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2 text-shadow">
            Your {currentMood.label} Journey
          </h2>
          <p className="text-white/90 text-lg">{currentMood.description}</p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <TaskSuggestions />
            </motion.div>
            
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <HabitTracker />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <PomodoroTimer />
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <RewardSystem />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Dashboard