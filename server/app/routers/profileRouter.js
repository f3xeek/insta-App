import userController from "../controllers/userController.js"
import fileController from "../controllers/fileController.js"
import getRequestData, {sendError,sendSuccess} from "../utils.js"
import formidable from "formidable"
const router = async (req, res, email) => {
    if (req.method == "GET") {
        if (req.url.match(/\/api\/profile\/([\w.-]+@[\w-]+\.[\w.-]{2,4})$/)) {
            const currentId = req.url.match(/\/api\/profile\/([\w.-]+@[\w-]+\.[\w.-]{2,4})$/)[1]
            const profileData = userController.getProfileData(currentId);
            if (profileData.status) sendSuccess(res, {images:profileData.images, data:profileData.data})
            else sendError(res, "getting data failed")
        } else if(req.url == "/api/profile/self"){
            const profileData = userController.getProfileData(email);
            if (profileData.status) sendSuccess(res, {images:profileData.images, data:profileData.data})
            else sendError(res, "getting data failed")
        } else sendError(res, "nie ma takiego adresu")
    }else if (req.method == "PATCH"){
        if(req.url == "/api/profile"){
            const body = await JSON.parse(await getRequestData(req));
            const result = userController.changeUserData(body, email)
            if (result.status) sendSuccess(res, "profile updated")
            else sendError(res, result.message)
        }
    }
}
export default router