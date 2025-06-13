import { verifiedUsers, unverifiedUsers, blacklist } from "../model.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import jsonController from "./jsonController.js";

const { sign, verify } = jsonwebtoken;
const { hash, compare } = bcryptjs;

export default {
    async addNewUser(userData) {
        const pass = await hash(userData.password, 10);
        delete userData.password;
        const token = sign(
            { ...userData, password: pass },
            process.env.PRIVATE_KEY,
            { expiresIn: "1m" }
        );
        unverifiedUsers.push({ token: token, email: userData.email });
        return token;
    },
    async verifyUser(token) {
        const user = unverifiedUsers.filter((user) => user.token == token)[0];
        if (user) {
            try {
                const decoded = verify(token, process.env.PRIVATE_KEY);
                verifiedUsers.push({ ...decoded, id: Date.now(), pfp: null });
                unverifiedUsers.splice(unverifiedUsers.indexOf(user), 1);
                return { status: true };
            } catch (ex) {
                return { status: false, message: "token Expired" };
            }
        } else return { status: false, message: "noTokenFound" };
    },
    async validateUser(email, password) {
        const user = verifiedUsers.filter((user) => user.email == email)[0];
        if (user) {
            const validated = await compare(password, user.password);
            if (validated) {
                const token = sign(
                    { email: user.email },
                    process.env.PRIVATE_KEY,
                    {
                        expiresIn: "1h",
                    }
                );
                return { status: true, token: token };
            } else return { status: false, message: "incorrect credentials" };
        } else return { status: false, message: "no user with this email" };
    },
    validateUserByToken(token) {
        try {
            const decoded = verify(token, process.env.PRIVATE_KEY);
            if (decoded) {
                const veri = verifiedUsers.some(
                    (user) => user.email == decoded.email
                );
                if (veri) return decoded.email;
            }
        } catch (e) {
            return false;
        }
    },
    getProfileData(email) {
        console.log(unverifiedUsers);
        const user = verifiedUsers.filter((user) => user.email == email)[0];
        if (user) {
            const data = {
                name: user.name,
                lastName: user.lastName,
                pfp: user.pfp,
            };
            return {
                status: true,
                data: data,
                images: jsonController.getImagesByAlbum(email),
            };
        } else return { status: "error", message: "No user with That email." };
    },
    changeUserData(data, email) {
        try {
            const user = verifiedUsers.filter((user) => user.email == email)[0];
            Object.assign(user, data);
            return { status: true };
        } catch (e) {
            return { status: false, message: e };
        }
    },
    checkEmail(email) {
        const user = verifiedUsers.filter((user) => user.email == email)[0];
        const unverifiedUser = unverifiedUsers.filter(
            (user) => user.email == email
        )[0];
        if (user || unverifiedUser) return false;
        return true;
    },
    setPfp(email, id) {
        const user = verifiedUsers.filter((user) => user.email == email)[0];
        if (user.pfp) jsonController.removeTask(user.pfp);
        user.pfp = id;
        return true;
    },
    deactivateToken(token) {
        blacklist.push(token);
        return true;
    },
    checkToken(token) {
        return !blacklist.includes(token);
    },
};