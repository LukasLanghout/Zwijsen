import { Exercise, GradeLevel } from './types';

// Demo rekenen oefeningen
export let exercises: Exercise[] = [
  {
    id: '1',
    title: 'Optellen tot 10',
    description: 'Basis optel oefeningen voor groep 3',
    exerciseType: 'addition',
    gradeLevel: 'group-3',
    difficulty: 'easy',
    topic: 'Optellen',
    originalProblem: '3 + 2 = ?',
    estimatedTime: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    variations: [
      {
        id: 'v1',
        problem: '3 + 2 = ?',
        correctAnswer: 5,
        explanation: 'Tel aan: 3, 4, 5 = 5',
        hints: ['Gebruik je vingers', 'Start bij 3 en tel 2 verder']
      },
      {
        id: 'v2',
        problem: 'Jan heeft 3 appels. His krijgt 2 appels erbij. Hoeveel appels heeft Jan nu?',
        correctAnswer: 5,
        explanation: '3 + 2 = 5 appels',
        hints: ['Hoeveel had hij al?', 'Hoeveel krijgt hij erbij?']
      },
      {
        id: 'v3',
        problem: '2 + 3 = ?',
        correctAnswer: 5,
        explanation: 'Tel aan: 2, 3, 4, 5 = 5',
        hints: ['Tel van 2 verder', 'Tel 3 stappen']
      }
    ]
  },
  {
    id: '2',
    title: 'Aftrekken tot 10',
    description: 'Basis aftrek oefeningen voor groep 3',
    exerciseType: 'subtraction',
    gradeLevel: 'group-3',
    difficulty: 'easy',
    topic: 'Aftrekken',
    originalProblem: '7 - 3 = ?',
    estimatedTime: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    variations: [
      {
        id: 'v1',
        problem: '7 - 3 = ?',
        correctAnswer: 4,
        explanation: 'Tel terug: 7, 6, 5, 4 = 4',
        hints: ['Tel 3 stappen terug', 'Gebruik je vingers']
      },
      {
        id: 'v2',
        problem: 'Sarah heeft 7 snoepjes. Ze eet 3 op. Hoeveel snoepjes heeft ze nog?',
        correctAnswer: 4,
        explanation: '7 - 3 = 4 snoepjes',
        hints: ['Hoeveel had ze?', 'Hoeveel eet ze op?']
      },
      {
        id: 'v3',
        problem: '8 - 3 = ?',
        correctAnswer: 5,
        explanation: 'Tel terug: 8, 7, 6, 5 = 5',
        hints: ['Tel 3 stappen terug van 8']
      }
    ]
  }
];

export function getExercises(): Exercise[] {
  return exercises;
}

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(e => e.id === id);
}

export function getExercisesByGrade(grade: GradeLevel): Exercise[] {
  return exercises.filter(e => e.gradeLevel === grade);
}

export function getExercisesByType(type: string): Exercise[] {
  return exercises.filter(e => e.exerciseType === type);
}

export function addExercise(exercise: Exercise): Exercise {
  exercises.push(exercise);
  return exercise;
}

export function updateExercise(id: string, updated: Partial<Exercise>): Exercise | undefined {
  const index = exercises.findIndex(e => e.id === id);
  if (index !== -1) {
    exercises[index] = { ...exercises[index], ...updated, updatedAt: new Date() };
    return exercises[index];
  }
  return undefined;
}

export function deleteExercise(id: string): boolean {
  const index = exercises.findIndex(e => e.id === id);
  if (index !== -1) {
    exercises.splice(index, 1);
    return true;
  }
  return false;
}

export function getStats() {
  const types = [...new Set(exercises.map(e => e.exerciseType))];
  return {
    totalExercises: exercises.length,
    totalVariations: exercises.reduce((sum, e) => sum + e.variations.length, 0),
    exerciseTypes: types
  };
}
