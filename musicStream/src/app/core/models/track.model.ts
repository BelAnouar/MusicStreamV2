export interface Track {
  id: string;
  title: string;
  artist: string;
  description?: string;
  addedDate: Date;
  duration: number;
  category: MusicCategory;
  coverImageUrl?: string;
  audioFileUrl: string;
}

export enum MusicCategory {
  Pop = 'pop',
  Rock = 'rock',
  Rap = 'rap',
  Chaabi = 'cha3bi',
  Jazz = 'jazz',
  Classical = 'classical',
  Electronic = 'electronic',
  RnB = 'rnb',
  Country = 'country',
  Blues = 'blues',
  Other = 'other'
}

export interface TrackForm {
  title: string;
  artist: string;
  description?: string;
  category: MusicCategory;
  coverImage?: File;
  audioFile: File;
}

