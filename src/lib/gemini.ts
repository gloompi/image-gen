/**
 * Gemini API Adapter
 * Infrastructure layer - handles communication with Google Gemini Imagen API
 * 
 * Single Responsibility: Only handles API communication
 * Open/Closed: Can be extended for new models without modification
 * Dependency Inversion: Depends on abstractions (types), not concretions
 */

import { GoogleGenAI } from '@google/genai';
import { GeneratedImage } from '@/types/image';

// Custom error types for better error handling
export class GeminiApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'GeminiApiError';
  }
}

// Configuration interface
interface GeminiConfig {
  apiKey: string;
  model?: string;
}

// Default model to use
const DEFAULT_MODEL = 'imagen-4.0-generate-001';

/**
 * Creates a Gemini client instance
 */
function createClient(apiKey: string): GoogleGenAI {
  return new GoogleGenAI({ apiKey });
}

/**
 * Generates images using Gemini Imagen API
 * 
 * @param prompt - The text prompt for image generation
 * @param numberOfImages - Number of images to generate (default: 1)
 * @param config - API configuration
 * @returns Array of generated images
 */
export async function generateImages(
  prompt: string,
  numberOfImages: number = 1,
  config: GeminiConfig
): Promise<GeneratedImage[]> {
  const client = createClient(config.apiKey);
  const model = config.model || DEFAULT_MODEL;

  try {
    const response = await client.models.generateImages({
      model,
      prompt,
      config: {
        numberOfImages,
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new GeminiApiError(
        'No images were generated. The prompt may have been blocked by safety filters.',
        'NO_IMAGES_GENERATED'
      );
    }

    // Transform response to our domain model
    const images: GeneratedImage[] = response.generatedImages.map((img, index) => ({
      id: `${Date.now()}-${index}`,
      imageData: img.image?.imageBytes || '',
      prompt,
      createdAt: new Date(),
    }));

    return images;
  } catch (error) {
    // Handle specific Gemini API errors
    if (error instanceof GeminiApiError) {
      throw error;
    }

    if (error instanceof Error) {
      // Check for common error patterns
      if (error.message.includes('API key')) {
        throw new GeminiApiError(
          'Invalid API key. Please check your GEMINI_API_KEY.',
          'INVALID_API_KEY',
          401
        );
      }
      if (error.message.includes('quota')) {
        throw new GeminiApiError(
          'API quota exceeded. Please try again later.',
          'QUOTA_EXCEEDED',
          429
        );
      }
      if (error.message.includes('safety') || error.message.includes('blocked')) {
        throw new GeminiApiError(
          'The prompt was blocked by safety filters. Please try a different prompt.',
          'SAFETY_BLOCKED',
          400
        );
      }

      throw new GeminiApiError(
        error.message || 'An unexpected error occurred',
        'UNKNOWN_ERROR',
        500
      );
    }

    throw new GeminiApiError(
      'An unexpected error occurred while generating images',
      'UNKNOWN_ERROR',
      500
    );
  }
}
