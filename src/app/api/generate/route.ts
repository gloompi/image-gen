/**
 * Image Generation API Route
 * Presentation layer - handles HTTP requests
 * 
 * POST /api/generate
 * Body: { prompt: string, numberOfImages?: number }
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/services/imageGeneration';
import { ApiResponse, GeneratedImage } from '@/types/image';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { prompt, numberOfImages } = body;

    // Validate request structure
    if (!prompt) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: {
          message: 'Prompt is required',
          code: 'MISSING_PROMPT',
        },
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Call service
    const result = await generateImage({
      prompt,
      numberOfImages: numberOfImages || 1,
    });

    // Return response
    if (!result.success) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: {
          message: result.error || 'Unknown error',
          code: 'GENERATION_FAILED',
        },
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const successResponse: ApiResponse<GeneratedImage[]> = {
      success: true,
      data: result.images,
    };

    return NextResponse.json(successResponse, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);

    const errorResponse: ApiResponse<null> = {
      success: false,
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_ERROR',
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
