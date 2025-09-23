
export interface Hairstyle {
  name: string;
  prompt: string;
  imageUrl: string;
}

export enum AppState {
  IDLE,
  IMAGE_UPLOADED,
  GENERATING,
  RESULT_READY,
  ERROR,
}

export interface UserImage {
    base64: string;
    mimeType: string;
}
