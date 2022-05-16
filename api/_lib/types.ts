export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark' | 'place' | "post";

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    theme: Theme;
    md: boolean;
    fontSize: string;
    images: string[];
    widths: string[];
    heights: string[];

    placeTitle: string;
    placeRegion: string;

    postTitle: string;
    postType: string;
}

export interface Params {
    fontSize: string;
    images: string[];
    widths: string[];
    heights: string[];
    theme: Theme;
    md: boolean;

    placeTitle: string;
    placeRegion: string;

    postTitle: string;
    postType: string;
}
