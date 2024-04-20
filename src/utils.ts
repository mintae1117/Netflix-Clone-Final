import noImg from "../public/image-not-found-scaled-1150x647.png"

export function makeImagePath(id: string, format?: string) {
    if(id == "" || id == null || id == undefined){
        return noImg;
    }
    return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
