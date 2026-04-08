import { Exercise, GradeLevel } from './types';

// Demo oefeningen voor Begrijpend Lezen
export let exercises: Exercise[] = [
  {
    id: '1',
    title: 'Het Konijn en de Schildpad',
    textPassage: `Er was eens een snelle konijn die altijd zei dat hij het snelste dier was.
    Een dag daagde een trage schildpad hem uit voor een race. "Jij bent veel te langzaam," lachte het konijn.

    Ze startten de race. Het konijn rende snel vooruit en werd al gauw moe. Hij ging onder een boom slapen.
    De schildpad liep langzaam maar zonder te stoppen. Uiteindelijk bereikte de schildpad de finish eerst.
    Het konijn werd wakker en zag dat hij verloren had. Hij leerde dat hard werken belangrijker is dan alleen snel zijn.`,
    gradeLevel: 'group-3',
    difficulty: 'easy',
    topic: 'Fabels',
    estimatedTime: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [
      {
        id: 'q1',
        type: 'true-false',
        questionText: 'Het konijn was de schildpad aan het begin moe.',
        correctAnswer: 'false',
        explanation: 'Het konijn was eerst snel en energiek. Hij werd pas moe nadat hij veel had gelopen.'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        questionText: 'Wat gebeurde er terwijl het konijn sliep?',
        options: [
          'De schildpad stopte ook met lopen',
          'De schildpad liep verder en bereikt de finish',
          'Het konijn werd wakker en rende verder',
          'Ze maakten vrienden'
        ],
        correctAnswer: 'De schildpad liep verder en bereikt de finish',
        explanation: 'Terwijl het konijn sliep, liep de schildpad door zonder te stoppen en won de race.'
      }
    ]
  },
  {
    id: '2',
    title: 'De Zwaluwen en de Zomer',
    textPassage: `In het voorjaar kwamen de zwaluwen terug van het zuiden. Ze bouwden hun nesten onder de dakrand van een boerderij.
    De boer keek toe en voelde zich blij. "De zwaluwen brengen de lente," zei hij tegen zijn vrouw.

    De hele zomer vlogen de zwaluwen rond en aten veel insecten. Ze maakten veel lawaai.
    In de herfst vlogen de zwaluwen allemaal weg naar het zuiden. De boer miste ze.`,
    gradeLevel: 'group-4',
    difficulty: 'easy',
    topic: 'Natuur',
    estimatedTime: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        questionText: 'Waar bouwden de zwaluwen hun nesten?',
        options: [
          'In de bomen',
          'Op de grond',
          'Onder de dakrand van de boerderij',
          'In het riet'
        ],
        correctAnswer: 'Onder de dakrand van de boerderij',
        explanation: 'De tekst zegt: "Ze bouwden hun nesten onder de dakrand van een boerderij."'
      },
      {
        id: 'q2',
        type: 'fill-blank',
        questionText: 'In de _____ vlogen de zwaluwen allemaal weg naar het zuiden.',
        correctAnswer: 'herfst',
        hints: ['Welk seizoen?', 'Na de zomer']
      }
    ]
  },
  {
    id: '3',
    title: 'Daan gaat naar de Bibliotheek',
    textPassage: `Daan was negen jaar oud en hield heel erg van lezen. Op woensdagmiddag ging hij naar de bibliotheek.

    Mevrouw Jansen werkte daar. Zij kende Daan heel goed. "Hallo Daan," zei zij. "Ik heb een nieuw spannend boek voor je."

    Daan koos vijf boeken uit. Dat avond las hij tot laat. Het boek was zo spannend dat hij het niet kon weglleggen.`,
    gradeLevel: 'group-3',
    difficulty: 'easy',
    topic: 'Vrijetijdsbesteding',
    estimatedTime: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [
      {
        id: 'q1',
        type: 'true-false',
        questionText: 'Daan ging elke dag naar de bibliotheek.',
        correctAnswer: 'false',
        explanation: 'Daan ging op woensdagmiddag naar de bibliotheek, niet elke dag.'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        questionText: 'Hoeveel boeken nam Daan mee naar huis?',
        options: [
          'Drie boeken',
          'Vier boeken',
          'Vijf boeken',
          'Zes boeken'
        ],
        correctAnswer: 'Vijf boeken',
        explanation: 'In de tekst staat: "Daan koos vijf boeken uit."'
      }
    ]
  },
  {
    id: '4',
    title: 'De School van Morgen',
    textPassage: `De school verandert snel. Niet meer alleen boeken en borden, maar computers en tablets zijn nu belangrijk in de klas.

    Leerlingen leren op hun eigen tempo. Sommigen werken sneller, anderen nemen meer tijd. De leraar helpt iedereen persoonlijk.

    Ook het samenwerkingen is belangrijk. Kinderen werken in groepjes aan projecten. Ze leren van elkaar.`,
    gradeLevel: 'group-5',
    difficulty: 'medium',
    topic: 'Onderwijs',
    estimatedTime: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        questionText: 'Wat zijn twee dingen die nu belangrijk zijn in de moderne klas?',
        options: [
          'Boeken en krijt',
          'Computers en tablets',
          'Papier en potloden',
          'Bordjes en krijtjes'
        ],
        correctAnswer: 'Computers en tablets',
        explanation: 'De tekst zegt: "computers en tablets zijn nu belangrijk in de klas."'
      }
    ]
  },
  {
    id: '5',
    title: 'Het Regenwoud in Gevaar',
    textPassage: `Het Amazoneregenwoud is het grootste regenbos ter wereld. Het huis duizenden diersoorten.

    Maar het regenwoud staat in gevaar. Mensen kappen bomen om hout en grond voor landbouw. Dit gebeurt snel en op grote schaal.

    De dieren verliezen hun thuis. Dit is slecht voor de hele wereld.`,
    gradeLevel: 'group-6',
    difficulty: 'medium',
    topic: 'Milieu',
    estimatedTime: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [
      {
        id: 'q1',
        type: 'true-false',
        questionText: 'Het regenwoud is alleen belangrijk voor de dieren die daar leven.',
        correctAnswer: 'false',
        explanation: 'De tekst zegt: "Dit is slecht voor de hele wereld."'
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

export function addExercise(exercise: Exercise): Exercise {
  exercises.push(exercise);
  return exercise;
}
