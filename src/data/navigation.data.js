/**
 * Navigation Data
 * ---------------
 * Central route definitions and navigation links for navbar, mobile drawer, and footer.
 */

export const navLinks = [
  {
    id: 'nav-home',
    label: 'Home',
    href: '/#hero',
    sectionId: 'hero',
  },
  {
    id: 'nav-about',
    label: 'About',
    href: '/#about',
    sectionId: 'about',
  },
  {
    id: 'nav-experience',
    label: 'Experience',
    href: '/#experience',
    sectionId: 'experience',
  },
  {
    id: 'nav-projects',
    label: 'Projects',
    href: '/#projects',
    sectionId: 'projects',
  },
  {
    id: 'nav-problem-solving',
    label: 'Problem Solving',
    href: '/#problem-solving',
    sectionId: 'problem-solving',
  },
  {
    id: 'nav-education',
    label: 'Education',
    href: '/#education',
    sectionId: 'education',
  },
  {
    id: 'nav-contact',
    label: 'Contact',
    href: '/#contact',
    sectionId: 'contact',
  },
]

export const projectRoutes = [
  {
    slug: 'devpilot-ai',
    path: '/projects/devpilot-ai',
    title: 'DevPilot AI',
  },
  {
    slug: 'learning-management-system',
    path: '/projects/learning-management-system',
    title: 'Learning Management System',
  },
  {
    slug: 'hotel-evento',
    path: '/projects/hotel-evento',
    title: 'Hotel Evento',
  },
]

export const siteRoutes = {
  home: '/',
  devpilotAi: '/projects/devpilot-ai',
  learningManagementSystem: '/projects/learning-management-system',
  hotelEvento: '/projects/hotel-evento',
  admin: '/admin', // Reserved for Phase 3
}
