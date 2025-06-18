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
  selectedPoints?: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ 
  team, 
  isTopTeam = false, 
  isInFinals = false,
  onClick,
  disabled = false,
  selectedPoints = 0
}) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-gray-400" />;
      case 3:
        return <Award className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-amber-600" />;
      default:
        return <div className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 flex items-center justify-center text-xs font-bold text-gray-400">#{rank}</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: onClick ? 1.02 : 1, y: onClick ? -2 : 0 }}
      whileTap={{ scale: onClick ? 0.95 : 1 }}
      transition={{ duration: 0.2 }}
      className={`
        relative overflow-hidden rounded-lg md:rounded-xl p-3 md:p-4 lg:p-5 backdrop-blur-lg border min-h-[100px] md:min-h-[120px]
        ${isTopTeam ? 'border-yellow-400/50 shadow-lg shadow-yellow-400/20' : 'border-white/20'}
        ${onClick && !disabled ? 'cursor-pointer hover:border-white/40 active:scale-95' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        bg-gradient-to-br ${team.color} bg-opacity-20
      `}
      onClick={onClick && !disabled ? onClick : undefined}
    >
      {/* Background glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${team.color} opacity-10`} />
      
      {/* Top indicator for finals */}
      {isInFinals && (
        <div className="absolute top-1 right-1 md:top-2 md:right-2">
          <div className="px-1 md:px-2 py-0.5 bg-yellow-400/20 rounded-full text-xs text-yellow-400 font-medium">
            FINALS
          </div>
        </div>
      )}

      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Header with rank and emoji */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-1 md:space-x-2">
            {getRankIcon(team.rank)}
            <span className="text-lg md:text-xl lg:text-2xl">{team.emoji}</span>
          </div>
          <div className="text-right">
            <div className="text-lg md:text-xl lg:text-2xl font-bold text-white">
              {team.score}
            </div>
            <div className="text-xs text-gray-300">pts</div>
          </div>
        </div>

        {/* Team name */}
        <div className="flex-1 flex flex-col justify-end">
          <h3 className="text-sm md:text-base lg:text-lg font-bold text-white leading-tight">
            {team.name}
          </h3>
          {team.rank === 1 && team.score > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-yellow-400 text-xs font-medium mt-1"
            >
              🎉 Leading!
            </motion.div>
          )}
        </div>

        {/* Mobile tap indicator */}
        {onClick && !disabled && (
          <div className="absolute inset-0 bg-white/5 rounded-lg md:rounded-xl flex items-center justify-center opacity-0 active:opacity-100 transition-opacity duration-150 md:hidden">
            <div className="text-white font-medium text-xs bg-black/50 px-2 py-1 rounded">
              +{selectedPoints}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TeamCard;