import { getServerUserId } from '@/lib/auth/server-user';
import { NextRequest, NextResponse } from 'next/server';
import { optimizeResumeContentGroq } from '@/lib/ai/groq';

export async function POST(request: NextRequest) {
  try {
    const userId = await getServerUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { resumeContent, jobDescription } = body;

    if (!resumeContent || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume content and job description are required' },
        { status: 400 }
      );
    }

    // Convert resume content to string
    const resumeString = JSON.stringify(resumeContent, null, 2);

    // Call Groq AI optimization
    const result = await optimizeResumeContentGroq(resumeString, jobDescription);

    return NextResponse.json({
      success: true,
      data: result,
      model: 'groq-llama-3.3-70b-versatile',
    });
  } catch (error) {
    console.error('AI optimization error:', error);
    return NextResponse.json(
      { error: 'Failed to optimize resume', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
