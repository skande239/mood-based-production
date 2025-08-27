import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { clearAchievement } from '../store/rewardsSlice'

const RewardSystem = () => {
  const dispatch = useDispatch()
  const { totalPoints, level, badges, achievements } = useSelector((state) => state.rewards)
  const [showAllBadges, setShowAllBadges] = useState(false)

  const pointsToNextLevel = (level * 100) - totalPoints
  const progressToNextLevel = (totalPoints % 100) / 100 * 100

  const earnedBadges = badges.filter(badge => badge.earned)
  const availableBadges = badges.filter(badge => !badge.earned)

  const handleClearAchievement = (achievementId) => {
    dispatch(clearAchievement(achievementId))
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString()
  }

  return (
    <motion.div 
      className="mood-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-2xl font-bold text-white mb-6 text-shadow">
        Rewards & Progress
      </h3>

      {/* Level and Points */}
      <div className="mb-6">
        <div className="text-center mb-4">
          <motion.div
            className="text-6xl mb-2"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 3
            }}
          >
            🏆
          </motion.div>
          <h4 className="text-3xl font-bold text-white">Level {level}</h4>
          <p className="text-white/80">{totalPoints} total points</p>
        </div>

        {/* Progress Bar to Next Level */}
        <div className="mb-2">
          <div className="flex justify-between text-sm text-white/80 mb-1">
            <span>Level {level}</span>
            <span>{pointsToNextLevel} points to level {level + 1}</span>
          </div>
          <div className="habit-progress">
            <motion.div
              className="habit-progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${progressToNextLevel}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <AnimatePresence>
        {achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6"
          >
            <h4 className="text-lg font-semibold text-white mb-3">
              Recent Achievements
            </h4>
            <div className="space-y-2">
              {achievements.slice(0, 3).map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {achievement.type === 'badge_earned' ? achievement.badge?.icon : '🎉'}
                    </div>
                    <div>
                      <p className="text-yellow-200 font-semibold text-sm">
                        {achievement.message}
                      </p>
                      <p className="text-yellow-200/70 text-xs">
                        {formatDate(achievement.timestamp)}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => handleClearAchievement(achievement.id)}
                    className="text-yellow-200/70 hover:text-yellow-200 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badges Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-white">
            Badges ({earnedBadges.length}/{badges.length})
          </h4>
          <motion.button
            onClick={() => setShowAllBadges(!showAllBadges)}
            className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
            whileHover={{ scale: 1.05 }}
          >
            {showAllBadges ? 'Show Less' : 'Show All'}
          </motion.button>
        </div>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div className="mb-4">
            <h5 className="text-sm font-semibold text-white/80 mb-2">Earned</h5>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {earnedBadges.slice(0, showAllBadges ? earnedBadges.length : 4).map((badge) => (
                <motion.div
                  key={badge.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/20 border border-white/30 rounded-lg p-3 text-center group cursor-pointer hover:bg-white/30 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  title={badge.description}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs text-white font-semibold truncate">
                    {badge.name}
                  </div>
                  {badge.earnedAt && (
                    <div className="text-xs text-white/60 mt-1">
                      {formatDate(badge.earnedAt)}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Available Badges */}
        {showAllBadges && availableBadges.length > 0 && (
          <div>
            <h5 className="text-sm font-semibold text-white/80 mb-2">Available</h5>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {availableBadges.map((badge) => (
                <motion.div
                  key={badge.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/10 border border-white/20 rounded-lg p-3 text-center opacity-60 cursor-pointer hover:opacity-80 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  title={badge.description}
                >
                  <div className="text-2xl mb-1 grayscale">{badge.icon}</div>
                  <div className="text-xs text-white font-semibold truncate">
                    {badge.name}
                  </div>
                  <div className="text-xs text-white/40 mt-1">
                    {badge.threshold} {badge.requirement.replace('_', ' ')}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pt-4 border-t border-white/20"
      >
        <h4 className="text-lg font-semibold text-white mb-3">Quick Stats</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-lg font-bold text-white">{earnedBadges.length}</div>
            <div className="text-xs text-white/70">Badges Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">⭐</div>
            <div className="text-lg font-bold text-white">{totalPoints}</div>
            <div className="text-xs text-white/70">Total Points</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default RewardSystem