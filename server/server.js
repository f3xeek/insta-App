import { createServer } from 'http';
import 'dotenv/config'
import imageRouter from "./app/routers/imagesRouter.js";
import tagsRouter from "./app/routers/tagsRouter.js";
import filtersRouter from "./app/routers/filtersRouter.js";
import getImageRouter from "./app/routers/getImageRouter.js"
import usersRouter from "./app/routers/userRouter.js"
import profileRouter from "./app/routers/profileRouter.js"
import userController from './app/controllers/userController.js';
import { sendError } from './app/utils.js';


createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*, Authorization, Content-Type');

    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
    }
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        const token = req.headers.authorization.split(" ")[1]
        const logged = userController.validateUserByToken(token)
        if (logged && userController.checkToken(token)) {
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
                await profileRouter(req, res, logged);
            }
        } else sendError(res, "User not logged in.");
    } else if (req.url.search("/api/user") != -1) {
        await usersRouter(req, res)
    } else sendError(res, "User not logged in.")

})
    .listen(process.env.APP_PORT, () => console.log("listen on " + process.env.APP_PORT))
