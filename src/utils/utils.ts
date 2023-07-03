import http from "http";
import {ENDPOINT, HTTP_METHOD} from "../constants.js";
import {User} from "../models/user.model.js";
import {updateUsersRecords} from "../data/users.js";

export const onRequestType = (req: http.IncomingMessage) => {
    const url = req.url;
    const method = req.method;
    if (url === ENDPOINT && method === HTTP_METHOD.GET) {
        return 'getUsers';
    }
    if (url?.startsWith(ENDPOINT + '/') && method === HTTP_METHOD.GET) {
        return 'getUser';
    }
    if(url === ENDPOINT && method === HTTP_METHOD.POST){
        return 'postUser';
    }
    if(url?.startsWith(ENDPOINT + '/') && method === HTTP_METHOD.PUT){
        return 'putUser';
    }
    if(url?.startsWith(ENDPOINT + '/') && method === HTTP_METHOD.DELETE){
        return 'deleteUser';
    }
}

export const getReqData = async (req: http.IncomingMessage) => {
    return new Promise((resolve, reject) => {
        try {
            const body: Uint8Array[] = [];
            req.on("data", (chunk: Uint8Array) => {
                body.push(chunk);
            });
            req.on("end", () => {
                const resData = Buffer.concat(body).toString();
                console.log(resData);
                resolve(resData ? JSON.parse(resData) : {});
            });
        } catch (error) {
            reject(error);
        }
    });
}

export const updateUserInRecords = (userRecords: User[], user:User) => {
    const users = userRecords.map(obj => obj.id === user.id? user: obj);
    updateUsersRecords(users);

}

export const deleteUserInRecords = (userRecords: User[], uId:string) => {
    const users = userRecords.filter(obj => obj.id !== uId);
    updateUsersRecords(users);
}
