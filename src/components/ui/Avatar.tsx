import Image from 'next/image';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  src: string;
  alt: string;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, { className: string; pixels: number }> = {
  sm: { className: 'w-6 h-6', pixels: 24 },
  md: { className: 'w-10 h-10', pixels: 40 },
  lg: { className: 'w-14 h-14', pixels: 56 },
};

export function Avatar({ src, alt, size = 'md', className = '' }: AvatarProps) {
  const { className: sizeClass, pixels } = sizeStyles[size];

  return (
    <div
      className={`relative rounded-full overflow-hidden ${sizeClass} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={pixels}
        height={pixels}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

interface AvatarsProps {
  avatars: Array<{ src: string; alt: string }>;
  size?: AvatarSize;
  max?: number;
  className?: string;
}

export function Avatars({ avatars, size = 'md', max = 3, className = '' }: AvatarsProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={`flex items-center ${className}`}>
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className="relative"
          style={{ marginLeft: index > 0 ? '-8px' : 0, zIndex: visibleAvatars.length - index }}
        >
          <Avatar
            src={avatar.src}
            alt={avatar.alt}
            size={size}
            className="border-2 border-white"
          />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={`
            flex items-center justify-center
            rounded-full
            bg-[var(--color-gray-light)]
            text-caps
            ${sizeStyles[size].className}
            border-2 border-white
          `.replace(/\s+/g, ' ').trim()}
          style={{ marginLeft: '-8px', zIndex: 0 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
