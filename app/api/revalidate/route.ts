import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route for On-Demand Revalidation
 *
 * This endpoint allows Supabase webhooks to trigger page regeneration
 * when new blog posts are created or updated.
 *
 * Usage:
 * POST/GET https://opodhotel.com/api/revalidate?secret=YOUR_SECRET&path=/blog
 *
 * Required query parameters:
 * - secret: Must match REVALIDATE_SECRET env variable
 * - path: The path to revalidate (e.g., "/blog", "/fr/blog", "/en/blog/my-article")
 *
 * Optional query parameters:
 * - type: "path" (default) or "layout"
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');
  const type = searchParams.get('type') || 'path';

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      {
        message: 'Invalid token',
        error: 'The provided secret does not match the configured REVALIDATE_SECRET'
      },
      { status: 401 }
    );
  }

  // Check if path parameter is provided
  if (!path) {
    return NextResponse.json(
      {
        message: 'Missing path parameter',
        error: 'Please provide a path to revalidate (e.g., ?path=/blog)'
      },
      { status: 400 }
    );
  }

  try {
    // Revalidate the specified path
    if (type === 'layout') {
      // Revalidate layout (useful for global changes)
      revalidatePath(path, 'layout');
    } else {
      // Revalidate specific page
      revalidatePath(path, 'page');
    }

    console.log(`✅ Revalidated: ${path} (type: ${type})`);

    return NextResponse.json(
      {
        revalidated: true,
        path,
        type,
        timestamp: new Date().toISOString(),
        message: `Successfully revalidated ${path}`
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error revalidating:', error);
    return NextResponse.json(
      {
        revalidated: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to revalidate path'
      },
      { status: 500 }
    );
  }
}

// Support POST requests as well (for webhooks that prefer POST)
export async function POST(request: NextRequest) {
  return GET(request);
}
