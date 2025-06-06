import jsonController from "../controllers/jsonController.js"
import filtersController from "../controllers/filtersController.js"
const router = async (req, res) => {
    if (req.method == "GET") {
        if (req.url.match(/\/api\/getimage\/([0-9]+)$/)) {
            const currentId = req.url.match(/\/api\/getimage\/([0-9]+)$/)[1]
            const image = jsonController.getImageById(currentId)
            if (image) {
                const imageFile = await filtersController.getImageWithFilter('', image.url)
                console.log(imageFile)
                res.end(imageFile)
            }
        } else if (req.url.match(/\/api\/getimage\/([0-9]+)\/filter\/([a-z]+)$/)) {
            const matches = req.url.match(/\/api\/getimage\/([0-9]+)\/filter\/([a-z]+)$/)
            const image = jsonController.getImageById(matches[1])
            if (matches[1] && matches[2] && image) {
                const imageFile = await filtersController.getImageWithFilter(matches[2], image.url)
                res.end(imageFile)
            }
        }
    }
}
export default router