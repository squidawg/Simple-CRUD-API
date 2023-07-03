import * as http from "http";
import {HTTP_STATUS_CODE} from "../constants.js";
import *  as controller from './UsersManager.js'
import {errorHandler, responseHandler} from "./dataHandler.js";
import {User} from "../models/user.model.js";
import {getReqData} from "../utils/utils.js";

export const onGetUsers = async (res:http.ServerResponse) => {
    try{
        const users = await controller.getUsers();
        responseHandler(res, HTTP_STATUS_CODE.OK, users);
    }
    catch (e) {
        responseHandler(res, HTTP_STATUS_CODE.NOT_FOUND, e);
    }
}

export const onGetUser = async (req: http.IncomingMessage, res:http.ServerResponse) => {
    const userId = req.url?.split('/').at(-1)!.toString();
    try{
        const user = await controller.getUser(userId!);
        if(!user){

        }
        responseHandler(res, HTTP_STATUS_CODE.OK, user);
    }
    catch (e) {
        const STATUS_CODE = errorHandler(e, userId!);
        responseHandler(res, STATUS_CODE, e);
    }
}

export const onPostUser = async (req: http.IncomingMessage, res:http.ServerResponse) => {
    try{
        const userData = await getReqData(req) as User;
        const user = await controller.createUser(userData);
        responseHandler(res, HTTP_STATUS_CODE.CREATED, user);
    }
    catch (e) {
        responseHandler(res, HTTP_STATUS_CODE.NOT_FOUND, e);
    }

}

export const onPutUser = async (req: http.IncomingMessage, res:http.ServerResponse) => {
    const userId = req.url?.split('/').at(-1)!.toString();
    try{
        const userData = await getReqData(req) as User;
        const user = await controller.updateUser(userId!, userData)
        responseHandler(res, HTTP_STATUS_CODE.OK, user);
    }
    catch (e) {
        const STATUS_CODE = errorHandler(e, userId!);
        responseHandler(res, STATUS_CODE, e);
    }
}

export const onDeleteUser = async (req: http.IncomingMessage, res:http.ServerResponse) => {
    const userId = req.url?.split('/').at(-1)!.toString();
    try{
        const user = await controller.deleteUser(userId!);
        responseHandler(res, HTTP_STATUS_CODE.NO_CONTENT, user);
    }
    catch (e) {
        const STATUS_CODE = errorHandler(e, userId!);
        responseHandler(res, STATUS_CODE, e);
    }
}

export const checkRequestBody = (userData:User|{}) =>{
    const keys: (keyof User)[] = ['username', 'age', 'hobbies'];
    for(const key  of keys){
        if(!(key in userData)){
            return { message: 'body does not contain required fields' };
        }
    }
    return false;
}
