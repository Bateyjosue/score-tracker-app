import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { Team } from '../types/game';

interface TeamCardProps {
  team: Team;
  isTopTeam?: boolean;
  isInFinals?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({ 
  team, 
  isTopTeam = false, 
  isInFinals = false,
  onClick,
  disabled = false
}) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-4 h-4 lg:w-6 lg:h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-4 h-4 lg:w-6 lg:h-6 text-gray-400" />;
      case 3:
        return <Award className="w-4 h-4 lg:w-6 lg:h-6 text-amber-600" />;
      default:
        return <div className="w-4 h-4 lg:w-6 lg:h-6 flex items-center justify-center text-xs lg:text-sm font-bold text-gray-400">#{rank}</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: onClick ? 1.02 : 1, y: onClick ? -2 : 0 }}
      whileTap={{ scale: onClick ? 0.98 : 1 }}
      transition={{ duration: 0.2 }}
      className={`
        relative overflow-hidden rounded-xl lg:rounded-2xl p-3 lg:p-6 backdrop-blur-lg border
        ${isTopTeam ? 'border-yellow-400/50 shadow-lg shadow-yellow-400/20' : 'border-white/20'}
        ${onClick && !disabled ? 'cursor-pointer hover:border-white/40' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        bg-gradient-to-br ${team.color} bg-opacity-20
      `}
      onClick={onClick && !disabled ? onClick : undefined}
    >
      {/* Background glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${team.color} opacity-10`} />
      
      {/* Top indicator for finals */}
      {isInFinals && (
        <div className="absolute top-1 lg:top-2 right-1 lg:right-2">
          <div className="px-1 lg:px-2 py-0.5 lg:py-1 bg-yellow-400/20 rounded-full text-xs text-yellow-400 font-medium">
            FINALS
          </div>
        </div>
      )}

      <div className="relative z-10">
        {/* Header with rank and emoji - Compact on mobile */}
        <div className="flex items-center justify-between mb-2 lg:mb-4">
          <div className="flex items-center space-x-1 lg:space-x-3">
            {getRankIcon(team.rank)}
            <span className="text-xl lg:text-3xl">{team.emoji}</span>
          </div>
          <div className="text-right">
            <div className="text-xl lg:text-3xl font-bold text-white">
              {team.score}
            </div>
            <div className="text-xs lg:text-sm text-gray-300">points</div>
          </div>
        </div>

        {/* Team name - Truncated on mobile */}
        <div>
          <h3 className="text-sm lg:text-xl font-bold text-white mb-1 truncate">
            {team.name}
          </h3>
          {team.rank === 1 && team.score > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-yellow-400 text-xs lg:text-sm font-medium"
            >
              🎉 Leading!
            </motion.div>
          )}
        </div>

        {/* Click indicator - Only show on larger screens */}
        {onClick && !disabled && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-white/10 rounded-xl lg:rounded-2xl flex items-center justify-center hidden lg:flex"
          >
            <div className="text-white font-medium text-sm lg:text-base">Click to Award Points</div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TeamCard;