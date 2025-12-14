import { Tag } from '../ui/Tag';

interface ProjectPreviewProps {
  description: string;
  tags: string[];
  className?: string;
}

export function ProjectPreview({
  description,
  tags,
  className = '',
}: ProjectPreviewProps) {
  return (
    <div
      className={`
        p-[var(--space-s)]
        bg-[var(--color-coral)]
        border border-[var(--color-gray-light)]
        rounded-[var(--radius-sm)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <p className="text-bold mb-[var(--space-s)]">{description}</p>
      <div className="flex flex-wrap gap-[var(--space-xs)]">
        {tags.map((tag) => (
          <Tag key={tag} variant="static">{tag}</Tag>
        ))}
      </div>
    </div>
  );
}
