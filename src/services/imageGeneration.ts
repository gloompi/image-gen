/**
 * Image Generation Service
 * Application layer - orchestrates business logic
 * 
 * Single Responsibility: Orchestrates image generation workflow
 * Dependency Inversion: Depends on abstractions from lib/gemini
 */

import { generateImages, GeminiApiError } from '@/lib/gemini';
import { GenerateImageRequest, ImageGenerationResult } from '@/types/image';
import { validatePrompt, sanitizePrompt, validateNumberOfImages } from '@/utils/validation';

/**
 * Generates images based on user request
 * Handles validation, sanitization, and error handling
 */
export async function generateImage(
  request: GenerateImageRequest
): Promise<ImageGenerationResult> {
  // Validate prompt
  const promptValidation = validatePrompt(request.prompt);
  if (!promptValidation.isValid) {
    return {
      success: false,
      images: [],
      error: promptValidation.error,
    };
  }

  // Validate number of images if provided
  const numberOfImages = request.numberOfImages || 1;
  const countValidation = validateNumberOfImages(numberOfImages);
  if (!countValidation.isValid) {
    return {
      success: false,
      images: [],
      error: countValidation.error,
    };
  }

  // Sanitize prompt
  const sanitizedPrompt = sanitizePrompt(request.prompt);

  // Get API key from environment
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      images: [],
      error: 'API key not configured. Please set GEMINI_API_KEY environment variable.',
    };
  }

  try {
    const images = await generateImages(sanitizedPrompt, numberOfImages, { apiKey });

    return {
      success: true,
      images,
    };
  } catch (error) {
    if (error instanceof GeminiApiError) {
      return {
        success: false,
        images: [],
        error: error.message,
      };
    }

    return {
      success: false,
      images: [],
      error: 'An unexpected error occurred while generating the image.',
    };
  }
}
