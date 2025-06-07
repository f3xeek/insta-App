import getRequestData from "../utils.js"
import userController from "../controllers/userController.js"

const router = async (req, res) => {
    if (req.method == "GET") {
        if (req.url.match(/\/api\/user\/confirm\/(.+)/)) {
            const token = req.url.match(/\/api\/user\/confirm\/(.+)/)[1]
            const data = await userController.verifyUser(token)
            res.end(JSON.stringify(data))
        }

    } else if (req.method == "POST") {
        if (req.url == "/api/user/register") {
            const requestData = await getRequestData(req)
            const data = JSON.parse(requestData)
            const emailVerification = userController.checkEmail(data.email)
            if (emailVerification){
                if (data.name && data.email && data.lastName && data.password) {
                    const token = await userController.addNewUser(data)
                    res.end(JSON.stringify({ status: "success", message: `click this link: http://localhost:3000/api/user/confirm/${token}` }))
                } else res.end(JSON.stringify({ status: "error", message: "Empty fields" }, null, 5))
            }else res.end(JSON.stringify({status:"error", message:"email already taken"},null,5))
        } else if (req.url == "/api/user/login") {
            const requestData = await getRequestData(req)
            const data = JSON.parse(requestData)
            const validated = await userController.validateUser(data.email, data.password)
            res.end(JSON.stringify(validated, null, 5))
        }
    }
}
export default router