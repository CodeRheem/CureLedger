'use client';

import { useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useRef } from 'react';

interface Step {
  number: string;
  title: string;
  description: string;
}

interface AnimatedStepsProps {
  steps: Step[];
}

export function AnimatedSteps({ steps }: AnimatedStepsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative">
      {/* Animated connecting lines - Desktop only */}
      <svg
        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
        style={{ top: '60px', height: 'calc(100% - 120px)' }}
      >
        <defs>
          <style>{`
            @keyframes drawLine {
              from {
                stroke-dashoffset: 100%;
              }
              to {
                stroke-dashoffset: 0;
              }
            }
            .connecting-line {
              stroke-dasharray: 100%;
              animation: ${isInView ? 'drawLine 1.5s ease-out forwards' : 'none'};
            }
          `}</style>
        </defs>
        {/* Lines connecting the steps */}
        {steps.map((_, i) => (
          i < steps.length - 1 && (
            <line
              key={i}
              x1={`${25 + (i * 100) / (steps.length - 1)}%`}
              y1="0"
              x2={`${25 + ((i + 1) * 100) / (steps.length - 1)}%`}
              y2="0"
              stroke="#EF4444"
              strokeWidth="2"
              className="connecting-line"
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            />
          )
        ))}
      </svg>

      <div className="grid md:grid-cols-4 gap-6 relative z-10">
        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              animation: isInView
                ? `fadeInUp 0.6s ease-out forwards`
                : 'none',
              animationDelay: `${i * 0.1}s`,
            }}
            className="@media (prefers-reduced-motion: no-preference)"
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
            <Card className="border border-border bg-white hover:shadow-lg hover:border-red-200 transition-all duration-300 group h-full">
              <CardContent className="pt-8 pb-6 px-6">
                <span className="font-heading text-5xl font-bold text-red-100 group-hover:text-red-200 transition-colors">
                  {step.number}
                </span>
                <h3 className="font-heading text-lg font-semibold text-foreground mt-4 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
