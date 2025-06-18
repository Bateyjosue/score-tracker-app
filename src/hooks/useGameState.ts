import { useState, useCallback, useEffect } from "react";
import { GameState, Team, Question } from "../types/game";

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    teams: initialTeams,
    currentRound: "rubric",
    questions: [],
    selectedPoints: 100,
    timer: 30,
    isTimerRunning: false,
    isDarkMode: true,
    showConfetti: false,
  });

  // Calculate ranks whenever scores change
  const updateRanks = useCallback((teams: Team[]) => {
    const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
    return sortedTeams.map((team, index) => ({
      ...team,
      rank: index + 1,
    }));
  }, []);

  const awardPoints = useCallback(
    (teamId: string, points: number) => {
      setGameState((prev) => {
        const updatedTeams = prev.teams.map((team) =>
          team.id === teamId ? { ...team, score: team.score + points } : team
        );

        const rankedTeams = updateRanks(updatedTeams);

        const newQuestion: Question = {
          id: Date.now().toString(),
          round: prev.currentRound,
          points,
          winner: teamId,
          timestamp: Date.now(),
        };

        return {
          ...prev,
          teams: rankedTeams,
          questions: [...prev.questions, newQuestion],
        };
      });

      // Play success sound
      playSound("success");
    },
    [updateRanks]
  );

  const advanceToFinals = useCallback(() => {
    setGameState((prev) => {
      const top4Teams = prev.teams
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
        .map((team) => ({ ...team, rank: 1 })); // Reset ranks for finals

      return {
        ...prev,
        currentRound: "final",
        teams: prev.teams.map((team) =>
          top4Teams.find((t) => t.id === team.id) ? team : team
        ),
      };
    });
  }, []);

  const finishGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      currentRound: "finished",
      showConfetti: true,
    }));

    // Play victory sound
    playSound("victory");

    // Hide confetti after 5 seconds
    setTimeout(() => {
      setGameState((prev) => ({ ...prev, showConfetti: false }));
    }, 5000);
  }, []);

  const resetGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      teams: initialTeams,
      currentRound: "rubric",
      questions: [],
      timer: 30,
      isTimerRunning: false,
      showConfetti: false,
    }));
  }, []);

  const setSelectedPoints = useCallback((points: number) => {
    setGameState((prev) => ({ ...prev, selectedPoints: points }));
  }, []);

  const toggleTheme = useCallback(() => {
    setGameState((prev) => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  }, []);

  const startTimer = useCallback((seconds: number = 30) => {
    setGameState((prev) => ({
      ...prev,
      timer: seconds,
      isTimerRunning: true,
    }));
  }, []);

  const stopTimer = useCallback(() => {
    setGameState((prev) => ({ ...prev, isTimerRunning: false }));
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameState.isTimerRunning && gameState.timer > 0) {
      interval = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          timer: prev.timer - 1,
        }));
      }, 1000);
    } else if (gameState.timer === 0) {
      setGameState((prev) => ({ ...prev, isTimerRunning: false }));
      playSound("timeup");
    }

    return () => clearInterval(interval);
  }, [gameState.isTimerRunning, gameState.timer]);

  const playSound = (type: "success" | "victory" | "timeup") => {
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    const frequencies = {
      success: [523.25, 659.25, 783.99], // C5, E5, G5
      victory: [261.63, 329.63, 392.0, 523.25], // C4, E4, G4, C5
      timeup: [200, 150, 100], // Descending tones
    };

    frequencies[type].forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.3
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      }, index * 100);
    });
  };

  const getTopTeams = useCallback(
    (count: number = 4) => {
      return gameState.teams.sort((a, b) => b.score - a.score).slice(0, count);
    },
    [gameState.teams]
  );

  return {
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
  };
};

const initialTeams: Team[] = [
  {
    id: "1",
    name: "Lightning Bolts",
    emoji: "⚡",
    score: 0,
    rank: 1,
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: "2",
    name: "Brain Busters",
    emoji: "🧠",
    score: 0,
    rank: 1,
    color: "from-purple-400 to-pink-500",
  },
  {
    id: "3",
    name: "Quiz Masters",
    emoji: "🎯",
    score: 0,
    rank: 1,
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: "4",
    name: "Trivia Titans",
    emoji: "🏆",
    score: 0,
    rank: 1,
    color: "from-green-400 to-emerald-500",
  },
  {
    id: "5",
    name: "Smart Cookies",
    emoji: "🍪",
    score: 0,
    rank: 1,
    color: "from-amber-400 to-yellow-500",
  },
  {
    id: "6",
    name: "Knowledge Knights",
    emoji: "⚔️",
    score: 0,
    rank: 1,
    color: "from-indigo-400 to-purple-500",
  },
  {
    id: "7",
    name: "Fact Finders",
    emoji: "🔍",
    score: 0,
    rank: 1,
    color: "from-red-400 to-pink-500",
  },
];
