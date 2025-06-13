import axios from "axios"

const get = (url, token = null, options = null) =>
    new Promise((resolve, reject) => {
        if (options) {
            url += "?";
            for (const property in options) {
                url += `${property}=${options[property]}&`;
            }
        }

        const config = {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        };
        setTimeout(() => {
            axios
                .get(url, config)
                .then((response) => {
                    console.log("data", response.data);
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        }, 500);
    });

const post = (url, userObject, token = null) =>
    new Promise((resolve, reject) => {
        const config = {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        };

        setTimeout(() => {
            axios
                .post(url, userObject, config)
                .then((response) => {
                    console.log("data", response.data);
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        }, 500);
    });

const deletehttp = (url, userObject, token = null) =>
    new Promise((resolve, reject) => {
        const config = {
            withCredentials: true,
            data: userObject,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        };

        setTimeout(() => {
            axios
                .delete(url, config)
                .then((response) => {
                    console.log("data", response.data);
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        }, 500);
    });
const patch = (url, dataObject, token = null) =>
    new Promise((resolve, reject) => {
        const config = {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        };

        setTimeout(() => {
            axios
                .patch(url, dataObject, config)
                .then((response) => {
                    console.log("data", response.data);
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        }, 500);
    });


const getCurrentUser = async (token) => { return await get(`http://localhost:3000/api/profile/self`, (token = token)); };
const registerUser = async (userObject) => { return await post(`http://localhost:3000/api/user/register`, userObject); }
const loginUser = async (userObject) => { return await post(`http://localhost:3000/api/user/login`, userObject); }
const logoutUser = async (token) => { return await post(`http://localhost:3000/api/profile/logout`,  token,token ); }
const confirmUser = async (link) => { return await get(link); }
const postFile = async (formData, token) => { return await post("http://localhost:3000/api/photos", formData, token); }
const massTags = async (imageId, tagList, token) => { return await patch("http://localhost:3000/api/photos/tags/mass", { tagsId: tagList, imageId: imageId }, token); }
const postFilters = async (imageId,filters,token) =>{return await post("http://localhost:3000/api/filters/add", {imageId:imageId,filters:filters}, token)}
const searchImagesByTag = async (tag,token) =>{return await get(`http://localhost:3000/api/tags/filter/${tag}`, (token = token));}
const getProfile = async (email,token) =>{return await get(`http://localhost:3000/api/profile/${email}`, (token = token));}
const patchProfileEdit  = async (payload,token)=>{return await patch("http://localhost:3000/api/profile", {name:payload.name,lastName:payload.lastname}, token)}
const postPFP = async (formData,token) => { return await post("http://localhost:3000/api/profile",formData, token); }
const getAllTags = async (token) => {return await get("http://localhost:3000/api/tags/raw",token);}
export {
    getCurrentUser,
    registerUser,
    loginUser,
    logoutUser,
    confirmUser,
    postFile,
    massTags,
    postFilters,
    searchImagesByTag,
    getProfile,
    patchProfileEdit,
    postPFP,
    getAllTags,
};