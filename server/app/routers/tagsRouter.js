import tagsController from "../controllers/tagsController.js"
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
            } else {
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