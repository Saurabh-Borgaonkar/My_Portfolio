# SAURABH — Personal Portfolio
## Final Master Project Specification

**Owner:** Saurabh Borgaonkar
**Project:** Recruiter-focused developer portfolio
**Primary identity:** Full Stack Developer with Backend Specialization
**Current phase:** Planning completed — frontend implementation next.

---

## 1. Project Vision

Build a premium, cinematic, interactive personal portfolio that showcases professional experience, technical skills, projects and problem-solving ability.

The portfolio must:

- Impress recruiters and hiring managers.
- Highlight backend development capabilities.
- Present real projects and internship experience.
- Provide access to the resume and professional profiles.
- Work smoothly on desktop, tablet and mobile.
- Support a future admin dashboard for managing all portfolio content.

> [!IMPORTANT]
> Build the public portfolio first. Add the backend and admin dashboard in later phases without rebuilding the frontend.

---

## 2. Design System

### Visual identity

- Premium professional design.
- Luxury dark editorial direction.
- Typography-dominant composition.
- Cinematic animations.
- Controlled 3D elements.
- Minimal, clean and readable layouts.

### Color palette

| Purpose        | Color                    |
| -------------- | ------------------------ |
| Background     | Obsidian Black `#101010` |
| Cards          | Charcoal `#1B1B1B`       |
| Accent         | Emerald Green `#10B981`  |
| Main text      | Off White `#F5F5F5`      |
| Secondary text | Muted Grey `#A3A3A3`     |
| Borders        | `#303030`                |

### Typography

- **Space Grotesk** — headlines and section titles.
- **JetBrains Mono** — technical labels and metadata.

---

## 3. Hero Section

**Headline:** `ENGINEERING THE BACKEND.`

**Supporting text:** Full Stack Developer specializing in backend engineering, API development and reliable web applications.

### Visual composition

- Oversized typography.
- Personal portrait overlapping the headline.
- Dark cinematic background.
- Abstract 3D geometric structure.
- Monochrome-to-natural-color portrait transition.
- Subtle emerald lighting.

### Opening animation

- Approximately 5–7 seconds.
- Cinematic name and portrait reveal.
- Skip Intro option.
- Reduced-motion support.

### 3D interactions

- Mouse-responsive movement.
- Scroll-responsive transformations.
- Slow geometric rotation.
- Mobile-friendly fallback.

### CTA buttons

- Explore My Work
- Download Resume

### Statistics

- 250+ LeetCode problems solved.
- 2 internship experiences.
- 2027 graduation year.

---

## 4. About Section

**Layout:** Developer Profile.

Include:

- Professional introduction.
- B.Tech Computer Science background.
- Full-stack development experience.
- Backend specialization.
- Technical highlights.

### Technology cards

- Frontend
- Backend
- Databases
- Programming Languages
- Tools and ORM

> [!NOTE]
> Do not display invented proficiency percentages.

---

## 5. Work Experience

**Layout:** Animated vertical timeline.

### Experience 1

**Node.js Intern — Codes For Tomorrow**
October 2026 – Present

Technologies: TypeScript, Node.js, NestJS, Prisma ORM, REST APIs, JWT Authentication, Git and GitHub.

### Experience 2

**MERN Stack Developer Intern — ACT T Connect Pvt. Ltd.**
July 2026 – August 2026

Technologies: JavaScript, Node.js, Express.js, MongoDB, Mongoose, REST APIs, JWT and Postman.

> [!IMPORTANT]
> Use actual responsibilities. Do not invent business results or outcomes.

---

## 6. Featured Projects

Only two projects will be displayed.

### Project 1 — DevPilot AI

An AI-powered developer assistant for code suggestions, debugging and programming assistance.

**Technologies:** HTML, CSS, JavaScript, Node.js, Express.js, MongoDB, AI API integration.

**GitHub:** https://github.com/Saurabh-Borgaonkar/DevPilotAi_Assistant

**Live demo:** https://project-skitm.onrender.com/

> [!NOTE]
> Use a temporary project preview image initially. Replace with an actual screenshot later.

### Project 2 — Learning Management System

A MERN-based learning platform where students can access courses through a responsive interface.

**Technologies:** React, JavaScript, Node.js, Express.js, MongoDB, Mongoose.

**GitHub:** https://github.com/Saurabh-Borgaonkar/Digital_learning_platform

