import userController from "../controllers/userController.js" 
const router = async (req, res, email) => {
    if (req.method == "GET") {
        if (req.url.match(/\/api\/profile\/([\w.-]+@[\w-]+\.[\w.-]{2,4})$/)) {
            const currentId = req.url.match(/\/api\/profile\/([\w.-]+@[\w-]+\.[\w.-]{2,4})$/)[1]
            res.end(JSON.stringify(userController.getProfileData(currentId),null,5))
        } else if(req.url == "/api/profile/self"){
            res.end(JSON.stringify(userController.getProfileData(email),null,5));
        } else res.end(JSON.stringify({status:"error", message:"URL not found"},null,5))
    }
}
export default router