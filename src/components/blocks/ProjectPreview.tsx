import { Tag } from '../ui/Tag';

interface ProjectPreviewProps {
  title: string;
  tags: string[];
  className?: string;
}

export function ProjectPreview({
  title,
  tags,
  className = '',
}: ProjectPreviewProps) {
  return (
    <div
      className={`
        flex flex-col gap-[var(--space-xl)]
        py-[var(--space-s)]
        border-t border-[var(--color-gray-light)]
        bg-[var(--color-coral)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <h4 className="text-h3" style={{ maxWidth: '419px' }}>{title}</h4>
      <div className="flex flex-wrap gap-[2px]">
        {tags.map((tag) => (
          <Tag key={tag} variant="static">{tag}</Tag>
        ))}
      </div>
    </div>
  );
}
