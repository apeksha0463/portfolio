import { profile, isSet } from '../data/profile.js'
import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons.jsx'
import Section from './Section.jsx'

export default function Contact() {
  const { email, linkedin, github } = profile.contact
  const links = [
    isSet(email) && { href: `mailto:${email}`, label: 'Email', value: email, Icon: MailIcon },
    isSet(linkedin) && { href: linkedin, label: 'LinkedIn', value: 'View profile', Icon: LinkedInIcon },
    { href: github, label: 'GitHub', value: github.replace('https://', ''), Icon: GitHubIcon },
    isSet(profile.resumeUrl) && { href: profile.resumeUrl, label: 'Resume', value: 'Download PDF', Icon: FileIcon },
  ].filter(Boolean)

  return (
    <Section id="contact" title="Contact">
      <p className="section-intro">
        I'm open to internships and opportunities to learn. Feel free to reach out.
      </p>
      <div className="contact-grid">
        {links.map(({ href, label, value, Icon }) => (
          <a
            key={label}
            href={href}
            className="card contact-card"
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noreferrer"
          >
            <span className="contact-icon">
              <Icon width={20} height={20} />
            </span>
            <span>
              <span className="label">{label}</span>
              <span className="contact-value">{value}</span>
            </span>
          </a>
        ))}
      </div>
    </Section>
  )
}
