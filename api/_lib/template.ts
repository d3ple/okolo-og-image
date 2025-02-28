
import { readFileSync } from 'fs';
import { marked } from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/rubik-v12-latin_cyrillic-regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/rubik-v12-latin_cyrillic-700.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(theme: string, fontSize: string) {
    let background, foreground, radial;

    switch (theme) {
        case 'place':
            background = 'red';
            foreground = 'white';
            radial = 'dimgray';
            break;
        case 'post':
            background = 'red';
            foreground = 'white';
            radial = 'dimgray';
            break;
         case 'dark':
            background = 'black';
            foreground = 'white';
            radial = 'dimgray';
            break;
        default:
            background = 'white';
            foreground = 'black';
            radial = 'lightgray';
            break;
    };

    let body;

    switch (theme) {
        case 'place':
            body = `
                font-family: 'Rubik', sans-serif;
                padding: 0px;
                margin: 0;
                color: white;
                height: 100vh;
                width: 100%;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
            `;
            break;
        case 'post':
            body = `
                font-family: 'Rubik', sans-serif;
                padding: 0px;
                margin: 0;
                color: white;
                height: 100vh;
                width: 100%;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
            `;
            break;
        default:
            body = `
                background: ${background};
                background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
                background-size: 100px 100px;
                height: 100vh;
                display: flex;
                text-align: center;
                align-items: center;
                justify-content: center;
            `;
            break;
    }

    return `
    @font-face {
        font-family: 'Rubik';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Rubik';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        ${body}
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 75px;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .heading {
        font-family: 'Rubik', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        line-height: 1.2;
    }
    
    .place-inner {
        background-color: rgba(24, 24, 27, 0.7);
        width: 100%;
        height: 100%;
        padding: 130px 110px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: relative;
        box-sizing: border-box;
    }

    .place-logo {
        line-height: 1.5;
        position: absolute;
        top: 32px;
        right: 110px;
        font-size: 40px;
    }

    .place-logo:after {
        content: '';
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 100%;
        height: 6px;
        background-color: rgba(163, 230, 53, 1);
        border-radius: 6px;
    }

    .place-title {
        font-size: 100px;
        line-height: 1;
        font-weight: bold;
        margin-bottom: 40px;
        max-width: 90%;
    }

    .place-subtitle {
        font-size: 60px;
        line-height: 1;
        margin: 0px;
    }

    .post-inner {
        background-color: rgba(24, 24, 27, 0.7);
        width: 100%;
        height: 100%;
        padding: 180px 210px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        box-sizing: border-box;
    }

    .post-type {
        font-size: 45px;
        line-height: 1;
        margin-bottom: 32px;
        text-align: center;
        color: #ec4899;
        font-weight: bold;
    }

    .post-title {
        font-size: 100px;
        line-height: 1.1;
        font-weight: bold;
        margin: 0px;
        text-align: center;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, md, fontSize, images, widths, heights, placeTitle, placeRegion, postTitle, postType } = parsedReq;

    switch (theme) {
        case 'place':
            return `<!DOCTYPE html>
                <html>
                    <meta charset="utf-8">
                    <title>og:image для страницы места</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style>
                        ${getCss(theme, fontSize)}
                    </style>
                    <body style="background-image: url('${images[0]}');">
                        <div class="place-inner">
                            <p class="place-logo">okolo.city</p>
                            <h1 class="place-title">
                                ${sanitizeHtml(placeTitle)}
                            </h1>
                            <p class="place-subtitle">
                                ${sanitizeHtml(placeRegion)}
                            </p>
                        </div>
                    </body>
                </html>`;

        case 'post':
            return `<!DOCTYPE html>
                <html>
                    <meta charset="utf-8">
                    <title>og:image для страницы поста</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style>
                        ${getCss(theme, fontSize)}
                    </style>
                    <body style="background-image: url('${images[0]}');">
                        <div class="post-inner">
                            <p class="place-logo">okolo.city</p>
                            <p class="post-type">
                                ${sanitizeHtml(postType)}
                            </p>
                            <h1 class="post-title">
                                ${sanitizeHtml(postTitle)}
                            </h1>
                        </div>
                    </body>
                </html>`;

        default:
            return `<!DOCTYPE html>
                <html>
                    <meta charset="utf-8">
                    <title>og:image для страницы ...</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style>
                        ${getCss(theme, fontSize)}
                    </style>
                    <body>
                        <div>
                            <div class="spacer">
                            <div class="logo-wrapper">
                                ${images.map((img, i) =>
                                    getPlusSign(i) + getImage(img, widths[i], heights[i])
                                ).join('')}
                            </div>
                            <div class="spacer">
                            <div class="heading">
                            ${emojify(md ? marked(text) : sanitizeHtml(text))}
                            </div>
                        </div>
                    </body>
                </html>`;
    }
}

function getImage(src: string, width = 'auto', height = '225') {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}

function getPlusSign(i: number) {
    return i === 0 ? '' : '<div class="plus">+</div>';
}
