export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  correctOptionId: string;
  icon: string; // FontAwesome class
  backgroundImage: string; // URL for the background
}

export interface QuizState {
  currentStep: 'welcome' | 'quiz' | 'result';
  score: number;
  currentQuestionIndex: number;
  answers: Record<number, string>; // questionId -> optionId
}

export interface ResultMessage {
  minScore: number;
  title: string;
  message: string;
}