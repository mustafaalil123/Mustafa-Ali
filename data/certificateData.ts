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
      'Completed a comprehensive JavaScript program that included multiple hands-on projects, practical exercises, and real implementation tasks. Developed confidence in building core features from scratch through consistent coding practice.',
      'Deepened knowledge of design patterns, garbage collection, memory leaks, concurrency architecture, event loop cycles and runtime performance tuning.',
      'Gained experience with automated testing, debugging pipelines, CI ready deployments and code quality best practices.',
      'Explored deep technical topics such as object creation patterns, memory profiling, garbage collection, concurrency architecture, microtask and macrotask queues, and event loop optimization. Achieved a clear mental model of JavaScript internals.'
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
      'Completed an in-depth JavaScript specialization centered on production-grade, hands-on projects.',
      'Strengthened expertise in automated testing, runtime performance optimization and modern deployment pipelines.',
    'Studied advanced concepts such as design patterns, memory profiling, concurrency and event loop mechanics.',
  'Gained proficiency in automated testing strategies, debugging pipelines, performance profiling, and deployment workflows. Learned how to evaluate code health, eliminate inefficiencies, and prepare applications for real-world environments.'  
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
  },{
    title: 'Information Security',
    role: 'BSI',
    period: '2025',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/BSI-logo-charcoal.png',
    skills: ['Information Security'],
   points: [
"Protecting the confidentiality, integrity, and availability of information",
"Managing risks related to information: identifying threats, vulnerabilities, potential impacts, and controlling/mitigating those risks.",
"Establishing policies, procedures and controls so that information assets (data, systems, processes) are managed and secured.",
"Ensuring legal, regulatory and contractual obligations are met (for data protection, privacy, third-party obligations)."
],
    link:"https://media.licdn.com/dms/image/v2/D4D22AQHJLkVs3zxMlA/feedshare-shrink_1280/B4DZjL1BuQHsA0-/0/1755766334759?e=1765411200&v=beta&t=KSo98ALIA7XA2Ug6FbiQvBtNnnXa5j_NWC8jEGEMcD8"
  },
];
