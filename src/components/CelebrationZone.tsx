import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Trophy, Crown, Star } from 'lucide-react';
import { Team } from '../types/game';

interface CelebrationZoneProps {
  showConfetti: boolean;
  winnerTeam?: Team;
  isGameFinished: boolean;
}

const CelebrationZone: React.FC<CelebrationZoneProps> = ({
  showConfetti,
  winnerTeam,
  isGameFinished,
}) => {
  return (
    <AnimatePresence>
      {showConfetti && (
        <>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-12 text-center shadow-2xl max-w-md mx-4"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-8xl mb-6"
              >
                🎉
              </motion.div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Congratulations!
              </h2>
              
              {winnerTeam && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <Crown className="w-8 h-8 text-gray-900" />
                    <span className="text-3xl">{winnerTeam.emoji}</span>
                    <Trophy className="w-8 h-8 text-gray-900" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900">
                    {winnerTeam.name}
                  </h3>
                  
                  <div className="bg-white/30 rounded-2xl p-4">
                    <div className="text-3xl font-bold text-gray-900">
                      {winnerTeam.score} points
                    </div>
                    <div className="text-gray-800 font-medium">
                      Trivia Champions! 🏆
                    </div>
                  </div>
                </div>
              )}
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex justify-center space-x-2 mt-6"
              >
                <Star className="w-6 h-6 text-gray-900" />
                <Star className="w-6 h-6 text-gray-900" />
                <Star className="w-6 h-6 text-gray-900" />
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CelebrationZone;