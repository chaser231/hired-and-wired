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
        flex flex-col gap-[30px]
        p-[var(--space-s)]
        border-t border-[var(--color-gray-light)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <p className="text-bold">{description}</p>
      <div className="flex flex-wrap gap-[2px]">
        {tags.map((tag) => (
          <Tag key={tag} variant="static">{tag}</Tag>
        ))}
      </div>
    </div>
  );
}
