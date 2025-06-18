import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeamCard from './TeamCard';
import { Team } from '../types/game';

interface LeaderboardProps {
  teams: Team[];
  currentRound: 'rubric' | 'final' | 'finished';
  onTeamClick?: (teamId: string) => void;
  disabledTeamIds?: string[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ 
  teams, 
  currentRound, 
  onTeamClick,
  disabledTeamIds = []
}) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const finalsTeams = currentRound === 'final' ? sortedTeams.slice(0, 4) : [];
  const displayTeams = currentRound === 'final' ? finalsTeams : sortedTeams;

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Round indicator */}
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-white mb-2"
        >
          {currentRound === 'rubric' && 'Round 1: Kahoot Rubric'}
          {currentRound === 'final' && '🔥 FINALS: Top 4 Teams'}
          {currentRound === 'finished' && '🎉 Game Complete!'}
        </motion.h2>
        
        {currentRound === 'rubric' && (
          <p className="text-gray-300 text-sm md:text-base">
            All teams competing • Top 4 advance to finals
          </p>
        )}
        {currentRound === 'final' && (
          <p className="text-yellow-400 font-medium text-sm md:text-base">
            General Knowledge Round • Winner takes all!
          </p>
        )}
      </div>

      {/* Teams grid - Optimized for mobile */}
      <div className={`grid gap-3 md:gap-4 ${
        currentRound === 'final' 
          ? 'grid-cols-2 lg:grid-cols-4' 
          : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
      }`}>
        <AnimatePresence mode="popLayout">
          {displayTeams.map((team, index) => (
            <motion.div
              key={team.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05,
                layout: { duration: 0.3 }
              }}
            >
              <TeamCard
                team={team}
                isTopTeam={index < 4}
                isInFinals={currentRound === 'final'}
                onClick={onTeamClick ? () => onTeamClick(team.id) : undefined}
                disabled={disabledTeamIds.includes(team.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Finals qualification indicator - Compact on mobile */}
      {currentRound === 'rubric' && sortedTeams.some(team => team.score > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-yellow-400/20"
        >
          <h3 className="text-lg lg:text-xl font-bold text-yellow-400 mb-3">
            🏆 Current Finals Qualifiers (Top 4)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
            {sortedTeams.slice(0, 4).map((team, index) => (
              <div key={team.id} className="text-center">
                <div className="text-xl lg:text-2xl mb-1">{team.emoji}</div>
                <div className="text-xs lg:text-sm text-white font-medium truncate">{team.name}</div>
                <div className="text-yellow-400 font-bold text-sm lg:text-base">{team.score} pts</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Leaderboard;