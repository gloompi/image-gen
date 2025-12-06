/**
 * ImageDisplay Component
 * Displays generated image with download functionality
 */

'use client';

import React from 'react';
import { GeneratedImage } from '@/types/image';

interface ImageDisplayProps {
  image: GeneratedImage | null;
  isLoading: boolean;
}

export function ImageDisplay({ image, isLoading }: ImageDisplayProps) {
  const handleDownload = () => {
    if (!image) return;

    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${image.imageData}`;
    link.download = `generated-image-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="aspect-square w-full rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-4">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-indigo-600/20 to-purple-600/20 animate-pulse" />
          
          {/* Spinner */}
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-violet-500/20 border-t-violet-500 animate-spin" />
          </div>
          
          <p className="text-gray-400 text-sm animate-pulse">
            Creating your masterpiece...
          </p>
        </div>
      </div>
    );
  }

  // No image state
  if (!image) {
    return (
      <div className="aspect-square w-full rounded-xl bg-white/5 border border-white/10 border-dashed flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4 opacity-20">🎨</div>
          <p className="text-gray-400">
            Your generated image will appear here
          </p>
        </div>
      </div>
    );
  }

  // Image display
  return (
    <div className="space-y-4">
      <div className="relative group">
        {/* Image container */}
        <div className="aspect-square w-full rounded-xl overflow-hidden bg-black/20 border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${image.imageData}`}
            alt={image.prompt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay on hover */}
        <div className="
          absolute inset-0 
          bg-gradient-to-t from-black/80 via-transparent to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          rounded-xl
          flex items-end justify-center
          p-4
        ">
          <button
            onClick={handleDownload}
            className="
              flex items-center gap-2
              px-4 py-2
              bg-white/20 backdrop-blur-sm
              hover:bg-white/30
              border border-white/20
              rounded-lg
              text-white text-sm font-medium
              transition-all duration-200
            "
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
        </div>
      </div>

      {/* Prompt display */}
      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Prompt</p>
        <p className="text-sm text-gray-200">{image.prompt}</p>
      </div>
    </div>
  );
}
