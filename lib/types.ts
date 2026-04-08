export interface ReadingComprehensionExercise {
  id: string;
  title: string;
  text: string;
  grade: 'groep3' | 'groep4' | 'groep5' | 'groep6' | 'groep7' | 'groep8';
  difficulty: 'easy' | 'medium' | 'hard';
  questions: ComprehensionQuestion[];
  bloomLevel: 'remembering' | 'understanding' | 'applying' | 'analyzing' | 'evaluating' | 'creating';
  wordCount: number;
  readingTime: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

export interface ComprehensionQuestion {
  id: string;
  question: string;
  questionType: 'multiple-choice' | 'short-answer' | 'essay';
  options?: string[];
  correctAnswer?: string;
  bloomLevel: 'remembering' | 'understanding' | 'applying' | 'analyzing' | 'evaluating' | 'creating';
}

export interface StudentResponse {
  id: string;
  exerciseId: string;
  studentName: string;
  answers: {
    questionId: string;
    answer: string;
    isCorrect?: boolean;
  }[];
  score?: number;
  completedAt: Date;
}
