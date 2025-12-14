import Image from 'next/image';

type FlagVariant = 'yes' | 'no';

interface FlagProps {
  variant: FlagVariant;
  className?: string;
}

export function Flag({ variant, className = '' }: FlagProps) {
  return (
    <Image
      src={`/assets/flag-${variant}.png`}
      alt={variant === 'yes' ? 'Да' : 'Нет'}
      width={24}
      height={24}
      className={className}
    />
  );
}
