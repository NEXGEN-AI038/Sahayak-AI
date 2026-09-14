import type { ReactNode } from 'react';

type Variant =
  | 'gray'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'red'
  | 'purple'
  | 'orange';

const variantClasses: Record<Variant, string> = {
  gray: 'bg-gray-100 text-gray-700 border-gray-200',
  blue: 'bg-brand-50 text-brand-700 border-brand-200',
  green: 'bg-accent-50 text-accent-700 border-accent-200',
  yellow: 'bg-warning-50 text-warning-700 border-warning-200',
  red: 'bg-danger-50 text-danger-700 border-danger-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
};

export function Badge({
  children,
  variant = 'gray',
  className = '',
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, Variant> = {
    'Needs Review': 'yellow',
    'In Progress': 'blue',
    Resolved: 'green',
  };
  return <Badge variant={map[status] ?? 'gray'}>{status}</Badge>;
}

export function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, Variant> = {
    Critical: 'red',
    High: 'orange',
    Normal: 'blue',
    Low: 'gray',
  };
  return <Badge variant={map[priority] ?? 'gray'}>{priority}</Badge>;
}
