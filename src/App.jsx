import React from 'react'
import { useSelector } from 'react-redux'
import MoodSelector from './components/MoodSelector'
import Dashboard from './components/Dashboard'
import { motion } from 'framer-motion'

function App() {
  const { currentMood } = useSelector((state) => state.mood)
  
  // Dynamic theme classes based on mood
  const getThemeClasses = () => {
    switch (currentMood?.type) {
      case 'happy':
        return 'bg-gradient-to-br from-orange-400 to-pink-400'
      case 'tired':
        return 'bg-gradient-to-br from-blue-400 to-indigo-600'
      case 'anxious':
        return 'bg-gradient-to-br from-green-400 to-teal-500'
      case 'focused':
        return 'bg-gradient-to-br from-purple-400 to-blue-500'
      default:
        return 'bg-gradient-to-br from-gray-400 to-gray-600'
    }
  }

  return (
    <motion.div 
      className={`min-h-screen transition-all duration-1000 ${getThemeClasses()}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <motion.h1 
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-6 sm:mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Mood-Based Productivity Dashboard
        </motion.h1>
        
        <MoodSelector />
        <Dashboard />
      </div>
    </motion.div>
  )
}

export default App