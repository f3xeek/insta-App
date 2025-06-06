import jsonController from "../controllers/jsonController.js"
import fileController from "../controllers/fileController.js"
import formidable from 'formidable';
import getRequestData from "../utils.js";
import tagsController from "../controllers/tagsController.js";

const router = async (req, res) => {

    switch (req.method) {
        case "GET":
            if (req.url === "/api/photos") {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(jsonController.getImages()));
            } else if (req.url.match(/\/api\/photos\/([0-9]+)/)) {
                res.writeHead(200, { 'Content-Type': 'application/json' });

                const currentId = req.url.match(/\/api\/photos\/([0-9]+)/)[1]
                const image = jsonController.getImageById(currentId)

                if (image) res.end(JSON.stringify(image, null, 5))
                else res.end(JSON.stringify({ status: "error", message: "nie ma takiego id" }))
            } else if (req.url.match(/\/api\/photos\/tags\/([0-9]+)/)) {
                const currentId = req.url.match(/\/api\/photos\/tags\/([0-9]+)/)[1]
                const image = jsonController.getImageById(currentId)

                if (image) res.end(JSON.stringify(image.tags, null, 5))
                else res.end(JSON.stringify({ status: "error", message: "nie ma takiego id" }))
            }
            else {
                res.end(JSON.stringify({ status: "error", message: "nie ma takiego adresu" }))
            }
            break;

        case "POST":

            if (req.url == "/api/photos") {
                let form = formidable({})
                form.uploadDir = fileController.getTempFileDir()
                form.keepExtensions = true
                form.parse(req, (err, fields, files) => {
                    if (fields.album) {
                        const filepath = fileController.fileMoveToAlbum(fields.album, files.file.path)
                        jsonController.addFileToJson(fields.album, filepath)
                        res.end(JSON.stringify(jsonController.getImageDataByPath(filepath), null, 5))
                    } else {
                        res.end("Nie podano nazwy albumu")
                        return
                    }
                })
            }
            break;
        case "PATCH":
            if (req.url.match(/\/api\/photos\/([0-9]+)/)) {
                const currentId = req.url.match(/\/api\/photos\/([0-9]+)/)[1]
                if (jsonController.getImageById(currentId)) {
                    res.end(JSON.stringify(jsonController.patchById(currentId), null, 5))
                } else res.end(JSON.stringify({ status: "error", message: "nie ma takiego id" }))
            } else if (req.url === "/api/photos/tags") {
                const requestData = await getRequestData(req)
                const parsedRequestData = JSON.parse(requestData)
                const image = jsonController.getImageById(parsedRequestData.imageId)
                const tag = tagsController.getTagById(parsedRequestData.tagId)
                if (image && tag) {
                    if (!image.tags.includes(tag.name)) {
                        image.tags.push(tag.name)
                        res.end(JSON.stringify(image, null, 5))
                    } else {
                        res.end(JSON.stringify({ status: "error", message: "to zdjęcie ma już taki tag" }, null, 5))
                    }
                } else {
                    res.end(JSON.stringify({ status: "error", message: "Zdjecie lub tag o takim id nie istnieja" }, null, 5))
                }
            } else if (req.url === "/api/photos/tags/mass") {
                const requestData = await getRequestData(req)
                const parsedRequestData = JSON.parse(requestData)
                const image = jsonController.getImageById(parsedRequestData.imageId)
                parsedRequestData.tagsId.forEach(tagId => {
                    const tag = tagsController.getTagById(tagId)
                    if (image && tag) {
                        if (!image.tags.includes(tag.name)) {
                            image.tags.push(tag.name)
                        }
                    }
                });
                res.end(JSON.stringify(image, null, 5))
            }
            else {
                res.end(JSON.stringify({ status: "error", message: "Patch nie ma takiego adresu" }, null, 5))
            }
            break;
        case "DELETE":
            if (req.url.match(/\/api\/photos\/([0-9]+)/)) {
                const currentId = req.url.match(/\/api\/photos\/([0-9]+)/)[1]
                if (jsonController.getImageById(currentId)) {
                    fileController.removeFile(jsonController.getImageById(currentId).url)
                    jsonController.removeTask(currentId)
                    res.end(JSON.stringify({ status: "success", message: "Poprawnie usunięto zdjecie o id = " + currentId }))
                } else res.end(JSON.stringify({ status: "error", message: "nie ma takiego id" }))

            }
            break;
    }
}

export default router