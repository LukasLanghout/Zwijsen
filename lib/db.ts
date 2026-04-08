import { Exercise, GradeLevel } from './types';

// Demo rekenen oefeningen - Vierkanten (Squares)
export let exercises: Exercise[] = [
  {
    id: '1',
    title: 'Vierkanten 1',
    description: 'Getallen 1, 2, 3, 4, 5... 20 intekenen in vierkanten',
    exerciseType: 'mixed',
    gradeLevel: 'group-3',
    difficulty: 'easy',
    topic: 'Vierkanten',
    originalProblem: 'Welke getallen kun je als vierkant tekenen?',
    estimatedTime: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    variations: [
      {
        id: 'v1',
        problem: 'Welke getallen (tot 20) kun je als vierkant tekenen? (1x1, 2x2, 3x3, 4x4, etc.)',
        correctAnswer: '1, 4, 9, 16',
        explanation: 'Perfecte vierkanten: 1=1×1, 4=2×2, 9=3×3, 16=4×4',
        hints: ['Denk aan rechthoeken met gelijke zijden', '1×1=1, 2×2=4, 3×3=9, 4×4=16'],
        workSteps: [
          '1×1 = 1 (vierkant van 1)',
          '2×2 = 4 (vierkant van 2)',
          '3×3 = 9 (vierkant van 3)',
          '4×4 = 16 (vierkant van 4)',
          '5×5 = 25 (te groot, > 20)'
        ]
      },
      {
        id: 'v2',
        problem: 'Teken het kleinste vierkant. Hoeveel hokjes zijn dat bij elkaar?',
        correctAnswer: 1,
        explanation: '1 hokje (1×1 = 1)',
        hints: ['Het kleinste vierkant is 1 hokje', '1×1=1']
      },
      {
        id: 'v3',
        problem: 'Kun je 12 hokjes als vierkant rangschikken?',
        correctAnswer: 'nee',
        explanation: '12 is geen perfect vierkant. Je hebt 3×4=12 (rechthoek, geen vierkant)',
        hints: ['Checken: 3×3=9, 4×4=16. 12 zit ertussenin', 'Perfect vierkanten hebben gelijke zijden']
      }
    ]
  },
  {
    id: '2',
    title: 'Vierkanten 2',
    description: 'Tegels pakken en vierkanten tekenen',
    exerciseType: 'mixed',
    gradeLevel: 'group-4',
    difficulty: 'easy',
    topic: 'Vierkanten',
    originalProblem: 'Pak X tegels, leg daarmee het grootste vierkant. Hoeveel tegels over?',
    estimatedTime: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
    variations: [
      {
        id: 'v1',
        problem: 'Pak 12 tegels, leg daarmee het grootste vierkant. Hoeveel tegels zijn er over? Hoeveel hokjes?',
        correctAnswer: '9 tegels (3×3), 3 tegels over',
        explanation: '3×3=9 (grootste vierkant), 12-9=3 tegels over',
        hints: ['3×3=9 (vierkant)', '4×4=16 (te veel)', 'Hoeveel hokjes = getallen van het vierkant'],
        workSteps: [
          'Bereken: 3×3 = 9 (dit is het grootste vierkant uit 12)',
          '12 - 9 = 3 tegels over',
          'De hokjes: 3 × 3 = 9 hokjes in het vierkant'
        ]
      },
      {
        id: 'v2',
        problem: 'Pak 18 tegels, leg daarmee het grootste vierkant. Hoeveel tegels over?',
        correctAnswer: '16 tegels (4×4), 2 tegels over',
        explanation: '4×4=16 (grootste vierkant), 18-16=2 tegels over',
        hints: ['3×3=9, 4×4=16, 5×5=25', '18-16=?']
      },
      {
        id: 'v3',
        problem: 'Pak 20 tegels, leg daarmee twee vierkanten. Gebruik alle tegels.',
        correctAnswer: '16 tegels (4×4) en 4 tegels (2×2)',
        explanation: '4×4=16 en 2×2=4. Samen: 16+4=20',
        hints: ['Twee vierkanten samen', '4×4=16, dan blijven 4 tegels over', '2×2=4']
      }
    ]
  },
  {
    id: '3',
    title: 'Vierkanten 3 - Kleurig',
    description: 'Teken en kleur vierkanten van verschillende maten',
    exerciseType: 'mixed',
    gradeLevel: 'group-4',
    difficulty: 'medium',
    topic: 'Vierkanten',
    originalProblem: 'Maak 2 vierkanten van 4 hokjes. Maak 3 vierkanten van 9 hokjes.',
    estimatedTime: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
    variations: [
      {
        id: 'v1',
        problem: 'Maak 2 vierkanten van 4 hokjes elk. Kleur ze in.',
        correctAnswer: '2×2=4 hokjes per vierkant, 2 vierkanten totaal',
        explanation: 'Een vierkant van 4 hokjes = 2×2 grid. Je maakt er 2.',
        hints: ['2×2=4', 'Maak 2 keer een 2×2 vierkant']
      },
      {
        id: 'v2',
        problem: 'Maak 3 vierkanten van 9 hokjes elk. Kleur ze met verschillende kleuren.',
        correctAnswer: '3×3=9 hokjes per vierkant, 3 vierkanten totaal',
        explanation: 'Een vierkant van 9 hokjes = 3×3 grid. Je maakt er 3.',
        hints: ['3×3=9', 'Maak 3 keer een 3×3 vierkant']
      },
      {
        id: 'v3',
        problem: 'Maak 4 vierkanten van 16 hokjes. Maak 5 vierkanten van 25 hokjes.',
        correctAnswer: '4×4=16, 5×5=25',
        explanation: '4×4 vierkant heeft 16 hokjes, 5×5 vierkant heeft 25 hokjes',
        hints: ['4×4=16', '5×5=25']
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
  const typeSet = new Set(exercises.map(e => e.exerciseType));
  const types = Array.from(typeSet);
  return {
    totalExercises: exercises.length,
    totalVariations: exercises.reduce((sum, e) => sum + e.variations.length, 0),
    exerciseTypes: types
  };
}
