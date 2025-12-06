/**
 * Validation Utilities
 * Pure functions for input validation
 */

import { ValidationResult } from '@/types/image';

// Validation constants
const MIN_PROMPT_LENGTH = 3;
const MAX_PROMPT_LENGTH = 1000;

/**
 * Validates an image generation prompt
 */
export function validatePrompt(prompt: string): ValidationResult {
  // Check if prompt exists
  if (!prompt || typeof prompt !== 'string') {
    return {
      isValid: false,
      error: 'Prompt is required',
    };
  }

  // Trim and check length
  const trimmedPrompt = prompt.trim();

  if (trimmedPrompt.length < MIN_PROMPT_LENGTH) {
    return {
      isValid: false,
      error: `Prompt must be at least ${MIN_PROMPT_LENGTH} characters`,
    };
  }

  if (trimmedPrompt.length > MAX_PROMPT_LENGTH) {
    return {
      isValid: false,
      error: `Prompt must be less than ${MAX_PROMPT_LENGTH} characters`,
    };
  }

  return { isValid: true };
}

/**
 * Sanitizes user input
 */
export function sanitizePrompt(prompt: string): string {
  return prompt
    .trim()
    .replace(/\s+/g, ' '); // Normalize whitespace
}

/**
 * Validates number of images
 */
export function validateNumberOfImages(count: number): ValidationResult {
  if (!Number.isInteger(count) || count < 1 || count > 4) {
    return {
      isValid: false,
      error: 'Number of images must be between 1 and 4',
    };
  }
  return { isValid: true };
}
