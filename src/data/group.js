// ✏️ EDIT ME — group page: current students, alumni, prospective-student info.

export const CURRENT_STUDENTS = [
  {
    name: 'Chen Zhang',
    role: "Master's Student",
    topic: 'Aesthetic understanding and agentic image refinement in large multimodal models',
    photo: null,
    links: [],
  },
  {
    name: 'Ziyi Wang',
    role: "Master's Student",
    topic: 'Agentic reasoning of large language models in game-based environments',
    photo: null,
    links: [{ l: 'GitHub', h: 'https://github.com/Einsam1819' }],
  },
  {
    name: 'Zhen Huang',
    role: "Master's Student",
    topic: 'Geography-augmented reasoning in large language models',
    photo: null,
    links: [],
  },
  {
    name: 'Simeng Chen',
    role: "Master's Student",
    topic: 'Personality modeling in large language models',
    photo: null,
    links: [],
  },
  {
    name: 'Wenjun Peng',
    role: 'Research Intern',
    topic: 'Coding agents in game-based environments',
    photo: null,
    links: [],
  },
];

// Rendered newest-first — the Group page sorts this list by `year` descending.
export const ALUMNI = [
  {
    name: 'Yixin Wang',
    role: "Master's Research Project (2025)",
    year: 2025,
    topic: 'Agentic vision-language models',
    now: null,
    achievements: [],
  },
  {
    name: 'Jing Zhe Lim',
    role: 'Undergraduate Research Project (2025)',
    year: 2025,
    topic: 'Large language model agents for poker',
    now: null,
    achievements: [],
  },
  {
    name: 'Yiheng Chi',
    role: 'Honours Student (2025–2026)',
    year: 2026,
    topic: 'Low-rank adaptation for LLM personalization',
    now: 'MSc student at the University of Oxford',
    achievements: [],
  },
  {
    name: 'Yen-Shuen Huang',
    role: 'Honours Student (2025–2026)',
    year: 2026,
    topic: 'Personalized LLM-based recommender systems',
    now: null,
    achievements: [],
  },
];

export const PROSPECTIVE = {
  intro:
    'I am actively looking for motivated PhD and MPhil students to join my group. ' +
    'If you are interested in working on problems in multimodal machine learning and ' +
    'large multimodal models, I would love to hear from you.',
  requirements: [
    'Strong mathematical foundations and programming skills (Python)',
    'Prior research experience or publications are a plus',
    'Genuine curiosity about language, vision, and intelligence',
    'Fluency in English (academic reading and writing)',
  ],
  scholarship: {
    body:
      'PhD scholarships at Adelaide University are extremely competitive. ' +
      'Strong applicants typically have:',
    items: [
      'A consistently high GPA / academic ranking',
      'Publications at reputable venues',
      'A prior degree from a university with a strong QS ranking',
    ],
    link: 'https://adelaide.edu.au/research/research-degrees/research-scholarships/',
  },
  adelaide: {
    label: 'Adelaide University Students',
    body:
      'For Adelaide University students who wish to undertake a research project with me, ' +
      'you must satisfy the following requirements:',
    requirements: [
      'High GPA (≥ 6.9/7.0)',
      'Strong proficiency in Python and PyTorch',
      'Have completed courses related to Deep Learning, Computer Vision, or Natural Language Processing',
      'Self-directed and able to work independently',
    ],
    emailItems: [
      'Your latest CV',
      'Your academic transcript',
      'A one-page (A4) research statement describing a research problem you would like to work on with me. ' +
        'The statement should include at least the background, motivation, challenges, your intended methods ' +
        'to address the problem, and relevant references.',
    ],
    note:
      'Due to the high volume of emails I receive, I may only be able to respond to applicants who meet ' +
      'the above requirements.',
  },
};
