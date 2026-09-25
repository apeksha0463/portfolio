import { profile, isSet } from './profile.js'
import { projects } from './projects.js'

// Plain object of everything the chatbot is allowed to know. Placeholders and
// empty fields are removed so the AI model never sees them as real facts.
export function buildKnowledge() {
  const { education, contact } = profile
  return {
    name: profile.name,
    headline: profile.headline,
    about: profile.about,
    interests: profile.interests,
    education: {
      degree: `${education.degree} in ${education.major}`,
      major: education.major,
      minor: education.minor,
      ...(isSet(education.college) && { college: education.college }),
      ...(isSet(education.graduationYear) && { graduationYear: education.graduationYear }),
    },
    skills: profile.skills,
    experience: profile.experience.map(({ title, organization, period, summary, areas }) => ({
      title,
      ...(isSet(organization) && { organization }),
      ...(isSet(period) && { period }),
      summary,
      areas,
    })),
    projects: projects.map(({ keywords, id, ...rest }) => rest),
    contact: {
      github: contact.github,
      ...(isSet(contact.email) && { email: contact.email }),
      ...(isSet(contact.linkedin) && { linkedin: contact.linkedin }),
    },
    ...(isSet(profile.resumeUrl) && { resume: profile.resumeUrl }),
  }
}
