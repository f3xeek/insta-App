import { images } from "../model.js"
export default {
    addFileToJson: (albumName, filePath) => {
        const timestamp = Date.now()
        images.push({
            id: timestamp,
            album: albumName,
            url: filePath,
            lastchange: "original",
            tags: [],
            history: [
                {
                    status: "original",
                    timestamp: timestamp
                }
            ]

        })
    },
    getImages: () => {
        return images
    },
    getImageDataByPath: (filepath) => {
        return images.find(image => image.url == filepath)
    },
    getImageById: (id) => {
        return images.find(image => image.id == id)
    },
    removeTask: (id) => {
        images.splice(images.indexOf(images.find(image => image.id == id)), 1)
    },
    patchById: (id) => {
        let image = images.find(image => image.id == id)
        if (image.lastChange == "original") {
            image.lastChange = "zmienione 1 raz"
        } else {
            let x = image.lastChange.split(" ")
            x = parseInt(x[1])
            image.lastChange = `zmienione ${x + 1} raz`
        }
        image.history.push({
            status: image.lastChange,
            timestamp: Date.now()
        })
        return image
    },
    getImagesByAlbum : (album)=>{
        return images.filter(image=> image.album == album) 
    }
}