**Live demo:** Not currently available.

### Project card interaction

Clicking a card opens a dedicated project detail page containing:

1. Project overview.
2. Problem addressed.
3. Implemented features.
4. Technology stack.
5. Personal contributions.
6. Screenshots.
7. GitHub and live demo links where available.

> [!CAUTION]
> Never invent features, results or project achievements.

---

## 7. Problem-Solving Section

**Layout:** Coding Journey.

- Display 250+ LeetCode problems solved.
- Present a visual learning journey.
- Highlight problem-solving development.
- Provide LeetCode profile link.

> [!NOTE]
> Do not invent difficulty breakdowns or completion milestones.

---

## 8. Education and Certifications

Include B.Tech only. Do not display Class X or Class XII.

### Education

**SAGE University**
B.Tech — Computer Science Engineering
2023–2027
CGPA: 8.60

### Certifications

- Full Stack Web Development — Udemy.
- Full Stack Development — Coding Blocks.

---

## 9. Contact Section

**Design:** Bold and cinematic.

**Headline:** `LET'S BUILD SOMETHING.`

Include:

- Email contact action.
- LinkedIn.
- GitHub.
- Resume download.
- Contact form.

**Email:** saurabhborgaonkar55@gmail.com

**Phone:** +91 7498059665

> [!WARNING]
> Do not display the phone number publicly. Email should be available through a contact action, not as prominent plain text.

> [!NOTE]
> Phase 1: Build contact form UI and validation only. Implement submission backend in a later phase.

---

## 10. Footer

**Design:** Cinematic footer.

- Oversized `SAURABH.` typography.
- Emerald accent details.
- GitHub, LinkedIn and email links.
- Copyright.
- Back-to-top interaction.

---

## 11. Frontend Technology Stack

- React.js
- Vite
- JavaScript (ES6+) — `.js` and `.jsx` files only
- Tailwind CSS
- React Router DOM
- React built-in state management
- GSAP and ScrollTrigger
- Framer Motion
- Three.js / React Three Fiber
- Lenis
- Lucide React icons

> [!IMPORTANT]
> Do not use TypeScript for any new portfolio application code.

### Routing

| Route                                   | Purpose                  |
| --------------------------------------- | ------------------------ |
| `/`                                     | Public portfolio         |
| `/projects/devpilot-ai`                 | DevPilot AI detail page  |
| `/projects/learning-management-system`  | LMS detail page          |
| `/admin`                                | Future admin dashboard   |

---

## 12. Frontend Architecture

Keep content separate from presentation components.

### Folder structure

