    // using a Promise, the code encapsulates the image loading operation and provides a way to handle the result (the loaded image) when it becomes available
    export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}
// async function to get levels data from json file
export async function loadLevel(name) {
    const res = await fetch(`/levels/${name}.json`);
    const json = await res.json();
    return json;
}