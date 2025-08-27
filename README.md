# 🎯 Mood-Based Productivity Dashboard

A modern, responsive web application that adapts to your emotional state to provide personalized productivity suggestions, habit tracking, and focus tools.

![Mood-Based Productivity Dashboard](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-38B2AC) ![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.0.1-764ABC)

## ✨ Features

### 🎭 **Mood Input System**
- **Emoji Selection**: Choose from 😊 Happy, 😴 Tired, 😟 Anxious, or 😍 Focused
- **Text Description**: Add optional detailed mood descriptions
- **Mood History**: Track your emotional patterns over time

### 🎨 **Dynamic UI & Themes**
- **Mood-Based Backgrounds**: Beautiful gradients that change based on your mood
  - Happy: Orange to Pink gradient 🧡💗
  - Tired: Blue to Indigo gradient 💙💜
  - Anxious: Green to Teal gradient 💚🩵
  - Focused: Purple to Blue gradient 💜💙
- **Smooth Transitions**: Seamless animations between mood states

### 📋 **Smart Task Suggestions**
- **Happy**: Creative tasks (journaling, brainstorming, creative projects)
- **Tired**: Low-energy tasks with Pomodoro timer suggestions
- **Anxious**: Calming activities (breathing exercises, meditation, walks)
- **Focused**: Challenging productivity tasks and goal setting
- **Points System**: Earn points for completing tasks

### 🎯 **Micro-Habit Tracker**
- Track 5 essential daily habits:
  - 💧 Drink Water (8 glasses)
  - 🚶‍♂️ Take Walks (1 session)
  - 🤸‍♀️ Stretch (3 times)
  - 🧘‍♀️ Deep Breathing (5 minutes)
  - 📚 Read (30 minutes)
- **Visual Progress Bars** with completion percentages
- **Streak Tracking** with fire emoji indicators 🔥
- **Daily Summaries** and progress analytics

### ⏲️ **Pomodoro Timer**
- **Animated Circular Progress** indicator
- **Work/Break Session Management** (25/5/15 minute intervals)
- **Session Tracking** with visual progress dots
- **Mood-Based Styling** and smooth animations
- **Customizable Settings** panel

### 🏆 **Gamification System**
- **10 Achievement Badges** to unlock:
  - 🌟 First Step, 🏆 Task Master, 🐝 Productive Bee
  - 💧 Hydration Hero, 🚶‍♂️ Walking Wonder, ⭐ Stretch Star
  - 📈 Mood Tracker, 🎯 Focus Master, ⚔️ Week Warrior, 🧘‍♀️ Zen Master
- **Level Progression** (every 100 points = 1 level)
- **Achievement Notifications** with celebratory animations
- **Visual Badge Collection** showing earned and available badges

## 🛠️ Tech Stack

- **Frontend**: React 18.2+ with modern hooks
- **Build Tool**: Vite 5.0.8 for fast development and optimized builds
- **Styling**: TailwindCSS 3.4.0 with custom themes and animations
- **State Management**: Redux Toolkit 2.0.1 for predictable state updates
- **Animations**: Framer Motion 10.16.16 for smooth, interactive animations
- **Charts**: Recharts 2.8.0 for data visualization (future feature)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/mood-based-productivity-dashboard.git
cd mood-based-productivity-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 📱 Mobile Responsive

The dashboard is fully optimized for all device sizes:

- **📱 Mobile Phones**: Touch-optimized with 44px minimum touch targets
- **📱 Tablets**: Balanced layout with efficient space usage
- **🖥️ Desktop**: Full-featured experience with advanced layouts

### Responsive Features:
- Adaptive typography scaling
- Touch-friendly button sizes
- Flexible grid layouts
- Optimized spacing and padding
- Mobile-first design approach

## 🎨 Design Features

- **Glass-morphism UI** with backdrop blur effects
- **Smooth Animations** powered by Framer Motion
- **Custom TailwindCSS** themes with mood-specific colors
- **Modern, Minimal Interface** with excellent UX
- **Accessibility-Ready** components

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.jsx    # Main dashboard orchestrator
│   ├── MoodSelector.jsx # Mood input and selection
│   ├── TaskSuggestions.jsx # Mood-based task recommendations
│   ├── HabitTracker.jsx # Daily habit tracking
│   ├── PomodoroTimer.jsx # Focus timer with animations
│   └── RewardSystem.jsx # Gamification and achievements
├── store/              # Redux store and slices
│   ├── store.js        # Main store configuration
│   ├── moodSlice.js    # Mood state management
│   ├── tasksSlice.js   # Task suggestions state
│   ├── habitsSlice.js  # Habit tracking state
│   ├── rewardsSlice.js # Gamification state
│   └── timerSlice.js   # Pomodoro timer state
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles and Tailwind
```

## 🎯 Usage

1. **Select Your Mood**: Choose an emoji that represents how you're feeling
2. **Get Personalized Tasks**: Receive mood-appropriate productivity suggestions
3. **Track Your Habits**: Log daily micro-habits and build streaks
4. **Focus with Pomodoro**: Use the animated timer for focused work sessions
5. **Earn Rewards**: Complete tasks and habits to unlock badges and level up!

## 🌟 Features in Development

- 📊 **Analytics Dashboard**: Visualize mood and productivity correlations
- 🔄 **Data Sync**: Cloud storage for cross-device synchronization
- 🎵 **Mood-Based Music**: Spotify integration for mood-appropriate playlists
- 🤖 **AI Suggestions**: Smart task recommendations based on patterns
- 👥 **Social Features**: Share achievements and compete with friends

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the intersection of emotional intelligence and productivity
- Built with modern web technologies for optimal performance
- Designed with accessibility and user experience in mind

---

**Start your mood-based productivity journey today!** 🚀✨