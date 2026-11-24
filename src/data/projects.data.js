/**
 * Projects Data
 * -------------
 * The two verified featured projects: DevPilot AI and Learning Management System.
 * Strict rules: Only these two projects are showcased; no extra projects or unverified features.
 */

export const projectsData = [
  {
    id: 'proj-devpilot-ai',
    title: 'DevPilot AI',
    slug: 'devpilot-ai',
    route: '/projects/devpilot-ai',
    tagline: 'AI-Powered Developer Assistant',
    description:
      'AI-powered developer assistant for code suggestions, debugging, and programming assistance.',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'AI API Integration',
    ],
    links: {
      github: 'https://github.com/Saurabh-Borgaonkar/DevPilotAi_Assistant',
      liveDemo: 'https://project-skitm.onrender.com/',
    },
    images: {
      preview: '/images/projects/devpilot-preview.svg',
      screenshots: [],
    },
    details: {
      overview:
        'DevPilot AI is an AI-powered developer assistant engineered to deliver context-aware code suggestions, debugging workflows, and active programming assistance.',
      problemAddressed:
        'Developers frequently lose engineering velocity jumping between editors, documentation, and error logs to resolve repetitive syntax hurdles and bugs.',
      keyFeatures: [
        'AI-assisted code suggestion generation for multiple programming scenarios',
        'Debugging support with error explanation and corrective guidance',
        'Interactive developer chat interface with streamlined query flow',
        'Node.js and Express.js backend services handling AI API request orchestration',
        'MongoDB data layer for storing chat sessions and queries',
      ],
      technicalContributions: [
        'Engineered the backend server with Node.js and Express.js.',
        'Integrated third-party AI APIs to generate relevant developer responses.',
        'Designed database schemas using MongoDB for persistent conversation storage.',
        'Built responsive client UI using HTML, CSS, and vanilla JavaScript.',
      ],
    },
  },
  {
    id: 'proj-lms',
    title: 'Learning Management System',
    slug: 'learning-management-system',
    route: '/projects/learning-management-system',
    tagline: 'MERN-Based Course Access Platform',
    description:
      'MERN-based learning platform that allows students to access courses.',
    technologies: [
      'React',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
    ],
    links: {
      github: 'https://github.com/Saurabh-Borgaonkar/Digital_learning_platform',
      liveDemo: null, // No live demo available
    },
    images: {
      preview: '/images/projects/lms-preview.svg',
      screenshots: [],
    },
    details: {
      overview:
        'A comprehensive digital learning management platform built on the MERN stack designed to provide students with structured access to online courses.',
      problemAddressed:
        'Providing learners with an organized, responsive environment to explore and consume learning content seamlessly.',
      keyFeatures: [
        'Structured course browsing and access interface',
        'RESTful API backend for user accounts and course data retrieval',
        'Schema definitions and data modeling with Mongoose and MongoDB',
        'Component-driven frontend built with React and modern JavaScript',
      ],
      technicalContributions: [
        'Developed interactive user interfaces using React components and hooks.',
        'Implemented REST API endpoints in Node.js and Express.js.',
        'Configured MongoDB database collections and Mongoose models.',
        'Structured client-server communication with clean error handling.',
      ],
    },
  },
  {
    id: 'proj-hotel-evento',
    title: 'Hotel Evento',
    slug: 'hotel-evento',
    route: '/projects/hotel-evento',
    tagline: 'Hospitality & Event Services Showcase',
    description:
      'Hotel website showcasing accommodation, dining, facilities, and event-related services.',
    technologies: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'HTML',
      'CSS',
    ],
    links: {
      github: 'https://github.com/Saurabh-Borgaonkar/hotel-management',
      liveDemo: 'https://hotel-evento.vercel.app/',
    },
    images: {
      preview: '/images/projects/hotel-evento-preview.svg',
      screenshots: [],
    },
    details: {
      overview:
        'Hotel Evento is a modern, responsive hospitality web application showcasing luxury accommodation, dining options, event venues, and guest amenities.',
      problemAddressed:
        'Delivering a fast, visually appealing digital storefront that presents hotel accommodations and venue spaces effectively across all device viewports.',
      keyFeatures: [
        'Immersive showcase for guest rooms, dining spaces, and banquet halls',
        'Modern responsive UI with Tailwind CSS utility classes and clean layout structures',
        'Modular React component hierarchy for amenities and venue cards',
        'Optimized client performance deployed on Vercel',
      ],
      technicalContributions: [
        'Constructed the responsive frontend using React and Tailwind CSS.',
        'Designed modular components for accommodation listings and service highlights.',
        'Ensured mobile-friendly responsive navigation and layout across varying screen sizes.',
        'Configured production deployment on Vercel with fast asset delivery.',
      ],
    },
  },
]
