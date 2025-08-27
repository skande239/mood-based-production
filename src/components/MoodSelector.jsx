import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { setMood, setMoodText } from '../store/moodSlice'
import { updateSuggestedTasks } from '../store/tasksSlice'

const moodOptions = [
  { type: 'happy', emoji: '😊', label: 'Happy', description: 'Feeling joyful and energetic' },
  { type: 'tired', emoji: '😴', label: 'Tired', description: 'Low energy, need gentle tasks' },
  { type: 'anxious', emoji: '😟', label: 'Anxious', description: 'Stressed, need calming activities' },
  { type: 'focused', emoji: '😍', label: 'Focused', description: 'Ready to tackle challenging tasks' }
]

const MoodSelector = () => {
  const dispatch = useDispatch()
  const { currentMood, moodText } = useSelector((state) => state.mood)
  const [showTextInput, setShowTextInput] = useState(false)
  const [selectedMood, setSelectedMood] = useState(null)

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
    dispatch(setMood({
      type: mood.type,
      emoji: mood.emoji,
      label: mood.label,
      description: mood.description,
      text: moodText
    }))
    dispatch(updateSuggestedTasks(mood.type))
  }

  const handleTextChange = (e) => {
    dispatch(setMoodText(e.target.value))
  }

  const handleTextSubmit = () => {
    if (selectedMood && moodText.trim()) {
      dispatch(setMood({
        ...selectedMood,
        text: moodText.trim()
      }))
    }
    setShowTextInput(false)
  }

  return (
    <motion.div 
      className="mood-card mb-8"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center text-shadow">
        How are you feeling today?
      </h2>
      
      {/* Emoji Mood Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {moodOptions.map((mood) => (
          <motion.button
            key={mood.type}
            onClick={() => handleMoodSelect(mood)}
            className={`p-3 sm:p-4 rounded-xl transition-all duration-300 min-h-[100px] sm:min-h-[120px] ${
              currentMood?.type === mood.type
                ? 'bg-white/40 scale-105 glow'
                : 'bg-white/20 hover:bg-white/30'
            } border border-white/30`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">{mood.emoji}</div>
            <div className="text-white font-semibold text-xs sm:text-sm">{mood.label}</div>
            <div className="text-white/80 text-xs mt-1 leading-tight">{mood.description}</div>
          </motion.button>
        ))}
      </div>

      {/* Current Mood Display */}
      <AnimatePresence>
        {currentMood && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-4"
          >
            <div className="text-4xl sm:text-6xl mb-2 animate-bounce-soft">{currentMood.emoji}</div>
            <h3 className="text-lg sm:text-xl font-semibold text-white text-shadow">
              You're feeling {currentMood.label.toLowerCase()}
            </h3>
            {currentMood.text && (
              <p className="text-white/90 mt-2 italic">"{currentMood.text}"</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text Input Section */}
      <div className="flex justify-center">
        {!showTextInput ? (
          <motion.button
            onClick={() => setShowTextInput(true)}
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add mood description
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
          >
            <input
              type="text"
              value={moodText}
              onChange={handleTextChange}
              placeholder="How exactly are you feeling?"
              className="flex-1 px-4 py-2 bg-white/20 text-white placeholder-white/70 rounded-lg border border-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              maxLength={100}
            />
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handleTextSubmit}
                className="btn-primary px-4 sm:px-6 text-sm sm:text-base"
              >
                Save
              </button>
              <button
                onClick={() => setShowTextInput(false)}
                className="btn-secondary px-4 sm:px-6 text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default MoodSelector