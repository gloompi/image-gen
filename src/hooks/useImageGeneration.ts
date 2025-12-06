/**
 * useImageGeneration Hook
 * Custom hook encapsulating image generation logic
 * 
 * Separation of Concerns: Keeps API logic separate from UI components
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { GeneratedImage, ImageHistoryItem, ApiResponse } from '@/types/image';
import { getImageHistory, saveToHistory, clearHistory as clearStoredHistory } from '@/utils/storage';

interface UseImageGenerationReturn {
  // State
  isLoading: boolean;
  error: string | null;
  currentImage: GeneratedImage | null;
  history: ImageHistoryItem[];
  
  // Actions
  generate: (prompt: string) => Promise<void>;
  clearError: () => void;
  clearHistory: () => void;
}

export function useImageGeneration(): UseImageGenerationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [history, setHistory] = useState<ImageHistoryItem[]>([]);

  // Load history on mount
  useEffect(() => {
    setHistory(getImageHistory());
  }, []);

  const generate = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, numberOfImages: 1 }),
      });

      const data: ApiResponse<GeneratedImage[]> = await response.json();

      if (!data.success || !data.data || data.data.length === 0) {
        throw new Error(data.error?.message || 'Failed to generate image');
      }

      const generatedImage = data.data[0];
      setCurrentImage(generatedImage);

      // Save to history
      const historyItem: ImageHistoryItem = {
        id: generatedImage.id,
        prompt: generatedImage.prompt,
        imageData: generatedImage.imageData,
        createdAt: new Date().toISOString(),
      };
      saveToHistory(historyItem);
      setHistory(getImageHistory());
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearHistory = useCallback(() => {
    clearStoredHistory();
    setHistory([]);
  }, []);

  return {
    isLoading,
    error,
    currentImage,
    history,
    generate,
    clearError,
    clearHistory,
  };
}
