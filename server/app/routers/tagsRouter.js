import tagsController from "../controllers/tagsController.js"
import jsonController from "../controllers/jsonController.js"
import getRequestData, {sendError,sendSuccess} from "../utils.js"
const router = async (req, res) => {
    switch (req.method) {
        case "GET":
            if (req.url.match(/\/api\/tags\/([0-9]+)/)) {
                const currentId = req.url.match(/\/api\/tags\/([0-9]+)/)[1]
                const tag = tagsController.getTagById(currentId)
                if (tag) sendSuccess(res,tag)
                else sendError(res, "nie ma takiego id");

            } else if (req.url == "/api/tags/raw") {
                const alltags = tagsController.getTagsList()
                sendSuccess(res, alltags)
            } else if (req.url == "/api/tags") {
                sendSuccess(res, tagsController.getAllTags());
            } else if (req.url.match(/\/api\/tags\/filter\/([a-zA-Z]*)/)) {
                const alltags = tagsController.getTagsList();
                const matches = req.url.match(/\/api\/tags\/filter\/([a-zA-Z]+)/)
                const images = jsonController.getImages()
                if(!matches) sendSuccess(res, images)
                else{
                    const tagName = matches[1]
                    const selectedTags = []
                    const selectedImages = []
                    alltags.forEach(tag=>{
                        if (tag.includes(tagName)) selectedTags.push(tag);
                    })
                    
                    images.forEach(image=>{
                        if (image.tags.some((tag) => selectedTags.includes(tag)))
                            selectedImages.push(image)
                    })
                    sendSuccess(res, selectedImages);
                }
            }else {
                sendError(res,"nie ma takiego adresu")
            }
            break;
        case "POST":
            if (req.url == "/api/tags") {
                let body = await getRequestData(req)
                if (body != '') body = await JSON.parse(body)
                const tag = tagsController.addNewTag(body.tag)

                if (tag) {
                    sendSuccess(res,tag)
                } else sendError(res, "cos poszło nie tak");

            } else sendError(res, "nie ma takiego adresu")

    }
}

export default router