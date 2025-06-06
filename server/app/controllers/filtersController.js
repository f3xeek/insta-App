import sharp from "sharp"
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
    }
}