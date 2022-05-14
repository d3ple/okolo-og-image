export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark' | 'place';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    placeTitle: string;
    placeRegion: string;
    // theme: Theme;
    theme: string;
    md: boolean;
    fontSize: string;
    images: string[];
    widths: string[];
    heights: string[];
}
