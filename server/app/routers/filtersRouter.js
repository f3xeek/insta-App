import jsonController from "../controllers/jsonController.js";
import filtersController from "../controllers/filtersController.js";
import getRequestData from "../utils.js";
const router = async (req, res) => {
    switch (req.method) {
        case "GET":
            if (req.url.match(/\/api\/filters\/metadata\/([0-9]+)/)) {
                const currentId = req.url.match(/\/api\/filters\/metadata\/([0-9]+)/)[1]
                const image = jsonController.getImageById(currentId)
                if (image) {
                    const metadata = await filtersController.getImageMetadata(image.url)
                    res.end(JSON.stringify(metadata, null, 5))
                } else {
                    res.end(JSON.stringify({ message: "nie ma takiego id" }))
                }
            }
            break;
        case "PATCH":
            if (req.url == "/api/filters") {
                const requestData = await getRequestData(req)
                const data = JSON.parse(requestData)
                const image = jsonController.getImageById(data.id)
                image.history.push({ status: data.filterName, lastModifiedDate: Date.now() })
                break;
            }
    }
}
export default router