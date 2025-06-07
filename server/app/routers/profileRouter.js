import userController from "../controllers/userController.js"
import fileController from "../controllers/fileController.js"
import jsonController from "../controllers/jsonController.js"
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
    }else if (req.method == "POST"){
        if(req.url == "/api/profile"){
            let form = formidable({})
                form.uploadDir = fileController.getTempFileDir()
                form.keepExtensions = true
                form.parse(req, (err, fields, files) => {
                    const filepath = fileController.fileMoveToAlbum(email, files.file.path)
                    jsonController.addFileToJson(email, filepath)
                    if(userController.setPfp(email,filepath))sendSuccess(res,"Pfp set")
                    else sendError(res,"something bad happened")
                })  
        }else if(req.url == "/api/profile/logout"){
            const token = req.headers.authorization.split(" ")[1];
            if(userController.deactivateToken(token)) sendSuccess(res,"user logged out")
        }else sendError(res, "Nie ma takiego adresu")
    }
}
export default router