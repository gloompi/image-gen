/**
 * Spinner Component
 * Animated loading indicator
 */

import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          ${sizes[size]}
          animate-spin rounded-full
          border-2 border-violet-500/20
          border-t-violet-500
        `}
      />
    </div>
  );
}

/**
 * Full-screen loading overlay
 */
export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-white/80 text-sm animate-pulse">
          Creating your masterpiece...
        </p>
      </div>
    </div>
  );
}
