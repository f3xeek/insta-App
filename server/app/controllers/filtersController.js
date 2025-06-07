import sharp from "sharp"
import path from "path"
import fs from "fs/promises"

export default {
    getImageMetadata: async (imagepath) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (imagepath) {
                    let meta = await sharp(imagepath)
                        .metadata()
                    resolve(meta)
                }
                else {
                    resolve("url_not_found")
                }
            } catch (err) {
                reject(err.mesage)
            }
        })
    },
    getImageWithFilter: async (filterName, filepath) => {
        let image = undefined
        switch (filterName) {
            case "grayscale":
                image = sharp(filepath).grayscale()
                break;
            case "tint":
                image = sharp(filepath).tint()
                break;
            case "negate":
                image = sharp(filepath).negate()
                break;
            case "flop":
                image = sharp(filepath).flop()
                break;
            default:
                image = sharp(filepath)
                break;
        }
        image = await image.toBuffer()
        return image
    },
    cropImageToSquare: async (albumName, filepath) =>{
        const fileName = path.basename(filepath)
        const albumDir = path.join(path.resolve(), "app/albums", albumName)
        await fs.mkdir(albumDir, { recursive: true });

        const outputPath = path.join(albumDir, fileName);
        
        const image = sharp(filepath)

        const size = 1000;
        try {
            const metadata = await image.metadata();
            const { width, height } = metadata;

            const squareSize = Math.min(width, height, size);
            const left = Math.floor((width - squareSize) / 2);
            const top = Math.floor((height - squareSize) / 2);
             await image.extract({
                left: left,
                top: top,
                width: squareSize,
                height: squareSize}).toFile(outputPath);
            return outputPath;
        } catch (error) {
            console.log(error)
            throw error
        }
        
    }
}