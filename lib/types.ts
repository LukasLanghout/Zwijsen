// Types voor Rekenen Oefeningen

export type ExerciseType = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed' | 'word-problem';
export type GradeLevel = 'group-3' | 'group-4' | 'group-5' | 'group-6' | 'group-7' | 'group-8';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Exercise {
  id: string;
  title: string;
  description: string;
  exerciseType: ExerciseType;
  gradeLevel: GradeLevel;
  difficulty: Difficulty;
  topic: string;
  originalProblem: string;
  variations: ExerciseVariation[];
  estimatedTime: number;
  sourceFile?: string; // PDF filename if from upload
  createdAt: Date;
  updatedAt: Date;
}

export interface ExerciseVariation {
  id: string;
  problem: string;
  correctAnswer: string | number;
  explanation?: string;
  hints?: string[];
  workSteps?: string[]; // Step-by-step solution
}

export interface PDFUploadResult {
  fileName: string;
  exercises: Exercise[];
  totalExtracted: number;
  createdAt: Date;
}
