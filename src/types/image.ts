/**
 * Image Generation Types
 * Domain layer types following clean architecture principles
 */

// Request types
export interface GenerateImageRequest {
  prompt: string;
  numberOfImages?: number;
}

// Response types
export interface GeneratedImage {
  id: string;
  imageData: string; // Base64 encoded image
  prompt: string;
  createdAt: Date;
}

export interface ImageGenerationResult {
  success: boolean;
  images: GeneratedImage[];
  error?: string;
}

// History types for localStorage
export interface ImageHistoryItem {
  id: string;
  prompt: string;
  imageData: string;
  createdAt: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
}

// Validation result
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}
