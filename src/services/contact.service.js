/**
 * Contact Service Layer
 * ---------------------
 * Dedicated abstraction layer for contact message submission.
 *
 * Current Phase: Frontend Development & Form Validation
 * Future Phase: Integrated with Express.js backend at POST /api/contact
 *
 * Rules:
 *  - Do NOT fake or pretend message was sent when no backend exists.
 *  - Do NOT use third-party services like EmailJS or Formspree.
 *  - Return structured response status for UI feedback.
 */

const CONTACT_API_ENDPOINT = '/api/contact'

/**
 * Submits contact form payload.
 *
 * @param {Object} payload
 * @param {string} payload.name
 * @param {string} payload.email
 * @param {string} payload.subject
 * @param {string} payload.message
 * @returns {Promise<{ success: boolean, status: 'sent' | 'unconnected' | 'error', message: string }>}
 */
export async function sendContactMessage(payload) {
  try {
    const response = await fetch(CONTACT_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      const data = await response.json()
      return {
        success: true,
        status: 'sent',
        message: data.message || 'Your message has been received! I will get back to you soon.',
      }
    }

    if (response.status === 404 || response.status === 501) {
      return {
        success: false,
        status: 'unconnected',
        message:
          'Backend submission service is currently offline. Please reach out directly at saurabhborgaonkar55@gmail.com.',
      }
    }

    const errData = await response.json().catch(() => ({}))
    return {
      success: false,
      status: 'error',
      message: errData.message || 'Unable to submit your message at this time.',
    }
  } catch {
    // Network / offline error when POST /api/contact is not mounted yet
    return {
      success: false,
      status: 'unconnected',
      message:
        'The backend message API (POST /api/contact) is not yet active. Please connect with me directly via email at saurabhborgaonkar55@gmail.com or on LinkedIn.',
    }
  }
}
