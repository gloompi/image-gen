/**
 * ImageGenerator Feature Component
 * Main component that composes all sub-components
 */

'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { PromptInput } from './PromptInput';
import { ImageDisplay } from './ImageDisplay';
import { ImageHistory } from './ImageHistory';

export function ImageGenerator() {
  const {
    isLoading,
    error,
    currentImage,
    history,
    generate,
    clearError,
    clearHistory,
  } = useImageGeneration();

  return (
    <div className="space-y-8">
      {/* Main generator section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input section */}
        <Card>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  Create Your Image
                </h2>
                <p className="text-sm text-gray-400">
                  Describe your vision and let AI bring it to life
                </p>
              </div>

              <PromptInput onSubmit={generate} isLoading={isLoading} />

              {/* Error display */}
              {error && (
                <div className="
                  p-4 rounded-xl
                  bg-red-500/10 border border-red-500/30
                  flex items-start gap-3
                ">
                  <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm text-red-300">{error}</p>
                    <button
                      onClick={clearError}
                      className="text-xs text-red-400 hover:text-red-300 mt-1"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Output section */}
        <Card>
          <CardContent>
            <ImageDisplay image={currentImage} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>

      {/* History section */}
      {history.length > 0 && (
        <Card>
          <CardContent>
            <ImageHistory history={history} onClear={clearHistory} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
