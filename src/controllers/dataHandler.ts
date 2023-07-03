import http from "http";
import {HTTP_STATUS_CODE} from "../constants.js";

export const responseHandler = (
    res: http.ServerResponse,
    statCode: number,
    message: unknown
) => {
    res.writeHead(statCode, {
        'Content-Type': 'application/json',
    });
    if (typeof message !== 'string') {
        res.end(JSON.stringify(message));
    } else {
        res.end(JSON.stringify({message: message}));
    }
}


export const errorHandler = (message: unknown, id: string) => {
    return message === `User with ID:${id} not valid` ?
        HTTP_STATUS_CODE.NOT_FOUND : HTTP_STATUS_CODE.BAD_REQUEST;
}
