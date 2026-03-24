interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`bg-muted rounded-md animate-pulse ${className}`} />
  );
}
