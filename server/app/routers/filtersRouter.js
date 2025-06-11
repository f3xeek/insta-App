import jsonController from "../controllers/jsonController.js";
import filtersController from "../controllers/filtersController.js";
import getRequestData, {sendError,sendSuccess} from "../utils.js";
const router = async (req, res) => {
    switch (req.method) {
        case "GET":
            if (req.url.match(/\/api\/filters\/metadata\/([0-9]+)/)) {
                const currentId = req.url.match(/\/api\/filters\/metadata\/([0-9]+)/)[1]
                const image = jsonController.getImageById(currentId)
                if (image) {
                    const metadata = await filtersController.getImageMetadata(image.url)
                    sendSuccess(res,metadata)
                } else {
                    sendError(res, "nie ma takiego id");
                }
            }
            break;
        case "POST":
            if(req.url=="/api/filters/add"){
                const data = await JSON.parse(await getRequestData(req))
                const image = jsonController.getImageById(data.imageId)
                if (image) {
                    image.filters = data.filters
                    sendSuccess(res,image)
                } else {
                    sendError(res, "nie ma takiego id");
                }
            }
        case "PATCH":
            if (req.url == "/api/filters") {
                const requestData = await getRequestData(req)
                const data = JSON.parse(requestData)
                const image = jsonController.getImageById(data.id)
                image.history.push({ status: data.filterName, lastModifiedDate: Date.now() })
                sendSuccess(res,image)
                break;
            }
    }
}
export default router