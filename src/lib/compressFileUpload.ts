import sharp from 'sharp';

const IMAGE_DATA_URL_REGEX = /^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/;
const MAX_DIMENSION = 1600;

export async function compressFileUpload(dataUrl: string): Promise<string> {
  if (!dataUrl || typeof dataUrl !== 'string') {
    return dataUrl;
  }

  const match = dataUrl.match(IMAGE_DATA_URL_REGEX);

  if (!match) {
    return dataUrl;
  }

  const [, mimeType, base64Data] = match;

  try {
    const inputBuffer = Buffer.from(base64Data, 'base64');

    const transformer = sharp(inputBuffer, { limitInputPixels: false }).rotate();
    const metadata = await transformer.metadata();

    const resized = transformer.resize({
      width: metadata.width && metadata.width > MAX_DIMENSION ? MAX_DIMENSION : undefined,
      height: metadata.height && metadata.height > MAX_DIMENSION ? MAX_DIMENSION : undefined,
      fit: 'inside',
      withoutEnlargement: true
    });

    const lowerMimeType = mimeType.toLowerCase();

    if (lowerMimeType === 'image/jpeg' || lowerMimeType === 'image/jpg') {
      const outputBuffer = await resized.jpeg({ quality: 70, mozjpeg: true }).toBuffer();
      return `data:image/jpeg;base64,${outputBuffer.toString('base64')}`;
    }

    if (lowerMimeType === 'image/png') {
      const outputBuffer = await resized.png({ compressionLevel: 9 }).toBuffer();
      return `data:image/png;base64,${outputBuffer.toString('base64')}`;
    }

    const outputBuffer = await resized.webp({ quality: 70 }).toBuffer();
    return `data:image/webp;base64,${outputBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Image compression failed:', error);
    return dataUrl;
  }
}

