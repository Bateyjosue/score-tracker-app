import { motion } from 'framer-motion';
import { Zap, Target } from 'lucide-react';
import { useGameState } from './hooks/useGameState';
import Leaderboard from './components/Leaderboard';
import ScoringPanel from './components/ScoringPanel';
import Controls from './components/Controls';
import CelebrationZone from './components/CelebrationZone';

function App() {
  const {
    gameState,
    awardPoints,
    advanceToFinals,
    finishGame,
    resetGame,
    setSelectedPoints,
    toggleTheme,
    startTimer,
    stopTimer,
    getTopTeams,
  } = useGameState();

  const handleTeamClick = (teamId: string) => {
    if (gameState.currentRound === 'finished') return;
    
    // Don't allow scoring non-finalist teams in final round
    if (gameState.currentRound === 'final') {
      const finalistsIds = getTopTeams(4).map(team => team.id);
      if (!finalistsIds.includes(teamId)) return;
    }
    
    awardPoints(teamId, gameState.selectedPoints);
  };

  const canAdvanceToFinals = gameState.teams.some(team => team.score > 0);
  const winnerTeam = gameState.currentRound === 'finished' 
    ? getTopTeams(1)[0] 
    : undefined;

  return (
    <div className={`h-screen overflow-hidden transition-all duration-500 ${
      gameState.isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.5)_1px,_transparent_0)] bg-[size:20px_20px]" />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Compact Header */}
        <header className="flex-shrink-0 text-center py-3 px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Team Trivia Tracker
              </h1>
              <Target className="w-6 h-6 text-yellow-400" />
            </div>
            
            <p className="text-gray-300 text-sm md:text-base mb-3">
              Show & Tell Friday Trivia Championship 🏆
            </p>

            {/* Compact Stats */}
            <div className="flex justify-center space-x-6 text-center">
              <div>
                <div className="text-lg md:text-xl font-bold text-yellow-400">
                  {gameState.teams.length}
                </div>
                <div className="text-xs text-gray-300">Teams</div>
              </div>
              <div>
                <div className="text-lg md:text-xl font-bold text-blue-400">
                  {gameState.questions.length}
                </div>
                <div className="text-xs text-gray-300">Questions</div>
              </div>
              <div>
                <div className="text-lg md:text-xl font-bold text-green-400">
                  {gameState.teams.reduce((sum, team) => sum + team.score, 0)}
                </div>
                <div className="text-xs text-gray-300">Total Points</div>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Compact Controls */}
        <div className="flex-shrink-0 px-4 pb-3">
          <Controls
            isDarkMode={gameState.isDarkMode}
            onToggleTheme={toggleTheme}
            onResetGame={resetGame}
            timer={gameState.timer}
            isTimerRunning={gameState.isTimerRunning}
            onStartTimer={() => startTimer(30)}
            onStopTimer={stopTimer}
          />
        </div>

        {/* Main Content - Takes remaining height */}
        <main className="flex-1 px-4 pb-4 min-h-0">
          <div className="max-w-7xl mx-auto h-full">
            <div className="grid lg:grid-cols-4 gap-4 h-full">
              {/* Leaderboard - Takes up 3 columns on large screens */}
              <div className="lg:col-span-3 min-h-0">
                <div className="h-full overflow-y-auto scrollbar-hide">
                  <Leaderboard
                    teams={gameState.teams}
                    currentRound={gameState.currentRound}
                    onTeamClick={gameState.currentRound !== 'finished' ? handleTeamClick : undefined}
                    disabledTeamIds={
                      gameState.currentRound === 'final' 
                        ? gameState.teams.filter((_, index) => index >= 4).map(team => team.id)
                        : []
                    }
                  />
                </div>
              </div>

              {/* Scoring Panel - Fixed width on large screens */}
              <div className="lg:col-span-1 min-h-0">
                <div className="h-full overflow-y-auto scrollbar-hide">
                  <ScoringPanel
                    selectedPoints={gameState.selectedPoints}
                    onPointsChange={setSelectedPoints}
                    onAdvanceToFinals={advanceToFinals}
                    onFinishGame={finishGame}
                    currentRound={gameState.currentRound}
                    canAdvanceToFinals={canAdvanceToFinals}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Celebration */}
        <CelebrationZone
          showConfetti={gameState.showConfetti}
          winnerTeam={winnerTeam}
          isGameFinished={gameState.currentRound === 'finished'}
        />
      </div>
    </div>
  );
}

export default App;