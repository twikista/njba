'use server';

import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from './r2Client';
import { articleFileName } from '../helper';

const MAX_SIZE_MB = 1; // 5MB limit
const ALLOWED_TYPES = ['application/pdf'];

//upload file
export async function uploadFile(formData) {
  try {
    const file = formData.pdfFile?.[0]; // Access the first file in the array
    // Check if file is provided
    if (!file) {
      throw new Error('No file provided');
    }
    //validate file size
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      throw new Error(`File size must not exceed ${MAX_SIZE_MB}MB`);
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Invalid file type.');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const filename = articleFileName(formData);

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: filename,
      Body: buffer,
      ContentType: file.type,
      Metadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    });

    await r2Client.send(command);

    const fileUrl = `${process.env.R2_PUBLIC_URL}/${filename}`;

    // revalidatePath('/');

    return {
      success: true,
      url: fileUrl,
      key: filename,
      message: 'File uploaded successfully',
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      message: 'Failed to upload file',
    };
  }
}

//delete file
export async function deleteFile(key) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    });

    await r2Client.send(command);

    // revalidatePath('/');

    return {
      success: true,
      message: 'File deleted successfully',
    };
  } catch (error) {
    console.error('Delete error:', error);
    return {
      success: false,
      message: 'Failed to delete file',
    };
  }
}
