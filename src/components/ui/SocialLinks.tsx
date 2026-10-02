import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { profileConfig } from '@/data/profile';

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <SocialIcon href={profileConfig.githubUrl} label="GitHub">
        <FaGithub size={16} />
      </SocialIcon>
      <SocialIcon href={profileConfig.linkedinUrl} label="LinkedIn">
        <FaLinkedin size={16} />
      </SocialIcon>
      <SocialIcon href={`mailto:${profileConfig.email}`} label="Email">
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
  const isMail = href.startsWith('mailto:');
  return (
    <a
      href={href}
      target={isMail ? undefined : '_blank'}
      rel={isMail ? undefined : 'noopener noreferrer'}
      aria-label={label}
      className="border-border text-text-secondary hover:border-accent hover:text-text-primary flex h-9 w-9 items-center justify-center rounded-lg border transition-colors"
    >
      {children}
    </a>
  );
}
