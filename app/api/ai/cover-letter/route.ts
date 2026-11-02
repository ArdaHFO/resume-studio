import { getServerUserId } from '@/lib/auth/server-user';
import { NextRequest, NextResponse } from 'next/server';
import { generateCoverLetterGroq } from '@/lib/ai/groq';

export async function POST(request: NextRequest) {
  try {
    const userId = await getServerUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { resumeContent, jobListing, tone = 'professional' } = body;

    if (!resumeContent || !jobListing) {
      return NextResponse.json(
        { error: 'Resume content and job listing are required' },
        { status: 400 }
      );
    }

    // Convert to strings
    const resumeString = JSON.stringify(resumeContent, null, 2);
    const jobString = JSON.stringify(jobListing, null, 2);

    // Generate cover letter with Groq
    const coverLetter = await generateCoverLetterGroq(resumeString, jobString, tone);

    return NextResponse.json({
      success: true,
      coverLetter,
      model: 'groq-llama-3.3-70b-versatile',
    });
  } catch (error) {
    console.error('Cover letter generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate cover letter', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
