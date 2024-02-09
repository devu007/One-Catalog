import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function convertStoredImageToFile(storedImageUrl: string): Promise<File> {
  try {
    const response = await fetch(storedImageUrl);
    const blob = await response.blob();

    // Create a File object from the blob
    const file = new File([blob], 'downloaded_image', { type: blob.type });

    return file;
  } catch (error) {
    console.error('Error converting stored image to file:', error);
    throw error;
  }
}
