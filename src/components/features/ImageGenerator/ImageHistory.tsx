/**
 * ImageHistory Component
 * Displays recent image generations from localStorage
 */

'use client';

import React from 'react';
import { ImageHistoryItem } from '@/types/image';

interface ImageHistoryProps {
  history: ImageHistoryItem[];
  onClear: () => void;
}

export function ImageHistory({ history, onClear }: ImageHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  const handleDownload = (item: ImageHistoryItem) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${item.imageData}`;
    link.download = `generated-image-${item.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Recent Creations</h3>
        <button
          onClick={onClear}
          className="
            text-xs text-gray-400 hover:text-red-400
            transition-colors duration-200
          "
        >
          Clear History
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`data:image/png;base64,${item.imageData}`}
              alt={item.prompt}
              className="w-full h-full object-cover"
            />

            {/* Hover overlay */}
            <div className="
              absolute inset-0
              bg-black/70 backdrop-blur-sm
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
              flex flex-col items-center justify-center
              p-2
            ">
              <p className="text-xs text-white/80 text-center line-clamp-3 mb-2">
                {item.prompt}
              </p>
              <button
                onClick={() => handleDownload(item)}
                className="
                  p-2 rounded-full
                  bg-white/20 hover:bg-white/30
                  transition-colors duration-200
                "
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
