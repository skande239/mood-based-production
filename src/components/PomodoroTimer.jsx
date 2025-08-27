import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  startTimer, 
  pauseTimer, 
  resetTimer, 
  tick, 
  completeSession, 
  skipSession 
} from '../store/timerSlice'
import { addPoints, checkAndAwardBadge } from '../store/rewardsSlice'

const PomodoroTimer = () => {
  const dispatch = useDispatch()
  const { 
    timeLeft, 
    isActive, 
    sessionType, 
    currentSession, 
    totalSessions,
    settings 
  } = useSelector((state) => state.timer)
  const { currentMood } = useSelector((state) => state.mood)
  
  const [showSettings, setShowSettings] = useState(false)

  // Timer effect
  useEffect(() => {
    let interval = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        dispatch(tick())
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      // Session completed
      dispatch(completeSession())
      dispatch(addPoints(sessionType === 'work' ? 25 : 10))
      
      if (sessionType === 'work') {
        dispatch(checkAndAwardBadge({ 
          type: 'pomodoro', 
          count: totalSessions + 1 
        }))
      }
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft, dispatch, sessionType, totalSessions])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    const totalTime = sessionType === 'work' 
      ? settings.workDuration * 60
      : sessionType === 'shortBreak'
      ? settings.shortBreakDuration * 60
      : settings.longBreakDuration * 60
    
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  const getSessionIcon = () => {
    switch (sessionType) {
      case 'work': return '🍅'
      case 'shortBreak': return '☕'
      case 'longBreak': return '🌴'
      default: return '⏱️'
    }
  }

  const getSessionLabel = () => {
    switch (sessionType) {
      case 'work': return 'Focus Time'
      case 'shortBreak': return 'Short Break'
      case 'longBreak': return 'Long Break'
      default: return 'Timer'
    }
  }

  const getMoodBasedStyle = () => {
    switch (currentMood?.type) {
      case 'happy':
        return 'from-orange-400 to-pink-400'
      case 'tired':
        return 'from-blue-400 to-indigo-600'
      case 'anxious':
        return 'from-green-400 to-teal-500'
      case 'focused':
        return 'from-purple-400 to-blue-500'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  const handleStart = () => {
    dispatch(startTimer())
  }

  const handlePause = () => {
    dispatch(pauseTimer())
  }

  const handleReset = () => {
    dispatch(resetTimer())
  }

  const handleSkip = () => {
    dispatch(skipSession())
  }

  return (
    <motion.div 
      className="mood-card text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-2xl font-bold text-white mb-6 text-shadow">
        Pomodoro Timer
      </h3>

      {/* Session Info */}
      <div className="mb-6">
        <motion.div
          className="text-4xl mb-2"
          animate={{ 
            scale: isActive ? [1, 1.1, 1] : 1,
            rotate: isActive ? [0, 5, -5, 0] : 0
          }}
          transition={{ 
            duration: 2, 
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {getSessionIcon()}
        </motion.div>
        <h4 className="text-xl font-semibold text-white">{getSessionLabel()}</h4>
        <p className="text-white/70 text-sm">
          Session {currentSession + 1} • {totalSessions} completed today
        </p>
      </div>

      {/* Timer Circle */}
      <div className="relative mb-6 flex justify-center">
        <div className="timer-circle">
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
              animate={{ 
                strokeDashoffset: 2 * Math.PI * 45 - (getProgressPercentage() / 100) * 2 * Math.PI * 45
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="drop-shadow-lg"
            />
          </svg>
          
          {/* Timer Display */}
          <motion.div
            className="relative z-10 text-2xl font-bold text-white"
            animate={{ 
              scale: timeLeft <= 60 && isActive ? [1, 1.1, 1] : 1 
            }}
            transition={{ 
              duration: 1, 
              repeat: timeLeft <= 60 && isActive ? Infinity : 0 
            }}
          >
            {formatTime(timeLeft)}
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4 mb-6">
        <motion.button
          onClick={isActive ? handlePause : handleStart}
          className="btn-primary px-6 py-3 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isActive ? '⏸️ Pause' : '▶️ Start'}
        </motion.button>
        
        <motion.button
          onClick={handleReset}
          className="btn-secondary px-4 py-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔄 Reset
        </motion.button>
        
        <motion.button
          onClick={handleSkip}
          className="btn-secondary px-4 py-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ⏭️ Skip
        </motion.button>
      </div>

      {/* Session Progress */}
      <div className="mb-4">
        <div className="flex justify-center space-x-2">
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index < (currentSession % 4) 
                  ? 'bg-white' 
                  : 'bg-white/30'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </div>
        <p className="text-white/70 text-xs mt-2">
          Progress to long break
        </p>
      </div>

      {/* Quick Settings */}
      <motion.button
        onClick={() => setShowSettings(!showSettings)}
        className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
        whileHover={{ scale: 1.05 }}
      >
        ⚙️ Settings
      </motion.button>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-white/20"
          >
            <div className="text-left space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Work Duration:</span>
                <span className="text-white">{settings.workDuration} min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Short Break:</span>
                <span className="text-white">{settings.shortBreakDuration} min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Long Break:</span>
                <span className="text-white">{settings.longBreakDuration} min</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default PomodoroTimer