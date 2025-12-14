type IconName = 'play' | 'more' | 'arrow-down' | 'close';
type IconSize = 'sm' | 'md' | 'lg';

interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
}

const sizeStyles: Record<IconSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const icons: Record<IconName, string> = {
  play: '/assets/icons/icon-play.svg',
  more: '/assets/icons/icon-more.svg',
  'arrow-down': '/assets/icons/icon-arrow-down.svg',
  close: '/assets/icons/icon-close.svg',
};

export function Icon({ name, size = 'md', className = '' }: IconProps) {
  return (
    <img
      src={icons[name]}
      alt={name}
      className={`${sizeStyles[size]} ${className}`}
    />
  );
}
