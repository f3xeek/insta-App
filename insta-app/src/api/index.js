import axios from "axios"

const get = (url, token = null, options = null) =>
new Promise((resolve, reject) => {
    if (options){
        url += "?";
        for (const property in options) {
        url += `${property}=${options[property]}&`;}
    }

    const config = {
    withCredentials: true,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    };
    console.log(url);
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


const getCurrentUser = async (token) =>{return await get(`http://localhost:3000/api/profile/self`, (token = token));};
const registerUser = async (userObject) =>{ return await  post(`http://localhost:3000/api/user/register`, userObject);}
const loginUser = async (userObject) => { return await post(`http://localhost:3000/api/user/login`, userObject); }
const logoutUser = async () => {return await post(`http://localhost:3000/api/profile/logout`, {token});}
const confirmUser = async (link) =>{ return await get(link);}
const postFile  = async (formData) => { return await post("http://localhost:3000/api/photos/", formData);}
const massTags = async (imageId, tagList) => {return await post("http://localhost:3000/api/photos/tags/mass", {tagsId:tagList, imageId:imageId});}

export {
    getCurrentUser,
    registerUser,
    loginUser,
    logoutUser,
    confirmUser,
    postFile,
    massTags,
};