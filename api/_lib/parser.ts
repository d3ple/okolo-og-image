import { IncomingMessage } from 'http';
import { parse } from 'url';
// import { ParsedRequest, Theme } from './types';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { fontSize, images, widths, heights, theme, md, placeTitle = "", placeRegion = '' } = (query || {});

    if (Array.isArray(fontSize)) {
        throw new Error('Expected a single fontSize');
    }
    if (Array.isArray(theme)) {
        throw new Error('Expected a single theme');
    }
    
    const arr = (pathname || '/').slice(1).split('.');
    let extension = '';
    let text = '';
    if (arr.length === 0) {
        text = '';
    } else if (arr.length === 1) {
        text = arr[0];
    } else {
        extension = arr.pop() as string;
        text = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text),
        placeTitle: decodeURIComponent(Array.isArray(placeTitle) ? placeTitle[0] : placeTitle ),
        placeRegion: decodeURIComponent(Array.isArray(placeRegion) ? placeRegion[0] : placeRegion),
        theme: theme || 'light',
        md: md === '1' || md === 'true',
        fontSize: fontSize || '96px',
        images: getArray(images),
        widths: getArray(widths),
        heights: getArray(heights),
    };
    parsedRequest.images = getDefaultImages(parsedRequest.images, parsedRequest.theme);
    return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
    if (typeof stringOrArray === 'undefined') {
        return [];
    } else if (Array.isArray(stringOrArray)) {
        return stringOrArray;
    } else {
        return [stringOrArray];
    }
}

function getDefaultImages(images: string[], theme: string): string[] {
    const defaultImage = theme === 'light'
        ? 'https://okolo.city/storage/logo/logo.svg'
        : 'https://okolo.city/storage/logo/logo.svg';

    if (!images || !images[0]) {
        return [defaultImage];
    }
    if (!images[0].startsWith('https://okolo.city/') && !images[0].startsWith('https://cdn.okolo.city/')) {
        images[0] = defaultImage;
    }

    return images;
}
