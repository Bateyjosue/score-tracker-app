export interface Team {
  id: string;
  name: string;
  emoji: string;
  score: number;
  rank: number;
  color: string;
}

export interface Question {
  id: string;
  round?: "rubric" | "final";
  points: number;
  winner?: string;
  timestamp: number;
}

export interface GameState {
  teams: Team[];
  currentRound: "rubric" | "final" | "finished";
  questions: Question[];
  selectedPoints: number;
  timer: number;
  isTimerRunning: boolean;
  isDarkMode: boolean;
  showConfetti: boolean;
}
