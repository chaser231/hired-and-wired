'use client';

import { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon';

type DropdownVariant = 'default' | 'on-color';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: DropdownVariant;
  className?: string;
}

const variantStyles: Record<DropdownVariant, { button: string; menu: string }> = {
  default: {
    button: 'bg-[var(--color-white)] border border-[var(--color-gray-light)]',
    menu: 'bg-[var(--color-white)] border border-[var(--color-gray-light)]',
  },
  'on-color': {
    button: 'bg-[var(--color-gold)] text-[var(--color-white)]',
    menu: 'bg-[var(--color-gold)] text-[var(--color-white)]',
  },
};

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  variant = 'default',
  className = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const styles = variantStyles[variant];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full
          flex items-center justify-between
          px-[var(--space-s)] py-[var(--space-xs)]
          rounded-[var(--radius-sm)]
          text-grotesk
          ${styles.button}
        `.replace(/\s+/g, ' ').trim()}
      >
        <span className={!selectedOption ? 'opacity-50' : ''}>
          {selectedOption?.label || placeholder}
        </span>
        <Icon
          name="arrow-down"
          size="sm"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''} ${
            variant === 'on-color' ? 'invert' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`
            absolute z-10 w-full mt-[var(--space-xxs)]
            rounded-[var(--radius-sm)]
            shadow-lg
            overflow-hidden
            ${styles.menu}
          `.replace(/\s+/g, ' ').trim()}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full text-left
                px-[var(--space-s)] py-[var(--space-xs)]
                text-grotesk
                hover:bg-[var(--color-gray-bg)]
                ${value === option.value ? 'bg-[var(--color-gray-bg)]' : ''}
              `.replace(/\s+/g, ' ').trim()}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
