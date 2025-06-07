import jsonController from "../controllers/jsonController.js"
import fileController from "../controllers/fileController.js"
import formidable from 'formidable';
import getRequestData, {sendError,sendSuccess} from "../utils.js";
import tagsController from "../controllers/tagsController.js";

const router = async (req, res) => {

    switch (req.method) {
        case "GET":
            if (req.url === "/api/photos") {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                sendSuccess(res,jsonController.getImages())
            } else if (req.url.match(/\/api\/photos\/([0-9]+)/)) {
                res.writeHead(200, { 'Content-Type': 'application/json' });

                const currentId = req.url.match(/\/api\/photos\/([0-9]+)/)[1]
                const image = jsonController.getImageById(currentId)

                if (image) sendSuccess(res,image)
                else sendError(res, "nie ma takiego id");
            } else if (req.url.match(/\/api\/photos\/tags\/([0-9]+)/)) {
                const currentId = req.url.match(/\/api\/photos\/tags\/([0-9]+)/)[1]
                const image = jsonController.getImageById(currentId)

                if (image) sendSuccess(res, image.tags)
                else sendError(res, "nie ma takiego id")
            }
            else {
                sendError(res, "nie ma takiego adresu")
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
                        sendSuccess(res,jsonController.getImageDataByPath(filepath))
                    } else {
                        sendError(res, "nie podano nazwy albumu")
                        return
                    }
                })
            }
            break;
        case "PATCH":
            if (req.url.match(/\/api\/photos\/([0-9]+)/)) {
                const currentId = req.url.match(/\/api\/photos\/([0-9]+)/)[1]
                if (jsonController.getImageById(currentId)) {
                    sendSuccess(res, jsonController.patchById(currentId));
                } else sendError(res,"nie ma takiego id")
            } else if (req.url === "/api/photos/tags") {
                const requestData = await getRequestData(req)
                const parsedRequestData = JSON.parse(requestData)
                const image = jsonController.getImageById(parsedRequestData.imageId)
                const tag = tagsController.getTagById(parsedRequestData.tagId)
                if (image && tag) {
                    if (!image.tags.includes(tag.name)) {
                        image.tags.push(tag.name)
                        sendSuccess(res,image)
                    } else {
                        sendError(res, "to zdjęcie ma już taki tag");
                    }
                } else {
                    sendError(res, "Zdjecie lub tag o takim id nie istnieja");
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
                sendSuccess(res,image)
            }
            else {
                sendError(res, "Patch nie ma takiego adresu");
            }
            break;
        case "DELETE":
            if (req.url.match(/\/api\/photos\/([0-9]+)/)) {
                const currentId = req.url.match(/\/api\/photos\/([0-9]+)/)[1]
                if (jsonController.getImageById(currentId)) {
                    fileController.removeFile(jsonController.getImageById(currentId).url)
                    jsonController.removeTask(currentId)
                   sendSuccess(res, {message:"Poprawnie usunięto zdjecie o id = " + currentId})
                } else sendError(res,"nie ma takiego id")

            }
            break;
    }
}

export default router