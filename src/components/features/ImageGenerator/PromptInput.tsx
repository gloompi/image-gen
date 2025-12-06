/**
 * PromptInput Component
 * Text input with character count and prompt suggestions
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const PROMPT_SUGGESTIONS = [
  'A futuristic city at sunset with flying cars and neon lights',
  'A magical forest with glowing mushrooms and fairy lights',
  'An astronaut playing guitar on the moon',
  'A cozy coffee shop interior with rain outside the window',
  'A majestic dragon flying over snow-capped mountains',
];

const MAX_CHARS = 1000;

export function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const charCount = prompt.length;
  const isOverLimit = charCount > MAX_CHARS;
  const isValid = prompt.trim().length >= 3 && !isOverLimit;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Textarea */}
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to create..."
          rows={4}
          className={`
            w-full px-4 py-3
            bg-white/5 backdrop-blur-sm
            border rounded-xl
            text-white placeholder-gray-400
            focus:outline-none focus:ring-2
            transition-all duration-200
            resize-none
            ${isOverLimit 
              ? 'border-red-500/50 focus:ring-red-500/50' 
              : 'border-white/10 focus:ring-violet-500/50 focus:border-violet-500/50'
            }
          `}
          disabled={isLoading}
        />
        
        {/* Character count */}
        <div className={`
          absolute bottom-3 right-3 text-xs
          ${isOverLimit ? 'text-red-400' : 'text-gray-500'}
        `}>
          {charCount}/{MAX_CHARS}
        </div>
      </div>

      {/* Generate button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        disabled={!isValid}
        className="w-full"
      >
        ✨ Generate Image
      </Button>

      {/* Prompt suggestions */}
      <div className="space-y-2">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Try a suggestion
        </p>
        <div className="flex flex-wrap gap-2">
          {PROMPT_SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isLoading}
              className="
                px-3 py-1.5 text-xs
                bg-white/5 hover:bg-white/10
                border border-white/10 hover:border-violet-500/30
                rounded-full
                text-gray-300 hover:text-white
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {suggestion.length > 40 ? suggestion.substring(0, 40) + '...' : suggestion}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
