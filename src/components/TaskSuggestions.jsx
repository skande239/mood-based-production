import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { completeTask, resetTasks } from '../store/tasksSlice'
import { addPoints, checkAndAwardBadge } from '../store/rewardsSlice'

const TaskSuggestions = () => {
  const dispatch = useDispatch()
  const { suggestedTasks, completedTasks } = useSelector((state) => state.tasks)
  const { currentMood } = useSelector((state) => state.mood)

  const handleCompleteTask = (taskId) => {
    const task = suggestedTasks.find(t => t.id === taskId)
    if (task) {
      dispatch(completeTask(taskId))
      dispatch(addPoints(task.points))
      dispatch(checkAndAwardBadge({ 
        type: 'complete_task', 
        count: completedTasks.length + 1 
      }))
    }
  }

  const handleResetTasks = () => {
    dispatch(resetTasks())
  }

  const getTaskTypeIcon = (type) => {
    const icons = {
      creative: '🎨',
      social: '👥',
      educational: '📚',
      'low-energy': '🔋',
      productivity: '⚡',
      'self-care': '💆‍♀️',
      mindfulness: '🧘‍♀️',
      relaxation: '🌸',
      physical: '🏃‍♂️',
      'mental-health': '💭',
      planning: '📅'
    }
    return icons[type] || '📋'
  }

  const getMoodColor = () => {
    switch (currentMood?.type) {
      case 'happy': return 'from-orange-400 to-pink-400'
      case 'tired': return 'from-blue-400 to-indigo-600'
      case 'anxious': return 'from-green-400 to-teal-500'
      case 'focused': return 'from-purple-400 to-blue-500'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  if (!currentMood) {
    return null
  }

  return (
    <motion.div 
      className="mood-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white text-shadow">
          Suggested Tasks
        </h3>
        {suggestedTasks.length === 0 && completedTasks.length > 0 && (
          <button
            onClick={handleResetTasks}
            className="btn-primary text-sm"
          >
            Refresh Tasks
          </button>
        )}
      </div>

      {suggestedTasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="text-4xl mb-4">🎉</div>
          <h4 className="text-xl font-semibold text-white mb-2">
            All tasks completed!
          </h4>
          <p className="text-white/80 mb-4">
            Great job! You've finished all suggested tasks for your current mood.
          </p>
          <button
            onClick={handleResetTasks}
            className="btn-primary"
          >
            Get More Tasks
          </button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {suggestedTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="text-2xl">{getTaskTypeIcon(task.type)}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{task.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                          {task.type}
                        </span>
                        <span className="text-xs text-white/80">
                          +{task.points} points
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => handleCompleteTask(task.id)}
                    className="btn-primary ml-4 px-6"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Complete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Completed Tasks Summary */}
      {completedTasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 pt-4 border-t border-white/20"
        >
          <h4 className="text-lg font-semibold text-white mb-3">
            Completed Today ({completedTasks.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {completedTasks.slice(-4).map((task) => (
              <div
                key={task.id}
                className="bg-white/10 rounded-lg p-3 flex items-center space-x-2"
              >
                <div className="text-sm">{getTaskTypeIcon(task.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-medium truncate">
                    {task.title}
                  </div>
                  <div className="text-xs text-white/60">
                    +{task.points} points
                  </div>
                </div>
                <div className="text-green-400 text-lg">✓</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default TaskSuggestions