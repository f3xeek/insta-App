import jsonController from "../controllers/jsonController.js"
import filtersController from "../controllers/filtersController.js"
const router = async (req, res) => {
    if (req.method == "GET") {
        if (req.url.match(/\/api\/getimage\/([0-9]+)\??[0-9]*$/)) {
            const currentId = req.url.match(/\/api\/getimage\/([0-9]+)\??[0-9]*$/)[1]
            const image = jsonController.getImageById(currentId)
            if (image) {
                const imageFile = await filtersController.getImageWithFilter(image.filters, image.url)
                res.end(imageFile)
            }
        } else if (req.url.match(/\/api\/getimage\/([0-9]+)\/filter\/([a-zA-Z,]+)$/)) {
            const matches = req.url.match(/\/api\/getimage\/([0-9]+)\/filter\/([a-zA-Z,]+)$/)
            const image = jsonController.getImageById(matches[1])
            const filterList = matches[2].split(",");
            if (filterList.length>0&& image) {
                const imageFile = await filtersController.getImageWithFilter(filterList, image.url)
                res.end(imageFile)
            }
        }
    }
}
export default router