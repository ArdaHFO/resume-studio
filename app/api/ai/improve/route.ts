import { getServerUserId } from '@/lib/auth/server-user';
import { NextRequest, NextResponse } from 'next/server';
import { improveResumeSectionGroq } from '@/lib/ai/groq';

export async function POST(request: NextRequest) {
  try {
    const userId = await getServerUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { sectionName, content, context } = body;

    if (!sectionName || !content) {
      return NextResponse.json(
        { error: 'Section name and content are required' },
        { status: 400 }
      );
    }

    // Improve section with Groq
    const improved = await improveResumeSectionGroq(sectionName, content, context);

    return NextResponse.json({
      success: true,
      improved,
      model: 'groq-llama-3.3-70b-versatile',
    });
  } catch (error) {
    console.error('Section improvement error:', error);
    return NextResponse.json(
      { error: 'Failed to improve section', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