```
portfolio/
├── public/
│   ├── images/
│   │   ├── profile/
│   │   └── projects/
│   ├── models/
│   ├── resume/
│   ├── favicon.svg
│   └── social-preview.png
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── sections/
│   ├── pages/
│   ├── layouts/
│   ├── data/
│   ├── services/
│   ├── hooks/
│   ├── animations/
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

### Architecture rules

- Use structured local JavaScript data files in `/data/` initially.
- Create a service layer in `/services/` so local data can later be replaced with REST API responses without rewriting presentation components.
- Components receive data through props only — no hardcoded content inside components.

---

## 13. Future Backend Architecture — MERN

**Stack:** Node.js, Express.js, JavaScript, MongoDB, Mongoose, REST APIs.

### Feature-based module structure

Each feature separates routes, controllers, services, models and validation:

- Auth
- Profile
- Skills
- Experience
- Projects
- Education
- Certifications
- Contact
- Activity logs

---

## 14. Future Admin Dashboard

**Route:** `/admin`

### Design

Use a separate professional dashboard theme distinct from the cinematic public portfolio.

Include:

- Sidebar navigation.
- Dashboard overview with statistics.
- Content management tables.
- Forms for creating and editing content.
- Image and resume uploads.
- Responsive dashboard layout.

### Content management

Admin manages:

- Hero and profile information.
- Skills.
- Work experience.
- Projects and project images.
- Education.
- Certifications.
- Resume.
- Contact messages.

### Authentication

- Email and password login.
- bcrypt password hashing.
- JWT authentication.
- HttpOnly Secure cookies.
- Backend authorization middleware.
- No public admin registration.
- Login rate limiting.
- Secure logout and session expiration.

### Password recovery

- Email-based password reset.
- Cryptographically random, time-limited, single-use tokens.
- Store only hashed reset tokens.
- Invalidate existing sessions after reset.

### Draft and publish workflow

1. Edit content.
2. Save as draft.
3. Preview changes.
4. Publish after confirmation.

> [!CAUTION]
> Unpublished drafts must never appear in the public portfolio.

### Activity log

Record important events:

- Admin login.
- Profile updates.
- Project creation and updates.
- Resume replacement.
- Experience updates.
- Content publication.

Store: action, affected module, record ID, timestamp, responsible admin.
Activity history is read-only from the dashboard.

---

## 15. Contact Form Backend — Future Phase

**Stack:** Express.js, MongoDB, Mongoose, Nodemailer.

### Workflow

1. Visitor submits contact form.
2. Backend validates input.
3. Message is saved in MongoDB.
4. Email notification is sent to admin.
5. Admin can manage messages from the dashboard.

> [!IMPORTANT]
> Save messages before sending email notifications so that email failure does not cause data loss.

Include validation, spam protection and appropriate rate limiting.

---

## 16. Asset Management

### Phase 1

- Store images and resume locally in the frontend project.
- Use portrait, temporary project preview images and existing resume PDF.

### Future phase

- Integrate Cloudinary for image uploads and management through the admin dashboard.

---

## 17. Deployment

| Layer    | Service         |
| -------- | --------------- |
| Frontend | Vercel          |
| Backend  | Render          |
| Database | MongoDB Atlas   |
| Source   | GitHub          |

- Free Vercel subdomain initially, with custom domain support later.
- Configure environment variables, CORS, cookie security and deployment settings appropriately.

---

## 18. SEO Requirements

- Website title and meta description.
- Open Graph metadata.
- Twitter / social sharing cards.
- Custom SB favicon.
- Semantic HTML.
- Descriptive project URLs.
- Sitemap.
- `robots.txt`.
- Mobile-friendly metadata.

---

## 19. Performance Requirements

> [!TIP]
> Lighthouse target: 90+ in Performance, Accessibility, Best Practices and SEO.

- Optimize images using WebP / AVIF where appropriate.
- Lazy-load heavy 3D assets.
- Use lightweight mobile animations.
- Avoid unnecessary dependencies.
- Prevent layout shifts.
- Support `prefers-reduced-motion`.
- Provide WebGL fallback for unsupported devices.
- Optimize loading and rendering order.

---

## 20. Mobile Experience

Build a genuinely adapted mobile experience:

- Responsive navigation.
- Mobile-specific typography scaling.
- Repositioned portrait.
- Simplified 3D scene.
- Touch-friendly controls.
- Optimized image loading.
- No horizontal overflow.
- Mobile-friendly contact form.

---

## 21. Development Phases

### Phase 1 — Public frontend

- Project setup and design system.
- Hero and animations.
- All public portfolio sections.
- Project detail pages.
- Contact form UI.
- Responsive optimization.

### Phase 2 — Backend

- Express server.
- MongoDB connection.
- Feature-based modules.
- REST APIs.
- Authentication.

### Phase 3 — Admin dashboard

- Login.
- Content management.
- Draft and publish workflow.
- Resume and image uploads.
- Contact message management.
- Activity logging.

### Phase 4 — Integration

- Connect public frontend to APIs.
- Replace local content with database content.
- Integrate publishing workflow.

### Phase 5 — Testing and deployment

- Security testing.
- Performance testing.
- Responsive testing.
- SEO testing.
- Production deployment.

---

## 22. Non-Negotiable Rules

1. Build the recruiter-focused public portfolio first.
2. Do not add projects beyond DevPilot AI and Learning Management System.
3. Do not include Class X or Class XII education records.
4. Do not invent experience, achievements or project functionality.
5. Use JavaScript (ES6+), not TypeScript, for all portfolio application code.
6. Maintain the Midnight Emerald visual identity throughout.
7. Make the experience responsive and performance-conscious.
8. Keep the frontend independent and decoupled from the future backend.
9. Do not implement the admin dashboard in Phase 1.
10. Do not expose secrets or privileged backend operations in frontend code.
11. Generate implementation prompts section by section.
12. Do not start coding without approval of the relevant implementation stage.

---

> **Project status:** Planning decisions finalized.
> Ready for final review and approval before implementation prompts are generated.
