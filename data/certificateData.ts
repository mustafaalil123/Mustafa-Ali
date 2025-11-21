// data/certificateData.ts

export interface CardData {
  title: string;
  role: string;          // Issued by
  skills: string[];
  period: string;
  logo: string;
  alt?: string;
  link:string;
  points?: string[];
}

export const certifications: CardData[] = [
  {
    title: 'JavaScript',
    role: 'Hacker Rank',
    period: '2024',
    logo: '/assets/images/Certificate/hk.jpg',
    skills: [ 'JavaScript'],
    points: [
      'Completed JavaScript with hands on projects.',
      'covers topics like Design Patterns, Memory management, concurrency model, and event loops, among others.',
      'Learned testing, performance and deployment basics.'
    ],
    link:"https://www.hackerrank.com/certificates/31bd8885acbb"
  },
   {
    title: 'JavaScript Specialist ',
    role: 'Hacker Rank',
    period: '2024',
    logo: '/assets/images/Certificate/hk.jpg',
    skills: [ 'JavaScript'],
    points: [
      'Completed JavaScript with hands on projects.',
      'Learned testing, performance and deployment basics.',
      'It covers topics like Design Patterns, Memory management, concurrency model, and event loops, among others.'
    ],
    link:"https://www.hackerrank.com/certificates/31bd8885acbb"
  },
  {
    title: 'Introduction to Game Development',
    role: 'Coursera',
    period: '2020',
    logo: '/assets/images/Certificate/c.jpg',
    skills: ['Game Developer'],
   points: [
  "Learned core game development concepts including game loop, physics, input handling and event systems.",
  "Designed and built playable 2D games using structured programming and object oriented patterns.",
  "Implemented player movement, collision detection and basic AI behaviors.",
  "Worked with sprites, animations, sound effects and game assets to enhance gameplay experience.",
  "Completed multiple hands on projects demonstrating full game creation from idea to final build."
],
    link:"https://www.coursera.org/account/accomplishments/certificate/QKCMM6ALUNJ8"
  }
];
