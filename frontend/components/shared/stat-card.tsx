'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { AnimatedCounter } from './animated-counter';

interface StatCardProps {
  label: string;
  value: string;
  trend?: number;
  sparklineData?: number[];
}

export function StatCard({ label, value, trend, sparklineData }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Generate sparkline SVG path
  const generateSparklinePath = (data: number[]) => {
    if (!data || data.length === 0) return '';

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 60;
    const height = 20;
    const pointWidth = width / (data.length - 1 || 1);

    const points = data.map((value, i) => {
      const x = i * pointWidth;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  };

  const sparklinePath = sparklineData ? generateSparklinePath(sparklineData) : '';

  return (
    <div
      ref={ref}
      className="relative group"
      style={{
        animation: isInView ? 'fadeInUp 0.6s ease-out forwards' : 'none',
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

      <div className="relative z-10 space-y-2 p-6">
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          {trend !== undefined && (
            <span
              className={`text-xs font-semibold flex items-center gap-1 ${
                trend > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>

        <p className="font-heading text-4xl md:text-5xl font-bold text-primary">
          {isInView ? value : '0'}
        </p>

        {/* Sparkline chart */}
        {sparklineData && sparklinePath && (
          <svg width="60" height="20" className="mt-3" viewBox="0 0 60 20">
            <path d={sparklinePath} fill="none" stroke="#DC2626" strokeWidth="1.5" />
          </svg>
        )}
      </div>
    </div>
  );
}
