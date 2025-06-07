import { verifiedUsers, unverifiedUsers, images } from "../model.js";
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import jsonController from "./jsonController.js";

const { sign, verify } = jsonwebtoken;
const { hash, compare } = bcryptjs;

export default {
    async addNewUser(userData) {
        const pass = await hash(userData.password, 10)
        delete userData.password
        const token = sign({ ...userData, password: pass },
            process.env.PRIVATE_KEY,
            { expiresIn: "1m" }
        )
        unverifiedUsers.push({ token: token })
        return token
    },
    async verifyUser(token) {
        const user = unverifiedUsers.filter(user => user.token == token)[0]
        if (user) {
            try {
                const decoded = verify(token, process.env.PRIVATE_KEY)
                verifiedUsers.push({ ...decoded, id: Date.now(), pfp:null})
                unverifiedUsers.splice(unverifiedUsers.indexOf(user), 1)
                return { status: "ok" }
            } catch (ex) {
                return { status: "error", message: "token Expired" }
            }
        } else return { status: "error", message: "noTokenFound" }
    },
    async validateUser(email, password) {
        const user = verifiedUsers.filter(user => user.email == email)[0]
        if (user) {
            const validated = await compare(password, user.password)
            if (validated) {
                const token = sign({ email: user.email },
                    process.env.PRIVATE_KEY,
                    { expiresIn: "1h" }
                )
                return { status: "success", token: token }
            } else return { status: "error", message: "incorrect credentials" }
        } else return { status: "error", message: "no user with this email" }
    },
    validateUserByToken(token) {
        try {
            const decoded = verify(token, process.env.PRIVATE_KEY)
            if (decoded) {
                const veri = verifiedUsers.some(user => user.email == decoded.email)
                if (veri) return decoded.email
            }
        } catch (e) { return false }
    },
    getProfileData(email){
        const user = verifiedUsers.filter((user) => user.email == email)[0];
        if(user){
            const data = {name:user.name, lastName:user.lastName, pfp:user.pfp}
            return {status:"success", data:data, images:jsonController.getImagesByAlbum(email)}
        }else return {status:"error", message:"No user with That email."}
    }
}