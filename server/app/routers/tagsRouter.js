import tagsController from "../controllers/tagsController.js"
import getRequestData from "../utils.js"
const router = async (req, res) => {
    switch (req.method) {
        case "GET":
            if (req.url.match(/\/api\/tags\/([0-9]+)/)) {
                const currentId = req.url.match(/\/api\/tags\/([0-9]+)/)[1]
                const tag = tagsController.getTagById(currentId)
                if (tag) res.end(JSON.stringify(tag, null, 5))
                else res.end(JSON.stringify({ status: "error", message: "nie ma takiego id" }))

            } else if (req.url == "/api/tags/raw") {
                const alltags = tagsController.getTagsList()
                res.end(JSON.stringify(alltags, null, 5))
            } else if (req.url == "/api/tags") {
                res.end(JSON.stringify(tagsController.getAllTags(), null, 5))
            } else {
                res.end(JSON.stringify({ status: "error", message: "nie ma takiego adresu" }))
            }
            break;
        case "POST":
            if (req.url == "/api/tags") {
                let body = await getRequestData(req)
                if (body != '') body = await JSON.parse(body)
                const tag = tagsController.addNewTag(body.tag)

                if (tag) {
                    res.end(JSON.stringify(tag, null, 5))
                } else res.end(JSON.stringify({ status: "error", message: "cos poszło nie tak" }))

            } else res.end(JSON.stringify({ status: "error", message: "nie ma takiego adresu" }))

    }
}

export default router