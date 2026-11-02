import { NextResponse } from 'next/server';
import { getServerUserId } from '@/lib/auth/server-user';

export async function POST() {
  try {
    const userId = await getServerUserId();

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // A redirect or a client-supplied plan is not proof of payment. Resume
    // fulfillment only after server verification and durable replay protection exist.
    return NextResponse.json(
      {
        success: false,
        error: 'Payment confirmation is unavailable. No plan or credits were added. Please contact support if you were charged.',
        code: 'payment_verification_unavailable',
      },
      { status: 503 }
    );
  } catch (error) {
    console.error('Failed to process checkout success:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process checkout success' },
      { status: 500 }
    );
  }
}
