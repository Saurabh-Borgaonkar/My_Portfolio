/**
 * Certifications Data
 * -------------------
 * Scalable data architecture for verified technical certifications.
 *
 * Requirements Met:
 *  - Unique ID
 *  - Title
 *  - Issuing Organization
 *  - Issue Date
 *  - Certificate Image Path (local image asset from user upload)
 *  - Optional Credential URL
 *  - Extensible: additional certificates can be added cleanly without UI changes.
 */

export const certificationsData = [
  {
    id: 'cert-codingblocks-fullstack',
    title: 'Full Stack Development',
    issuer: 'Coding Blocks & Sunstone',
    issueDate: 'July–August 2026',
    period: 'Summer 2026',
    description:
      'Summer Training Program in Full Stack Development conducted in collaboration with Coding Blocks.',
    image: '/certificates/coding-blocks-certificate.png',
    credentialUrl: null, // Optional credential verification link
    featured: true,
  },
  {
    id: 'cert-udemy-fullstack',
    title: 'Full Stack Web Development',
    issuer: 'Udemy',
    issueDate: 'January 2026',
    period: 'January 2026',
    description:
      'Comprehensive hands-on curriculum covering modern frontend and backend web development engineering.',
    image: null, // Gracefully handled with polished placeholder until digital copy is uploaded
    credentialUrl: null,
    featured: true,
  },
  {
    id: 'cert-ieee-debugging',
    title: 'Debugging Competition',
    issuer: 'SUI-IEEE Student Branch',
    issueDate: 'September 2024',
    period: 'September 2024',
    description:
      'Recognized for exceptional contribution and algorithmic problem solving in the SUI-IEEE Debugging Competition.',
    image: '/certificates/ieee-debugging-certificate.jpg',
    credentialUrl: null,
    featured: false,
  },
  {
    id: 'cert-gdg-genai',
    title: 'Gen AI Study Jam',
    issuer: 'Google Developer Groups (GDG)',
    issueDate: 'November 2024',
    period: 'November 2024',
    description:
      'Completed practical tracks in Google Cloud services and generative AI applications.',
    image: '/certificates/gdg-genai-certificate.jpg',
    credentialUrl: null,
    featured: false,
  },
  {
    id: 'cert-letsupgrade-htmlcss',
    title: 'HTML & CSS Bootcamp',
    issuer: 'LetsUpgrade & NSDC',
    issueDate: 'March 2025',
    period: 'March 2025',
    description:
      'Comprehensive training in responsive web layout, semantics, and CSS architecture.',
    image: '/certificates/letsupgrade-htmlcss-certificate.jpg',
    credentialUrl: null,
    featured: false,
  },
]
