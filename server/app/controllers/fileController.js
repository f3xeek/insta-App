import path from "path"
import fs from "fs"

const __dirname = path.resolve()

export default {
    getTempFileDir: () => {
        return path.join(__dirname, "temp")
    },
    fileMoveToAlbum: (albumName, filePath) => {
        if (!fs.existsSync(path.join(__dirname, "app/albums", albumName))) {
            fs.mkdir(path.join(__dirname, "app/albums", albumName), (err) => { if (err) throw err })
        }
        const parts = filePath.split("\\")
        const outputPath = path.join(__dirname, "app/albums", albumName, parts[parts.length - 1])
        fs.rename(filePath, outputPath, (err) => { if (err) throw err })
        return outputPath
    },
    removeFile: (filepath) => {
        if (fs.existsSync(filepath)) {
            fs.rm(filepath, (err => { if (err) throw err }))
        }
    },

}