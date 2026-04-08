import { ReadingComprehensionExercise, StudentResponse } from './types';
import { sampleExercises } from './sample-exercises';

// In-memory database
let exercises: ReadingComprehensionExercise[] = sampleExercises;
let studentResponses: StudentResponse[] = [];

export const db = {
  exercises: {
    getAll: () => exercises,
    getById: (id: string) => exercises.find(e => e.id === id),
    create: (exercise: Omit<ReadingComprehensionExercise, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newExercise: ReadingComprehensionExercise = {
        ...exercise,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      exercises.push(newExercise);
      return newExercise;
    },
    update: (id: string, updates: Partial<ReadingComprehensionExercise>) => {
      const index = exercises.findIndex(e => e.id === id);
      if (index === -1) return null;
      exercises[index] = { ...exercises[index], ...updates, updatedAt: new Date() };
      return exercises[index];
    },
    delete: (id: string) => {
      exercises = exercises.filter(e => e.id !== id);
    }
  },
  responses: {
    getAll: () => studentResponses,
    getByExerciseId: (exerciseId: string) => studentResponses.filter(r => r.exerciseId === exerciseId),
    create: (response: Omit<StudentResponse, 'id' | 'completedAt'>) => {
      const newResponse: StudentResponse = {
        ...response,
        id: Date.now().toString(),
        completedAt: new Date()
      };
      studentResponses.push(newResponse);
      return newResponse;
    }
  }
};
