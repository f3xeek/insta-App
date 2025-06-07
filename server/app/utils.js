const getRequestData = async (req) => {

    return new Promise((resolve, reject) => {
        try {
            let body = "";

            req.on("data", (part) => {
                body += part.toString();
            });

            req.on("end", () => {
                resolve(body);
            });

        } catch (error) {
            reject(error);
        }
    })
}
const sendError = async (res,message) =>{
    const response = JSON.stringify({status:"error", message:message}, null,5 )
    res.end(response);
}
const sendSuccess = async (res, data) => {
    const response = JSON.stringify({status:"success", data:data}, null,5 )
    res.end(response)
};
export default getRequestData
export {sendError,sendSuccess}