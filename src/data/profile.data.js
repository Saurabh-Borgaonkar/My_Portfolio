/**
 * Profile Data
 * ------------
 * Core identity, hero metadata, About section bio, and top-level statistics.
 * Phone number is intentionally omitted to maintain privacy.
 */

export const profileData = {
  name: 'Saurabh Borgaonkar',
  role: 'Full Stack Developer',
  specialization: 'Backend Specialization',
  headline: 'ENGINEERING THE BACKEND.',
  heroDescription:
    'Full Stack Developer specializing in backend engineering, API development and reliable web applications.',
  aboutBio:
    "I'm Saurabh Borgaonkar, a Full Stack Developer with a strong interest in backend engineering and building reliable web applications. I have hands-on experience developing REST APIs, implementing authentication and authorization, and working with Node.js, Express.js, NestJS, MongoDB and Prisma ORM. I also work with React to build responsive user interfaces. I enjoy solving programming challenges and have solved 250+ problems on LeetCode.",
  status: {
    availableForHire: true,
    label: 'Open to Work',
  },
  details: {
    primaryFocus: 'Backend & Web Applications',
    graduationYear: '2027',
    graduationLabel: 'Class of 2027',
    location: 'India',
  },
  philosophy: {
    title: 'Engineering Philosophy',
    description:
      'Focused on writing clean code, building reliable APIs with proper authentication and error handling, designing clean database schemas, and solving core algorithmic problems.',
  },
  stats: [
    {
      id: 'stat-leetcode',
      value: '250+',
      label: 'LeetCode Problems Solved',
      numeric: 250,
    },
    {
      id: 'stat-internships',
      value: '2',
      label: 'Internship Experiences',
      numeric: 2,
    },
    {
      id: 'stat-graduation',
      value: '2027',
      label: 'Graduation Year',
      numeric: 2027,
    },
  ],
  portrait: {
    src: '/images/profile/saurabh-cutout.png',
    fallbackSrc: '/images/profile/portrait.png',
    alt: 'Saurabh Borgaonkar — Full Stack Developer',
  },
  resume: {
    downloadUrl: '/resume/saurabh-resume.pdf?v=20261125',
    filename: 'Saurabh_Borgaonkar_Resume.pdf',
  },
}
