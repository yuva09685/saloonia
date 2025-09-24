import { UserImage } from '../types';

// This function now acts as a proxy to your backend service.
export const applyHairstyle = async (
  userImage: UserImage,
  prompt: string
): Promise<string> => {
  try {
    // This endpoint '/api/generate-hairstyle' is what you will build in your NestJS backend.
    const response = await fetch('/api/generate-hairstyle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: userImage, prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Server returned an error with no details.' }));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (!data.base64Image) {
        throw new Error("The server did not return a valid image.");
    }
    return data.base64Image;
  } catch (error) {
    console.error("Error communicating with backend:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate hairstyle: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the server.");
  }
};