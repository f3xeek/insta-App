import { createServer } from 'http';
import 'dotenv/config'
import imageRouter from "./app/routers/imagesRouter.js";
import tagsRouter from "./app/routers/tagsRouter.js";
import filtersRouter from "./app/routers/filtersRouter.js";
import getImageRouter from "./app/routers/getImageRouter.js"
import usersRouter from "./app/routers/userRouter.js"
import profileRouter from "./app/routers/profileRouter.js"
import userController from './app/controllers/userController.js';
createServer(async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        const token = req.headers.authorization.split(" ")[1]
        const logged = userController.validateUserByToken(token)
        if (logged) {
            if (req.url.search("/api/photos") != -1) {
                await imageRouter(req, res)
            }
            else if (req.url.search("/api/tags") != -1) {
                await tagsRouter(req, res)
            } else if (req.url.search("/api/filters") != -1) {
                await filtersRouter(req, res)
            } else if (req.url.search("/api/getimage") != -1) {
                await getImageRouter(req, res)
            } else if (req.url.search("/api/profile") != -1) {
                await profileRouter(req, res)
            }
        } else res.end(JSON.stringify({ status: "error", message: "User not logged in." }))
    } else if (req.url.search("/api/user") != -1) {
        await usersRouter(req, res)
    } else res.end(JSON.stringify({ status: "error", message: "User not logged in." }))

})
    .listen(process.env.APP_PORT, () => console.log("listen on " + process.env.APP_PORT))
