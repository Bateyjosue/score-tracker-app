import React from 'react';
import { motion } from 'framer-motion';
import { 
  RotateCcw, 
  Moon, 
  Sun, 
  Play, 
  Pause, 
  Clock,
  Volume2,
  VolumeX 
} from 'lucide-react';

interface ControlsProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onResetGame: () => void;
  timer: number;
  isTimerRunning: boolean;
  onStartTimer: () => void;
  onStopTimer: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  isDarkMode,
  onToggleTheme,
  onResetGame,
  timer,
  isTimerRunning,
  onStartTimer,
  onStopTimer,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timer > 10) return 'text-green-400';
    if (timer > 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
      {/* Timer - Compact on mobile */}
      <div className="flex items-center space-x-1 md:space-x-2 bg-white/10 backdrop-blur-lg rounded-lg md:rounded-xl px-3 md:px-4 py-2 border border-white/20">
        <Clock className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
        <span className={`font-bold text-base md:text-lg ${getTimerColor()}`}>
          {formatTime(timer)}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={isTimerRunning ? onStopTimer : onStartTimer}
          className="p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
        >
          {isTimerRunning ? (
            <Pause className="w-3 h-3 md:w-4 md:h-4 text-white" />
          ) : (
            <Play className="w-3 h-3 md:w-4 md:h-4 text-white" />
          )}
        </motion.button>
      </div>

      {/* Theme toggle - Compact on mobile */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleTheme}
        className="flex items-center space-x-1 md:space-x-2 bg-white/10 backdrop-blur-lg rounded-lg md:rounded-xl px-3 md:px-4 py-2 border border-white/20 hover:bg-white/20 transition-colors"
      >
        {isDarkMode ? (
          <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
        ) : (
          <Moon className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
        )}
        <span className="text-white font-medium text-sm md:text-base hidden sm:inline">
          {isDarkMode ? 'Light' : 'Dark'}
        </span>
      </motion.button>

      {/* Reset game - Compact on mobile */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onResetGame}
        className="flex items-center space-x-1 md:space-x-2 bg-red-500/20 backdrop-blur-lg rounded-lg md:rounded-xl px-3 md:px-4 py-2 border border-red-500/30 hover:bg-red-500/30 transition-colors"
      >
        <RotateCcw className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
        <span className="text-red-400 font-medium text-sm md:text-base hidden sm:inline">Reset</span>
      </motion.button>
    </div>
  );
};

export default Controls;