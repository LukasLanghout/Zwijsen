// Types voor Begrijpend Lezen Oefeningen

export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank' | 'open-question';
export type GradeLevel = 'group-3' | 'group-4' | 'group-5' | 'group-6' | 'group-7' | 'group-8';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Exercise {
  id: string;
  title: string;
  textPassage: string; // De te lezen tekst
  gradeLevel: GradeLevel; // Groep 3-8
  difficulty: Difficulty;
  topic: string; // Onderwerp/thema
  questions: Question[];
  estimatedTime: number; // In minuten
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  type: QuestionType;
  questionText: string;
  options?: string[]; // Voor multiple choice / true-false
  correctAnswer: string | string[]; // Single of array of correct answers
  explanation?: string; // Uitleg voor het juiste antwoord
  hints?: string[]; // Hulpvragen/hints
}

export interface ExerciseSubmission {
  id: string;
  exerciseId: string;
  studentName?: string;
  answers: Record<string, string | string[]>; // Antwoorden per vraag
  score: number; // Percentage
  submittedAt: Date;
}

export interface ReadingStats {
  totalExercises: number;
  exercisesByGrade: Record<GradeLevel, number>;
  exercisesByDifficulty: Record<Difficulty, number>;
  averageScore?: number;
}
