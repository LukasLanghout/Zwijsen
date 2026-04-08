import { ReadingComprehensionExercise } from './types';

export const sampleExercises: ReadingComprehensionExercise[] = [
  {
    id: '1',
    title: 'Het Vogelnestje',
    text: `Sanne zit op het balkon van haar huis. Ze kijkt naar de tuin beneden. Daar, tussen de bloemen, ziet ze iets bijzonders. Het is een klein vogelnestje! Er zitten drie jonge vogels in. Ze hebben gele snavel opengesperd.

"Mama, kom kijken!" roept Sanne.

Mama komt naar buiten. "O, wat mooi!" zegt ze. "Dat zijn jonge spreeuwen. We moeten voorzichtig zijn, anders vliegt de moeder weg."

Sanne zit heel stil. Ze wil de vogels niet bang maken. Plotseling hoort ze een geluid. Het is de moedervogel! Ze vliegt naar het nest en stopt iets in de bekjes van de jongen.

"Ze voert ze," fluistert Sanne. "Ze geeft hun eten!"

Dag na dag komen Sanne en haar mama kijken. Ze zien hoe de vogeltjes groeien. Na twee weken vliegen ze weg. Maar Sanne zal het vogelnestje nooit vergeten.`,
    grade: 'groep3',
    difficulty: 'easy',
    bloomLevel: 'understanding',
    wordCount: 185,
    readingTime: 2,
    questions: [
      {
        id: 'q1',
        question: 'Waar zit Sanne aan het begin van het verhaal?',
        questionType: 'multiple-choice',
        options: [
          'In haar kamer',
          'Op het balkon',
          'In de tuin',
          'Bij haar oma'
        ],
        correctAnswer: 'Op het balkon',
        bloomLevel: 'remembering'
      },
      {
        id: 'q2',
        question: 'Wat ziet Sanne in de tuin?',
        questionType: 'multiple-choice',
        options: [
          'Een kat',
          'Een konijn',
          'Een vogelnestje',
          'Een vlinder'
        ],
        correctAnswer: 'Een vogelnestje',
        bloomLevel: 'remembering'
      },
      {
        id: 'q3',
        question: 'Waarom moet Sanne voorzichtig zijn?',
        questionType: 'short-answer',
        correctAnswer: 'Omdat de moedervogel anders weg kan vliegen',
        bloomLevel: 'understanding'
      },
      {
        id: 'q4',
        question: 'Hoe lang duren de vogeltjes in het nest?',
        questionType: 'short-answer',
        correctAnswer: 'Twee weken',
        bloomLevel: 'remembering'
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'De Verloren Rugzak',
    text: `Tim loopt naar school. Hij is blij omdat het vandaag zijn verjaardag is. Zijn vriendin Lisa heeft gezegd dat ze een cadeau voor hem heeft.

Op school is er een feestje in de klas. De kinderen zingen "Lang zal hij leven" en eten cupcakes met kleurige glazuur. Lisa geeft Tim een mooi cadeau. "Dit is voor jou!" zegt ze. "Open het maar!"

Tim maakt het cadeau open. Het is een voetbaltje in zijn favoriete kleur, rood. "Bedankt!" roept hij blij uit.

Na school loopt Tim naar huis. Maar oh jee! Waar is zijn rugzak? Hij kan hem niet vinden. Tim zoekt overal. In de klas... niet daar. Op het speelplein... ook niet daar.

Tim voelt zich droevig. In zijn rugzak zaten zijn huiswerk en zijn nieuwe voetbaltje. Plotseling hoort hij iemand roepen. "Tim! Tim!" Het is Mevrouw Jansen, de conciërge. Ze houdt een rugzak omhoog.

"Is dit jouw rugzak?" vraagt ze.

"Ja! Dank u wel!" roept Tim blij. Zijn verjaardag is toch nog mooi geworden.`,
    grade: 'groep4',
    difficulty: 'easy',
    bloomLevel: 'understanding',
    wordCount: 220,
    readingTime: 3,
    questions: [
      {
        id: 'q1',
        question: 'Wat is speciaal op school voor Tim?',
        questionType: 'short-answer',
        correctAnswer: 'Het is zijn verjaardag',
        bloomLevel: 'remembering'
      },
      {
        id: 'q2',
        question: 'Wat zit in het cadeau van Lisa?',
        questionType: 'multiple-choice',
        options: [
          'Een boek',
          'Een voetbaltje',
          'Een potlood',
          'Een snoepje'
        ],
        correctAnswer: 'Een voetbaltje',
        bloomLevel: 'remembering'
      },
      {
        id: 'q3',
        question: 'Waarom voelt Tim zich droevig?',
        questionType: 'short-answer',
        correctAnswer: 'Omdat hij zijn rugzak niet kan vinden',
        bloomLevel: 'understanding'
      },
      {
        id: 'q4',
        question: 'Wie helpt Tim zijn rugzak terug te vinden?',
        questionType: 'multiple-choice',
        options: [
          'Lisa',
          'De juf',
          'Mevrouw Jansen',
          'Zijn moeder'
        ],
        correctAnswer: 'Mevrouw Jansen',
        bloomLevel: 'remembering'
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'De Geheime Schatkamer',
    text: `Sara en Bram zijn broer en zus. Ze spelen in de oude zolder van opa en oma. De zolder is stoffig en vol met oude dingen.

"Kijk!" roept Bram. "Een oude houten kist!"

De kist is heel oud en met stof bedekt. Sara helpt mee. Ze tillen het deksel op. Wat zien ze! De kist zit vol met oude brieven, fotos en munten. En daar, in een klein doosje, zit een gouden sleutel!

"Waarvan is die sleutel?" vraagt Sara.

Ze gaan naar opa en oma. "Opa, wat is dit?" Ze laten hem de sleutel.

Opa's gezicht wordt ineens ernstig. "Dat is niet zomaar een sleutel," zegt hij langzaam. "Die sleutel hoort bij een oude kluis. Mijn vader heeft geld en goud opgeslagen in de muur van dit huis!"

"Waar is die kluis?" vragen Sara en Bram tegelijk.

"In de kamer hieronder, achter het behang," antwoordt opa. Ze gaan allemaal naar beneden. Met voorzichtig werk verwijderen ze stukken behang. Daar, achter een laag stenen, is de kluis!

De sleutel past precies! Ze openen de deur. Er liggen oude gouden munten en bankbiljetten van lang geleden. Sara en Bram voelen zich als echte schatzoeker!`,
    grade: 'groep5',
    difficulty: 'medium',
    bloomLevel: 'analyzing',
    wordCount: 280,
    readingTime: 4,
    questions: [
      {
        id: 'q1',
        question: 'Waar spelen Sara en Bram?',
        questionType: 'multiple-choice',
        options: [
          'In de tuin',
          'In het bos',
          'Op de zolder',
          'In het park'
        ],
        correctAnswer: 'Op de zolder',
        bloomLevel: 'remembering'
      },
      {
        id: 'q2',
        question: 'Wat zit er in de oude houten kist?',
        questionType: 'short-answer',
        correctAnswer: 'Oude brieven, fotos, munten en een gouden sleutel',
        bloomLevel: 'remembering'
      },
      {
        id: 'q3',
        question: 'Waarom was de sleutel belangrijk voor opa?',
        questionType: 'short-answer',
        correctAnswer: 'Omdat die hoort bij een oude kluis waarin zijn vader geld en goud had opgeslagen',
        bloomLevel: 'understanding'
      },
      {
        id: 'q4',
        question: 'Hoe voelden Sara en Bram zich toen ze de kluis vonden?',
        questionType: 'essay',
        correctAnswer: 'Ze voelden zich als echte schatzoeker',
        bloomLevel: 'analyzing'
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
