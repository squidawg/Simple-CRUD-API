import http from "http";
import {onRequestType} from "./utils/utils.js";
import * as userController from "./controllers/controller.js";
import {responseHandler} from "./controllers/dataHandler.js";
import {HTTP_STATUS_CODE} from "./constants.js";

export const onListenRequest = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
        const defMsg = 'non-existing endpoint'
        const request = onRequestType(req);
        switch (request) {
            case "getUsers":
                await userController.onGetUsers(res);
                break;
            case "getUser":
                await userController.onGetUser(req, res);
                break;
            case "postUser":
                await userController.onPostUser(req, res);
                break;
            case "putUser":
                await userController.onPutUser(req, res);
                break;
            case "deleteUser":
                await userController.onDeleteUser(req, res);
                break;
            default:
                responseHandler(res, HTTP_STATUS_CODE.NOT_FOUND, defMsg)
        }
    } catch (e) {
        const errorMessage = 'Error on the server side'
        responseHandler(res, HTTP_STATUS_CODE.ERR_SERVER_SIDE, errorMessage)
    }
}
