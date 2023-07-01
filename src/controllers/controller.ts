import * as http from "http";
import {HTTP_STATUS_CODE} from "../constants";
import *  as controller from './UsersManager'
import {onSendResponse} from "./dataHandler";
import {User} from "../models/user.model";
import {getReqData} from "../utils/utils";

export const onGetUsers = async (res:http.ServerResponse) => {
    const users = await controller.getUsers();
    onSendResponse(res, HTTP_STATUS_CODE.OK, users);
}

export const onGetUser = async (req: http.IncomingMessage, res:http.ServerResponse) => {
    const userId = req.url?.split('/').at(-1)!.toString();
    try{
        const user = await controller.getUser(userId!);
        onSendResponse(res, HTTP_STATUS_CODE.OK, user);
    }
    catch (e) {
        console.log(e);
    }
}

export const onPostUser = async (req: http.IncomingMessage, res:http.ServerResponse) => {
    const userData = await getReqData(req) as User;
    const user = await controller.createUser(userData);
    onSendResponse(res, HTTP_STATUS_CODE.OK, user);

}

export const onPutUser = async (req: http.IncomingMessage, res:http.ServerResponse) => {
    const userId = req.url?.split('/').at(-1)!.toString();
    const userData = await getReqData(req) as User;
    const user = await controller.updateUser(userId!, userData)
    onSendResponse(res, HTTP_STATUS_CODE.OK, user);
}

export const onDeleteUser = async (req: http.IncomingMessage, res:http.ServerResponse) => {
    const userId = req.url?.split('/').at(-1)!.toString();
    const user = await controller.deleteUser(userId!);
    onSendResponse(res, HTTP_STATUS_CODE.OK, user);

}

