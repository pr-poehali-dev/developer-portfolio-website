
import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SocialIconProps {
  platform: 'github' | 'linkedin' | 'twitter' | 'telegram' | 'email';
  url: string;
}

const SocialIcon = ({ platform, url }: SocialIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIconName = (platform: string): string => {
    const iconMap: Record<string, string> = {
      'github': 'Github',
      'linkedin': 'Linkedin',
      'twitter': 'Twitter',
      'telegram': 'Send',
      'email': 'Mail',
    };
    
    return iconMap[platform] || 'Link';
  };

  const getPlatformName = (platform: string): string => {
    const nameMap: Record<string, string> = {
      'github': 'GitHub',
      'linkedin': 'LinkedIn',
      'twitter': 'Twitter',
      'telegram': 'Telegram',
      'email': 'Email',
    };
    
    return nameMap[platform] || platform;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={getPlatformName(platform)}
          >
            <div 
              className={`
                w-12 h-12 rounded-full flex items-center justify-center
                bg-background border border-border transition-all duration-300
                transform ${isHovered ? 'scale-110 -translate-y-1' : ''}
                group-hover:border-accent group-hover:text-accent
                group-focus:border-accent group-focus:text-accent
              `}
            >
              <Icon
                name={getIconName(platform)}
                className="w-5 h-5 transition-transform duration-300 transform group-hover:scale-110"
              />
            </div>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getPlatformName(platform)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SocialIcon;
