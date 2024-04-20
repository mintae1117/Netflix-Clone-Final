import noImg from "../public/NoImageLarge.png"

export function makeImagePath(id: string, format?: string) {
    if(id === undefined || id === null){
        return noImg;
    }
    return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
