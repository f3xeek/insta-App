import path from "path"
import fs from "fs/promises"

const __dirname = path.resolve()

export default {
    getTempFileDir: () => {
        return path.join(__dirname, "temp")
    },
    fileMoveToAlbum: async (albumName, filePath) => {
        try  {
            const albumDir = path.join(__dirname, "app/albums", albumName)
            await fs.mkdir(albumDir, { recursive: true })

            const fileName = path.basename(filePath)
            const outputPath = path.join(albumDir, fileName)

            await fs.rename(filePath, outputPath)

            return outputPath
        } catch (err) {
            console.error("Error moving file:", err)
            throw err
        }
    },
    removeFile: (filepath) => {
        if (fs.existsSync(filepath)) {
            fs.rm(filepath, (err => { if (err) throw err }))
        }
    },

}