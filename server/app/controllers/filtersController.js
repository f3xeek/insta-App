import sharp from "sharp"
import path from "path"
import fs from "fs/promises"

export default {
    getImageMetadata: async (imagepath) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (imagepath) {
                    let meta = await sharp(imagepath).metadata();
                    resolve(meta);
                } else {
                    resolve("url_not_found");
                }
            } catch (err) {
                reject(err.mesage);
            }
        });
    },
    getImageWithFilter: async (filterNames, filepath) => {
        let image = sharp(filepath);
        for (const filterName of filterNames) {
            const lower = filterName.toLowerCase()
            switch (lower) {
                case "grayscale":
                    image = image.grayscale();
                    break;
                case "tint":
                    image = image.tint({r:200,g:100,b:16});
                    break;
                case "negate":
                    image = image.negate();
                    break;
                case "flop":
                    image = image.flop();
                    break;
                default:
                    break;
            }
        }

        const buffer = await image.toBuffer();
        return buffer;
    },

    cropImageToSquare: async (albumName, filepath) => {
        const fileName = path.basename(filepath);
        const albumDir = path.join(path.resolve(), "app/albums", albumName);
        await fs.mkdir(albumDir, { recursive: true });

        const outputPath = path.join(albumDir, fileName);

        const image = sharp(filepath);

        const size = 1000;
        try {
            const metadata = await image.metadata();
            const { width, height } = metadata;

            const squareSize = Math.min(width, height, size);
            const left = Math.floor((width - squareSize) / 2);
            const top = Math.floor((height - squareSize) / 2);
            await image
                .extract({
                    left: left,
                    top: top,
                    width: squareSize,
                    height: squareSize,
                })
                .toFile(outputPath);
            return outputPath;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};