import getRequestData, {sendError, sendSuccess} from "../utils.js"
import userController from "../controllers/userController.js"

const router = async (req, res) => {
    if (req.method == "GET") {
        if (req.url.match(/\/api\/user\/confirm\/(.+)/)) {
            const token = req.url.match(/\/api\/user\/confirm\/(.+)/)[1]
            const data = await userController.verifyUser(token)
            if(data.status)sendSuccess(res,"user confirmed")
            else sendError(res, data.message)

        }

    } else if (req.method == "POST") {
        if (req.url == "/api/user/register") {
            const requestData = await getRequestData(req)
            const data = JSON.parse(requestData)
            const emailVerification = userController.checkEmail(data.email)
            if (emailVerification){
                if (data.name && data.email && data.lastName && data.password) {
                    const token = await userController.addNewUser(data)
                    const message = `click this link: http://localhost:3000/api/user/confirm/${token}`
                    sendSuccess(res, {message:message})
                } else sendError(res, "Empty fields")
            }else sendError(res, "email already taken");
        } else if (req.url == "/api/user/login") {
            const requestData = await getRequestData(req)
            const data = JSON.parse(requestData)
            const validated = await userController.validateUser(data.email, data.password)
            if (validated.status)sendSuccess(res,validated.token)
            else sendError(res, validated.message)
        }
    }
}
export default router