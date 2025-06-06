import axios from "axios"

const get = (url, options={}) => new Promise((resolve, reject) => {
    url+="?"
    for (const property in options){
      url +=`${property}=${options[property]}&`
    }
    setTimeout(() => {
        axios
          .get(url, { withCredentials: true })
          .then((response) => {
            console.log("data", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
    }, 500)
})

const post = (url, userObject) => new Promise((resolve, reject) => {
    setTimeout(() => {
        axios.post(url, userObject, { withCredentials: true }) // nagłówek obsługiwany na serwerze
            .then(response => {
                console.log("data", response.data);
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })

    }, 500);

})
const deletehttp = (url, userObject) => new Promise((resolve, reject) => {
    setTimeout(() => {
        axios.delete(url, {data:userObject, withCredentials: true }) // nagłówek obsługiwany na serwerze
            .then(response => {
                console.log("data", response.data);
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })

    }, 500);

})



const getProduct = (id) => get(`http://localhost:3000/product/${id}`)
const getCurrentUser = () => get(`http://localhost:3000/getCurrentUser`);
const registerUser = (userObject) => post(`http://localhost:3000/createUser`, userObject);
const loginUser = async (userObject) => { return await post(`http://localhost:3000/loginUser`, userObject); }
const logoutUser = async () => {return await get(`http://localhost:3000/logoutUser`);}

export {
  getProduct,
  getCurrentUser,
  registerUser,
  loginUser,
  logoutUser,
  
};