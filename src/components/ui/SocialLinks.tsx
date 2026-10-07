import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { profileConfig } from '@/data/profile';

// A plain `mailto:` link depends on the visitor having a desktop mail client
// configured. Many don't (especially on work machines or Linux), so clicking
// it silently does nothing and looks broken. Since the address is Gmail,
// open Gmail's own compose view instead — it always works in any browser,
// signed in or not (it prompts sign-in first if needed).
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profileConfig.email)}`;

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <SocialIcon href={profileConfig.githubUrl} label="GitHub">
        <FaGithub size={16} />
      </SocialIcon>
      <SocialIcon href={profileConfig.linkedinUrl} label="LinkedIn">
        <FaLinkedin size={16} />
      </SocialIcon>
      <SocialIcon href={gmailComposeUrl} label="Email">
        <FiMail size={16} />
      </SocialIcon>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="border-border text-text-secondary hover:border-accent hover:text-text-primary flex h-9 w-9 items-center justify-center rounded-lg border transition-colors"
    >
      {children}
    </a>
  );
}
