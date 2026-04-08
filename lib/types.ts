// Types voor Begrijpend Lezen Oefeningen

export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank' | 'open-question';
export type GradeLevel = 'group-3' | 'group-4' | 'group-5' | 'group-6' | 'group-7' | 'group-8';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Exercise {
  id: string;
  title: string;
  textPassage: string;
  gradeLevel: GradeLevel;
  difficulty: Difficulty;
  topic: string;
  questions: Question[];
  estimatedTime: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  type: QuestionType;
  questionText: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  hints?: string[];
}
