import { r2Client } from '@/lib/r2/r2Client';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get('file');
  const action = searchParams.get('action'); // 'view' or 'download'

  if (!fileName || !action) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }
  console.log('i ran from dserver');
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
    });

    const response = await r2Client.send(command);

    if (!response.Body) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const chunks = [];
    const reader = response.Body.transformToWebStream().getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const buffer = Buffer.concat(chunks);

    // Headers based on action
    const headers = {
      'Content-Type': response.ContentType || 'application/pdf',
      // Cache both view and download operations
      'Cache-Control': 'public, max-age=31536000', // 1 year cache
      ETag: response.ETag || `"${fileName}"`, // Use ETag for cache validation
    };

    // Different headers based on action

    if (action === 'download') {
      // For download - force download but still cache
      headers['Content-Disposition'] = `attachment; filename="${fileName}"`;
    } else {
      // For viewing - allow inline display
      headers['Content-Disposition'] = `inline; filename="${fileName}"`;
    }

    return new NextResponse(buffer, { headers });
  } catch (error) {
    console.error('Error fetching PDF:', error);
    return NextResponse.json({ error: 'Failed to fetch PDF' }, { status: 500 });
  }
}
