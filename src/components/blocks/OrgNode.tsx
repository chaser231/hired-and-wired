'use client';

import { useState } from 'react';
import { Avatar, Icon } from '@/components/ui';
import { OrgNode as OrgNodeType } from '@/types/org';

interface OrgNodeProps {
  node: OrgNodeType;
  isRoot?: boolean;
}

export function OrgNode({ node, isRoot = false }: OrgNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <div
        className={`
          relative flex items-center gap-[var(--space-s)]
          p-[var(--space-s)]
          rounded-[var(--radius-md)]
          cursor-pointer
          transition-all duration-200
          hover:shadow-md
          ${isRoot ? 'bg-[var(--color-yellow)]' : 'bg-[var(--color-white)]'}
        `}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        style={{
          border: isRoot ? 'none' : '1px solid var(--color-gray-light)',
          minWidth: '200px',
        }}
      >
        <Avatar src={node.avatarSrc} alt={node.name} size="md" />
        
        <div className="flex flex-col gap-[var(--space-xxxs)]">
          <span className="text-bold" style={{ fontSize: '14px' }}>{node.name}</span>
          <span className="text-pixel">{node.role}</span>
          {node.department && (
            <span className="text-grotesk" style={{ color: 'var(--color-gray-dark)' }}>
              {node.department}
            </span>
          )}
        </div>

        {/* Expand/Collapse indicator */}
        {hasChildren && (
          <div 
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-gray-light)' }}
          >
            <Icon 
              name="arrow-down" 
              size="sm" 
              className={`transition-transform duration-200 ${isExpanded ? '' : '-rotate-90'}`}
            />
          </div>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="flex flex-col items-center mt-8">
          {/* Vertical line from parent */}
          <div 
            className="w-[2px] h-8 -mt-8"
            style={{ backgroundColor: 'var(--color-gray-light)' }}
          />
          
          {/* Horizontal connector line */}
          {node.children!.length > 1 && (
            <div 
              className="h-[2px] -mt-0"
              style={{ 
                backgroundColor: 'var(--color-gray-light)',
                width: `${(node.children!.length - 1) * 220}px`,
              }}
            />
          )}

          {/* Children nodes */}
          <div className="flex gap-[var(--space-m)]">
            {node.children!.map((child, index) => (
              <div key={child.id} className="flex flex-col items-center">
                {/* Vertical line to child */}
                <div 
                  className="w-[2px] h-6"
                  style={{ backgroundColor: 'var(--color-gray-light)' }}
                />
                <OrgNode node={child} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

