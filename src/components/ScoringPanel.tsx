import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Award, ArrowRight } from 'lucide-react';

interface ScoringPanelProps {
  selectedPoints: number;
  onPointsChange: (points: number) => void;
  onAdvanceToFinals: () => void;
  onFinishGame: () => void;
  currentRound: 'rubric' | 'final' | 'finished';
  canAdvanceToFinals: boolean;
}

const pointOptions = [50, 100, 150, 200, 250, 300, 500];

const ScoringPanel: React.FC<ScoringPanelProps> = ({
  selectedPoints,
  onPointsChange,
  onAdvanceToFinals,
  onFinishGame,
  currentRound,
  canAdvanceToFinals,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4 lg:space-y-6"
    >
      {/* Points selection - Fixed overflow issues */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-white/20">
        <h3 className="text-lg lg:text-xl font-bold text-white mb-3 lg:mb-4 flex items-center">
          <Award className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-yellow-400" />
          <span className="hidden sm:inline">Select Points</span>
          <span className="sm:hidden">Points</span>
        </h3>
        
        {/* Mobile: Horizontal scroll */}
        <div className="xl:hidden">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {pointOptions.map((points) => (
              <motion.button
                key={points}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPointsChange(points)}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-lg font-bold transition-all duration-200 min-w-[60px]
                  ${selectedPoints === points
                    ? 'bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/30'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }
                `}
              >
                {points}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Large screens: Vertical stack to prevent overflow */}
        <div className="hidden xl:block space-y-2">
          {pointOptions.map((points) => (
            <motion.button
              key={points}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onPointsChange(points)}
              className={`
                w-full p-3 rounded-xl font-bold transition-all duration-200 text-center
                ${selectedPoints === points
                  ? 'bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/30'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }
              `}
            >
              {points} pts
            </motion.button>
          ))}
        </div>

        <div className="mt-3 lg:mt-4 text-center">
          <div className="text-xs lg:text-sm text-gray-300 mb-1 lg:mb-2">Selected:</div>
          <div className="text-2xl lg:text-3xl font-bold text-yellow-400">{selectedPoints}</div>
        </div>
      </div>

      {/* Instructions - Collapsed on mobile */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-blue-500/20">
        <details className="xl:hidden">
          <summary className="font-bold text-white cursor-pointer">How to Score</summary>
          <ol className="text-gray-300 space-y-1 text-sm mt-2">
            <li>1. Select point value above</li>
            <li>2. Click on a team card to award points</li>
            <li>3. Watch the leaderboard update automatically</li>
            {currentRound === 'rubric' && (
              <li>4. Advance top 4 teams to finals when ready</li>
            )}
          </ol>
        </details>
        
        <div className="hidden xl:block">
          <h4 className="font-bold text-white mb-2">How to Score:</h4>
          <ol className="text-gray-300 space-y-1 text-sm">
            <li>1. Select point value above</li>
            <li>2. Click on a team card</li>
            <li>3. Leaderboard updates</li>
            {currentRound === 'rubric' && (
              <li>4. Advance top 4 to finals</li>
            )}
          </ol>
        </div>
      </div>

      {/* Game flow controls */}
      {currentRound === 'rubric' && canAdvanceToFinals && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAdvanceToFinals}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 lg:py-4 px-4 lg:px-6 rounded-xl lg:rounded-2xl flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 text-sm lg:text-base"
        >
          <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="hidden sm:inline">Advance Top 4 to Finals</span>
          <span className="sm:hidden">Finals</span>
        </motion.button>
      )}

      {currentRound === 'final' && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onFinishGame}
          className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 font-bold py-3 lg:py-4 px-4 lg:px-6 rounded-xl lg:rounded-2xl flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 text-sm lg:text-base"
        >
          <Award className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="hidden sm:inline">Finish Game & Celebrate!</span>
          <span className="sm:hidden">Finish</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default ScoringPanel;