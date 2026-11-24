/**
 * Portfolio Service Layer
 * -----------------------
 * Central abstraction layer for retrieving all portfolio content.
 *
 * Architecture rationale:
 *  - Currently returns local structured data from `/src/data/`.
 *  - In Phase 4/5 (Backend Integration), the implementations in this file
 *    can be pointed to REST API endpoints (e.g. `fetch('/api/projects')`)
 *    without modifying any presentation components or page views.
 */

import { profileData } from '../data/profile.data.js'
import { skillsData } from '../data/skills.data.js'
import { experienceData } from '../data/experience.data.js'
import { projectsData } from '../data/projects.data.js'
import { educationData } from '../data/education.data.js'
import { certificationsData } from '../data/certifications.data.js'
import { achievementsData } from '../data/achievements.data.js'
import { navLinks, projectRoutes, siteRoutes } from '../data/navigation.data.js'
import { contactData } from '../data/contact.data.js'

/**
 * Retrieves profile and hero section information.
 * @returns {typeof profileData}
 */
export function getProfile() {
  return profileData
}

/**
 * Retrieves categorized technical skills.
 * @returns {typeof skillsData}
 */
export function getSkills() {
  return skillsData
}

/**
 * Retrieves work experience timeline entries.
 * @returns {typeof experienceData}
 */
export function getExperience() {
  return experienceData
}

/**
 * Retrieves all featured projects.
 * @returns {typeof projectsData}
 */
export function getProjects() {
  return projectsData
}

/**
 * Retrieves an individual project by its URL slug.
 * @param {string} slug - Project URL slug (e.g. 'devpilot-ai', 'learning-management-system')
 * @returns {typeof projectsData[0] | null}
 */
export function getProjectBySlug(slug) {
  if (!slug) return null
  return projectsData.find((project) => project.slug === slug) || null
}

/**
 * Retrieves academic education records.
 * @returns {typeof educationData}
 */
export function getEducation() {
  return educationData
}

/**
 * Retrieves professional certifications.
 * @returns {typeof certificationsData}
 */
export function getCertifications() {
  return certificationsData
}

/**
 * Retrieves problem-solving and competitive programming achievements.
 * @returns {typeof achievementsData}
 */
export function getAchievements() {
  return achievementsData
}

/**
 * Retrieves navigation data including navbar links and project routes.
 * @returns {{ links: typeof navLinks, projectRoutes: typeof projectRoutes, siteRoutes: typeof siteRoutes }}
 */
export function getNavigation() {
  return {
    links: navLinks,
    projectRoutes,
    siteRoutes,
  }
}

/**
 * Retrieves contact section data, social links, and form field schema.
 * @returns {typeof contactData}
 */
export function getContactInfo() {
  return contactData
}

export default {
  getProfile,
  getSkills,
  getExperience,
  getProjects,
  getProjectBySlug,
  getEducation,
  getCertifications,
  getAchievements,
  getNavigation,
  getContactInfo,
}
