'use client';

import { Card, CardContent } from '@/components/ui/card';


interface StatsCardProps {
  label: string;
  value: string | number;
}


export function StatsCard({ label, value }: StatsCardProps) {

  return (
    <Card className="shadow-none! drop-shadow-none!">
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className={`font-heading text-5xl font-medium`}>{value}</p>
      </CardContent>
    </Card>
  );
}

interface StatsGridProps {
  stats: { label: string; value: string | number }[];
  columns?: 3 | 4;
}

export function StatsGrid({ stats, columns = 3 }: StatsGridProps) {
  return (
    <div className={`grid md:grid-cols-${columns} gap-4 mb-8`}>
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}