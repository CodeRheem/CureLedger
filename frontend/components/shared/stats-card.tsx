'use client';

import { Card, CardContent } from '@/components/ui/card';

type StatsCardVariant = 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'red';

interface StatsCardProps {
  label: string;
  value: string | number;
  variant?: StatsCardVariant;
}

const variantStyles: Record<StatsCardVariant, { gradient: string; border: string; text: string }> = {
  blue: {
    gradient: 'from-blue-50 to-blue-100/50',
    border: 'border-blue-100',
    text: 'text-blue-600',
  },
  green: {
    gradient: 'from-green-50 to-green-100/50',
    border: 'border-green-100',
    text: 'text-green-600',
  },
  yellow: {
    gradient: 'from-yellow-50 to-yellow-100/50',
    border: 'border-yellow-100',
    text: 'text-yellow-600',
  },
  purple: {
    gradient: 'from-purple-50 to-purple-100/50',
    border: 'border-purple-100',
    text: 'text-purple-600',
  },
  orange: {
    gradient: 'from-orange-50 to-orange-100/50',
    border: 'border-orange-100',
    text: 'text-orange-600',
  },
  red: {
    gradient: 'from-red-50 to-red-100/50',
    border: 'border-red-100',
    text: 'text-primary',
  },
};

export function StatsCard({ label, value, variant = 'blue' }: StatsCardProps) {
  const style = variantStyles[variant];

  return (
    <Card className={`bg-gradient-to-br ${style.gradient} ${style.border}`}>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className={`text-3xl font-bold ${style.text}`}>{value}</p>
      </CardContent>
    </Card>
  );
}

interface StatsGridProps {
  stats: { label: string; value: string | number; variant: StatsCardVariant }[];
  columns?: 3 | 4;
}

export function StatsGrid({ stats, columns = 4 }: StatsGridProps) {
  return (
    <div className={`grid md:grid-cols-${columns} gap-4 mb-8`}>
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}