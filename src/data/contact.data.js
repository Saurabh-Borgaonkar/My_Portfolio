/**
 * Contact Data
 * ------------
 * Contact information and form configuration.
 * Note: Phone number is explicitly NOT displayed publicly to preserve privacy.
 * Email is accessed via user actions rather than prominent plain text.
 */

export const contactData = {
  headline: "LET'S BUILD SOMETHING.",
  subheading: 'Have an opportunity, project, or idea? Let\'s connect.',
  email: 'saurabhborgaonkar55@gmail.com',
  resume: {
    downloadUrl: '/resume/saurabh-resume.pdf?v=20261125',
    filename: 'Saurabh_Borgaonkar_Resume.pdf',
  },
  socials: [
    {
      id: 'social-github',
      name: 'GitHub',
      label: 'GitHub',
      url: 'https://github.com/Saurabh-Borgaonkar',
      username: 'Saurabh-Borgaonkar',
      icon: 'Github',
    },
    {
      id: 'social-linkedin',
      name: 'LinkedIn',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/saurabh-borgaonkar-4802432a6/',
      username: 'saurabh-borgaonkar',
      icon: 'Linkedin',
    },
  ],
  formFields: [
    {
      id: 'field-name',
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      required: true,
      minLength: 2,
    },
    {
      id: 'field-email',
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'name@example.com',
      required: true,
    },
    {
      id: 'field-subject',
      name: 'subject',
      label: 'Subject',
      type: 'text',
      placeholder: 'Opportunity / Project discussion',
      required: true,
      minLength: 3,
    },
    {
      id: 'field-message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Tell me about the role, project, or collaboration...',
      required: true,
      minLength: 10,
      rows: 5,
    },
  ],
}
