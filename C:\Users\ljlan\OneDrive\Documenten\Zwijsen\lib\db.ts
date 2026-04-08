import { Exercise, GradeLevel } from './types';

// In-memory database met sample oefeningen voor Begrijpend Lezen
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
        explanation: 'Het konijn was eerst snel en energiek. Hij werd pas moe nadat hij veel had gelopen en ging slapen.'
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
      },
      {
        id: 'q3',
        type: 'fill-blank',
        questionText: 'Het konijn leerde dat _____ belangrijker is dan alleen snel zijn.',
        correctAnswer: 'hard werken',
        hints: ['Wat leerde het konijn?', 'Iets wat je moet doen om te slagen']
      }
    ]
  },
  {
    id: '2',
    title: 'De Zwaluwen en de Zomer',
    textPassage: `In het voorjaar kwamen de zwaluwen terug van het zuiden. Ze bouwden hun nesten onder de dakrand van een boerderij.
    De boer keek toe en voelde zich blij. "De zwaluwen brengen de lente," zei hij tegen zijn vrouw.

    De hele zomer vlogen de zwaluwen rond en aten veel insecten. Ze maakten veel lawaai en veel werk om hun nesten proper te houden.
    Sommige vogels floten hun mooie liedjes. De boer en zijn vrouw genoten ervan.

    In de herfst vlogen de zwaluwen allemaal weg naar het zuiden. De boer miste ze, maar hij wist dat ze terug zouden komen volgende lente.`,
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
        explanation: 'De tekst zegt duidelijk: "Ze bouwden hun nesten onder de dakrand van een boerderij."'
      },
      {
        id: 'q2',
        type: 'fill-blank',
        questionText: 'De zwaluwen vlogen in _____ allemaal weg naar het zuiden.',
        correctAnswer: 'herfst',
        hints: ['Welk seizoen?', 'Na de zomer']
      },
      {
        id: 'q3',
        type: 'true-false',
        questionText: 'De boer was blij met de komst van de zwaluwen.',
        correctAnswer: 'true',
        explanation: 'De boer zei: "De zwaluwen brengen de lente" en "genoten ervan".'
      }
    ]
  },
  {
    id: '3',
    title: 'Daan gaat naar de Bibliotheek',
    textPassage: `Daan was negen jaar oud en hield heel erg van lezen. Op woensdagmiddag ging hij naar de bibliotheek in zijn dorp.

    Mevrouw Jansen werkte daar. Zij kende Daan heel goed omdat hij elke week kwam. "Hallo Daan," zei zij. "Ik heb een nieuw spannend boek voor je."

    Daan koos vijf boeken uit. Hij nam ze mee naar huis in zijn rugzak. Die avond las hij al tot laat. Het boek was zo spannend dat hij het niet kon weglleggen.

    De volgende week bracht hij alle boeken terug en haalde er vijf nieuwe. Dit was zijn favoriete ritueel.`,
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
        explanation: 'Daan ging op woensdagmiddag en elke week naar de bibliotheek, niet elke dag.'
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
      },
      {
        id: 'q3',
        type: 'fill-blank',
        questionText: 'Mevrouw Jansen kende Daan goed omdat hij elke _____ kwam.',
        correctAnswer: 'week',
        hints: ['Hoe vaak?', 'Zeven dagen']
      }
    ]
  },
  {
    id: '4',
    title: 'De School van Morgen',
    textPassage: `De school verandert snel. Niet meer alleen boeken en borden, maar computers en tablets zijn nu belangrijk in de klas.

    Leerlingen leren op hun eigen tempo. Sommigen werken sneller, anderen nemen meer tijd. De leraar helpt iedereen persoonlijk.

    Ook het samenwerkingen is belangrijk. Kinderen werken in groepjes aan projecten. Ze leren van elkaar en delen ideeën.

    Thuis hebben leerlingen ook online toegang tot hun werk. Ze kunnen oefeningen maken wanneer zij willen, niet alleen op school.

    Dit maakt leren flexibeler en interessanter voor alle kinderen.`,
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
        explanation: 'De tekst zegt: "Niet meer alleen boeken en borden, maar computers en tablets zijn nu belangrijk in de klas."'
      },
      {
        id: 'q2',
        type: 'true-false',
        questionText: 'Alle leerlingen werken in dezelfde snelheid.',
        correctAnswer: 'false',
        explanation: 'De tekst zegt: "Leerlingen leren op hun eigen tempo. Sommigen werken sneller, anderen nemen meer tijd."'
      },
      {
        id: 'q3',
        type: 'fill-blank',
        questionText: 'Thuis hebben leerlingen ook _____ toegang tot hun werk.',
        correctAnswer: 'online',
        hints: ['Via internet', 'Via computer']
      }
    ]
  },
  {
    id: '5',
    title: 'Het Regenwoud in Gevaar',
    textPassage: `Het Amazoneregenwoud is het grootste regenbos ter wereld. Het huis duizenden diersoorten en miljoen verschillende planten.

    Maar het regenwoud staat in gevaar. Mensen kappen bomen om hout en grond voor landbouw. Dit gebeurt snel en op grote schaal.

    De dieren verliezen hun thuis. De bomen die zuurstof geven, worden minder. Dit is slecht voor de hele wereld, niet alleen voor de dieren.

    Veel mensen werken hard om het regenwoud te redden. Ze maken wetten om bomen te beschermen. Ook jij kunt helpen door papier te besparen en dingen opnieuw te gebruiken.`,
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
        explanation: 'De tekst zegt: "Dit is slecht voor de hele wereld, niet alleen voor de dieren."'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        questionText: 'Wat is een reden waarom het regenwoud wordt gekapt?',
        options: [
          'Voor sport',
          'Voor hout en grond voor landbouw',
          'Voor toerisme',
          'Voor wetenschap'
        ],
        correctAnswer: 'Voor hout en grond voor landbouw',
        explanation: 'In de tekst staat: "Mensen kappen bomen om hout en grond voor landbouw."'
      },
      {
        id: 'q3',
        type: 'open-question',
        questionText: 'Noem twee manieren waarop jij het regenwoud kunt helpen redden.',
        correctAnswer: 'Papier besparen en dingen opnieuw gebruiken',
        explanation: 'De tekst noemt: "papier te besparen en dingen opnieuw te gebruiken".'
      }
    ]
  }
];

// Helper functions
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
  const grades: Record<GradeLevel, number> = {
    'group-3': 0,
    'group-4': 0,
    'group-5': 0,
    'group-6': 0,
    'group-7': 0,
    'group-8': 0
  };

  exercises.forEach(e => {
    grades[e.gradeLevel]++;
  });

  return {
    totalExercises: exercises.length,
    exercisesByGrade: grades,
    topics: [...new Set(exercises.map(e => e.topic))]
  };
}
